require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const app = express()

// =========================
// CORS Configuration
// =========================
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins
  })
)

// =========================
// Middleware
// =========================
app.use(express.json({ limit: '20kb' }))

// =========================
// Contact Schema
// =========================
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 160
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Contact = mongoose.model('Contact', contactSchema)

// =========================
// Health Check
// =========================
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Suraj portfolio API'
  })
})

// =========================
// Contact API
// =========================
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}

  // Validate required fields
  if (
    ![name, email, message].every(
      (value) => typeof value === 'string' && value.trim()
    )
  ) {
    return res.status(400).json({
      message: 'Please provide your name, email, and message.'
    })
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      message: 'Please enter a valid email address.'
    })
  }

  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'Database is not connected. Please try again later.'
      })
    }

    // Save contact message
    const saved = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    })

    // =========================
    // SMTP Configuration Check
    // =========================
    const smtpConfigured =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.EMAIL_TO

    if (!smtpConfigured) {
      console.warn(
        'Contact saved, but email notification is not configured. Check SMTP environment variables.'
      )

      return res.status(201).json({
        message:
          'Thanks! Your message has been saved. Email notifications are not configured yet.'
      })
    }

    // =========================
    // Send Email Notification
    // =========================
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure:
          String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: process.env.EMAIL_TO,
        replyTo: email.trim(),
        subject: `New portfolio message from ${name.trim()}`,
        text: `You received a new message through your portfolio.

Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}

Submitted: ${saved.createdAt.toISOString()}`
      })

      return res.status(201).json({
        message:
          'Thanks! Your message has been saved and an email notification was sent.'
      })
    } catch (mailError) {
      console.error(
        'Email notification failed:',
        mailError.message
      )

      return res.status(201).json({
        message:
          'Your message was saved, but the email notification could not be sent. Please check the backend email settings.'
      })
    }
  } catch (error) {
    console.error('Contact API error:', error)

    return res.status(500).json({
      message: 'Could not save your message.'
    })
  }
})

// =========================
// MongoDB Connection
// =========================
const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/suraj_portfolio'

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((error) => {
    console.error(
      'MongoDB connection failed:',
      error.message
    )
  })

// =========================
// Start Server
// =========================
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Portfolio API running on port ${port}`)
})