import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { profile } from "../../data/portfolio";
import SectionTitle from "../SectionTitle";
import SocialLinks from "../common/SocialLinks";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" }),
    [status, setStatus] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const r = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.message || "Unable to send");
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus(
        "Could not reach the contact server. Please email me directly at " +
          profile.email +
          ".",
      );
    }
  };
  return (
    <section id="contact" className="page-section contact">
      <div className="contact-info">
        <SectionTitle
          eyebrow="Get In Touch"
          first="Let’s Work"
          accent="Together"
          description="Have a project in mind or just want to say hello? Feel free to reach out. I'm always open to new opportunities and collaborations."
        />
        <div className="contact-lines">
          <div>
            <span>
              <Mail />
            </span>
            <p>
              Email<small>{profile.email}</small>
            </p>
          </div>
          <div>
            <span>
              <Phone />
            </span>
            <p>
              Phone<small>{profile.phone}</small>
            </p>
          </div>
          <div>
            <span>
              <MapPin />
            </span>
            <p>
              Location<small>{profile.location}</small>
            </p>
          </div>
        </div>
        <SocialLinks />
      </div>
      <form className="contact-form" onSubmit={submit}>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          required
          placeholder="Message"
          rows="5"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button className="btn primary" type="submit">
          <Send size={14} /> Send Message
        </button>
        {status && (
          <p className="form-status" role="status">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}
