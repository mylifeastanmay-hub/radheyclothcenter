'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { alert('Please fill all required fields'); return }
    setSubmitted(true)
  }

  const inputStyle = (field: string) => ({
    width: '100%', padding: '16px 20px', borderRadius: '14px',
    border: `2px solid ${focused === field ? '#D4A843' : 'rgba(0,0,0,0.08)'}`,
    background: focused === field ? '#FFFDF8' : '#fff',
    fontSize: '17px', fontFamily: 'Cormorant Garamond, serif',
    color: '#1A1A2E', outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === field ? '0 4px 16px rgba(212,168,67,0.12)' : 'none',
    boxSizing: 'border-box' as const,
  })

  return (
    <main style={{ background: '#F9F6F0', minHeight: '100vh', fontFamily: 'Cormorant Garamond, serif' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 52px',
        background: scrollY > 60 ? 'rgba(253,250,245,0.97)' : 'rgba(249,246,240,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrollY > 60 ? '1px solid rgba(212,168,67,0.15)' : '1px solid transparent',
        transition: 'all 0.5s ease',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '2px', fontWeight: 700 }}>The House of</p>
          <h1 style={{ fontSize: '22px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>
            Radhey Cloth Center
          </h1>
        </Link>
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {['Home', 'Collection', 'Heritage'].map(link => (
            <Link key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#555', textDecoration: 'none', fontWeight: 700,
            }}>
              {link}
            </Link>
          ))}
          <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700 }}>Contact</span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px',
      }}>
        {/* Bg blobs */}
        {[
          { color: '#FDE8C8', x: '5%', y: '30%', size: 500 },
          { color: '#D5EBF5', x: '90%', y: '50%', size: 400 },
        ].map((orb, i) => (
          <div key={i} style={{
            position: 'absolute', left: orb.x, top: orb.y,
            width: orb.size, height: orb.size, borderRadius: '50%',
            background: orb.color, filter: 'blur(80px)', opacity: 0.6,
            transform: 'translate(-50%, -50%)', pointerEvents: 'none',
          }} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ position: 'relative', zIndex: 10, padding: '0 48px' }}
        >
          <p style={{ fontSize: '14px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '20px' }}>— Get in Touch</p>
          <h1 style={{
            fontSize: 'clamp(64px, 9vw, 108px)', fontWeight: 600, lineHeight: 0.95,
            fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '28px',
          }}>
            We'd Love to
          </h1>
          <h1 style={{
            fontSize: 'clamp(64px, 9vw, 108px)', fontWeight: 600, lineHeight: 0.95,
            fontFamily: 'Cormorant Garamond, serif', color: '#D4A843', marginBottom: '36px',
          }}>
            Hear From You
          </h1>
          <p style={{ fontSize: '20px', color: '#666', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto' }}>
            Whether it's a bridal inquiry, custom order, or just a question — we're always happy to help.
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '80px 52px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px' }}>

          {/* LEFT — Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 style={{ fontSize: '44px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '36px', lineHeight: 1 }}>
              Visit Our Store
            </h2>

            {/* Info Cards */}
            {[
              { icon: '📍', title: 'Address', lines: ['Bus Stand Road', 'Shembalpimpri, Nashik', 'Maharashtra — 422010'], accent: '#D4A843' },
              { icon: '📞', title: 'Phone', lines: ['+91 98812 29141', 'Mon–Sat: 10am – 8pm', 'Sun: 11am – 6pm'], accent: '#E8829A' },
              { icon: '📧', title: 'Email', lines: ['mylifeastanmay@gmail.com', 'Replies within 24 hours'], accent: '#7B9ED9' },
              { icon: '🕐', title: 'Store Hours', lines: ['Monday – Saturday: 10:00 AM – 8:00 PM', 'Sunday: 11:00 AM – 6:00 PM', 'Closed on major holidays'], accent: '#5BAD8F' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: `0 12px 32px ${card.accent}15` }}
                style={{
                  display: 'flex', gap: '20px', padding: '24px 24px',
                  background: '#fff', borderRadius: '20px', marginBottom: '16px',
                  border: `1px solid ${card.accent}20`,
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{
                  width: '52px', height: '52px', flexShrink: 0, borderRadius: '14px',
                  background: `${card.accent}15`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '24px',
                }}>
                  {card.icon}
                </div>
                <div>
                  <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: card.accent, fontWeight: 700, marginBottom: '8px' }}>{card.title}</p>
                  {card.lines.map((line, j) => (
                    <p key={j} style={{ fontSize: '16px', color: j === 0 ? '#1A1A2E' : '#888', fontWeight: j === 0 ? 600 : 400, marginBottom: '2px' }}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div style={{ marginTop: '28px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, marginBottom: '16px' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[{ icon: '📸', label: 'Instagram' }, { icon: '👥', label: 'Facebook' }, { icon: '💬', label: 'WhatsApp' }].map((s, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.08, y: -2 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '10px 18px', borderRadius: '12px',
                      background: '#fff', border: '1px solid rgba(212,168,67,0.2)',
                      fontSize: '14px', color: '#555', textDecoration: 'none', fontWeight: 600,
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span>{s.icon}</span> {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center', padding: '80px 40px',
                  background: '#fff', borderRadius: '28px',
                  border: '1px solid rgba(212,168,67,0.2)',
                  boxShadow: '0 8px 40px rgba(212,168,67,0.1)',
                }}
              >
                <p style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</p>
                <h3 style={{ fontSize: '42px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '16px' }}>
                  Message Sent!
                </h3>
                <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.7, marginBottom: '36px' }}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                  style={{
                    padding: '16px 40px', borderRadius: '14px', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #D4A843, #E8C46A)',
                    border: 'none', color: '#fff',
                    fontSize: '14px', fontWeight: 800, letterSpacing: '0.2em',
                    textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif',
                  }}
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <div style={{
                background: '#fff', borderRadius: '28px', padding: '48px',
                border: '1px solid rgba(212,168,67,0.12)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.04)',
              }}>
                <h2 style={{ fontSize: '42px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '8px' }}>
                  Send a Message
                </h2>
                <p style={{ fontSize: '17px', color: '#888', marginBottom: '36px' }}>We typically reply within 24 hours.</p>

                {/* Subject pills */}
                <div style={{ marginBottom: '28px' }}>
                  <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, marginBottom: '12px' }}>I'm inquiring about</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Bridal Wear', 'Custom Order', 'General Query', 'Returns'].map(subj => (
                      <button
                        key={subj}
                        onClick={() => setForm({ ...form, subject: subj })}
                        style={{
                          padding: '9px 18px', borderRadius: '20px', cursor: 'pointer',
                          background: form.subject === subj ? '#D4A843' : '#F9F6F0',
                          border: `1.5px solid ${form.subject === subj ? '#D4A843' : 'rgba(0,0,0,0.08)'}`,
                          fontSize: '14px', fontWeight: 600,
                          color: form.subject === subj ? '#fff' : '#666',
                          transition: 'all 0.25s ease',
                          fontFamily: 'Cormorant Garamond, serif',
                        }}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Name *
                    </label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      placeholder="Your full name"
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused('')}
                      placeholder="+91 XXXXX XXXXX"
                      style={inputStyle('phone')}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="your@email.com"
                    style={inputStyle('email')}
                  />
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="Tell us what you're looking for..."
                    rows={5}
                    style={{ ...inputStyle('message'), resize: 'vertical' as const }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(212,168,67,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  style={{
                    width: '100%', padding: '18px',
                    background: 'linear-gradient(135deg, #D4A843, #E8C46A)',
                    border: 'none', borderRadius: '14px', cursor: 'pointer',
                    fontSize: '15px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#fff', fontFamily: 'Cormorant Garamond, serif',
                    boxShadow: '0 4px 18px rgba(212,168,67,0.3)',
                  }}
                >
                  Send Message →
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section style={{ padding: '0 52px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            borderRadius: '28px', overflow: 'hidden',
            background: '#FFF8ED', height: '360px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(212,168,67,0.2)',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <p style={{ fontSize: '56px', marginBottom: '16px' }}>🗺️</p>
            <h3 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '8px' }}>
              Bus Stand Road, Shembalpimpri
            </h3>
            <p style={{ fontSize: '17px', color: '#888' }}>Nashik, Maharashtra — 422010</p>
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              whileHover={{ scale: 1.04 }}
              style={{
                display: 'inline-block', marginTop: '20px',
                padding: '12px 32px', borderRadius: '12px',
                background: '#D4A843', color: '#fff', textDecoration: 'none',
                fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              }}
            >
              Open in Google Maps →
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 52px', background: '#fff', borderTop: '1px solid rgba(212,168,67,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#bbb', fontWeight: 600 }}>
          © 2025 Radhey Cloth Center · Made with ❤️ in India
        </p>
      </footer>
    </main>
  )
}
