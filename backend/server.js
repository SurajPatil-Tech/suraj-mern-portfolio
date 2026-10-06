require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json({ limit: '20kb' }))

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, maxlength: 160 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  createdAt: { type: Date, default: Date.now }
})
const Contact = mongoose.model('Contact', contactSchema)

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Suraj portfolio API' }))
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (![name, email, message].every(v => typeof v === 'string' && v.trim())) {
    return res.status(400).json({ message: 'Please provide your name, email, and message.' })
  }
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(email.trim())) {
  return res.status(400).json({
    message: 'Please enter a valid email address.'
  })
}
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database is not connected. Start MongoDB and try again.' })
    }
    const saved = await Contact.create({ name: name.trim(), email: email.trim(), message: message.trim() })

    // Email notification is optional until SMTP settings are configured.
    const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER &&
      process.env.SMTP_PASS && process.env.EMAIL_TO
    if (!smtpConfigured) {
      console.warn('Contact saved, but email notification is not configured (check SMTP environment variables).')
      return res.status(201).json({ message: 'Thanks! Your message has been saved. Email notifications are not configured yet.' })
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || 'false') === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      })
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: process.env.EMAIL_TO,
        replyTo: email.trim(),
        subject: `New portfolio message from ${name.trim()}`,
        text: `You received a new message through your portfolio.\n\nName: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}\n\nSubmitted: ${saved.createdAt.toISOString()}`
      })
      return res.status(201).json({ message: 'Thanks! Your message has been saved and an email notification was sent.' })
    } catch (mailError) {
      console.error('Email notification failed:', mailError.message)
      return res.status(201).json({ message: 'Your message was saved, but the email notification could not be sent. Please check the backend email settings.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Could not save your message.' })
  }
})

const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/suraj_portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection failed:', err.message))
app.listen(port, () => console.log(`Portfolio API running on http://localhost:${port}`))
