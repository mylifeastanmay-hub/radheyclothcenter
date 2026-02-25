'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const timeline = [
  { year: '1995', title: 'The Beginning', desc: 'Radhey Cloth Center was founded by Shri Radheyshyam Ji on Bus Stand Road, Nashik. Starting with a small shop of 12 sarees, a dream was born.', emoji: '🪔' },
  { year: '2000', title: 'Growing Roots', desc: 'Expanded to a full store with over 500 products. Became the most trusted name for bridal wear in Shembalpimpri.', emoji: '🌱' },
  { year: '2008', title: 'Heritage Collection', desc: 'Launched our first exclusive Heritage Collection featuring authentic Banarasi, Kanjivaram and Patola sarees sourced directly from weavers.', emoji: '🏺' },
  { year: '2015', title: 'Master Weavers Program', desc: 'Partnered with master weavers across India — from Varanasi to Kanchipuram — ensuring authentic, fair-trade handwoven garments.', emoji: '🪡' },
  { year: '2020', title: 'Digital Era', desc: 'Brought the Radhey experience online, making authentic Indian traditional wear accessible across Maharashtra and beyond.', emoji: '✨' },
  { year: '2025', title: 'The Future', desc: 'Three decades of trust, authenticity and love for Indian craftsmanship. Continuing to serve families across generations.', emoji: '👑' },
]

const values = [
  { title: 'Authenticity', desc: 'Every piece is sourced directly from certified weavers. No imitations, no shortcuts — only genuine Indian craftsmanship.', emoji: '🏺', accent: '#D4A843' },
  { title: 'Heritage', desc: 'We preserve centuries-old weaving traditions by working directly with artisan families across Varanasi, Kanchipuram and Jaipur.', emoji: '🪡', accent: '#E8829A' },
  { title: 'Trust', desc: 'Over 10,000 families have chosen Radhey for their most special occasions. That trust is our greatest achievement.', emoji: '🤝', accent: '#7B9ED9' },
  { title: 'Craft', desc: 'From the first thread to the final embroidery, every garment passes through 12 quality checks before reaching you.', emoji: '✨', accent: '#5BAD8F' },
]

const team = [
  { name: 'Radheyshyam Ji', role: 'Founder & Patriarch', emoji: '👴', desc: '30 years of passion for Indian textiles' },
  { name: 'Tanmay', role: 'Creative Director', emoji: '👨', desc: 'Bridging heritage with modern design' },
  { name: 'Sunita Ji', role: 'Head of Curation', emoji: '👩', desc: 'Expert eye for authentic handwoven fabrics' },
]

export default function HeritagePage() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

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
          {['Home', 'Collection', 'Contact'].map(link => (
            <Link key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: link === 'Heritage' ? '#D4A843' : '#555', textDecoration: 'none',
              fontWeight: 700,
            }}>
              {link}
            </Link>
          ))}
          <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700 }}>Heritage</span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px',
      }}>
        {/* Bg blobs */}
        {[
          { color: '#FDE8C8', x: '10%', y: '20%', size: 500 },
          { color: '#E8D5F5', x: '85%', y: '60%', size: 400 },
          { color: '#D5F5E8', x: '60%', y: '10%', size: 350 },
        ].map((orb, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity }}
            style={{
              position: 'absolute', left: orb.x, top: orb.y,
              width: orb.size, height: orb.size, borderRadius: '50%',
              background: orb.color, filter: 'blur(80px)', opacity: 0.6,
              transform: 'translate(-50%, -50%)', pointerEvents: 'none',
            }}
          />
        ))}

        {/* Rotating rings */}
        {[360, 280, 200].map((size, i) => (
          <motion.div key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', borderRadius: '50%',
              width: size, height: size,
              border: `1px solid rgba(212,168,67,${0.08 + i * 0.04})`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 10, maxWidth: '800px', padding: '0 48px' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '14px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '20px' }}
          >
            — Our Story
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontSize: 'clamp(64px, 9vw, 112px)', fontWeight: 600, lineHeight: 0.95,
              fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E',
              marginBottom: '24px', letterSpacing: '-0.02em',
            }}
          >
            Three Decades of
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{
              fontSize: 'clamp(64px, 9vw, 112px)', fontWeight: 600, lineHeight: 0.95,
              fontFamily: 'Cormorant Garamond, serif', color: '#D4A843',
              marginBottom: '40px', letterSpacing: '-0.02em',
            }}
          >
            Indian Craft
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9 }}
            style={{ height: '3px', width: '100px', background: 'linear-gradient(90deg, #D4A843, #E8829A)', borderRadius: '2px', margin: '0 auto 36px' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ fontSize: '22px', color: '#555', lineHeight: 1.8, fontWeight: 400 }}
          >
            Since 1995, Radhey Cloth Center has been the heartbeat of traditional Indian fashion in Nashik — connecting families to the timeless art of Indian weaving.
          </motion.p>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section style={{ padding: '60px 52px', background: '#fff', borderTop: '1px solid rgba(212,168,67,0.1)', borderBottom: '1px solid rgba(212,168,67,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { num: '30+', label: 'Years of Service', color: '#D4A843' },
            { num: '10K+', label: 'Happy Families', color: '#E8829A' },
            { num: '500+', label: 'Unique Products', color: '#7B9ED9' },
            { num: '50+', label: 'Master Weavers', color: '#5BAD8F' },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p style={{ fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: s.color, marginBottom: '6px' }}>{s.num}</p>
              <p style={{ fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', fontWeight: 700 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '100px 52px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '12px' }}>— Our Journey</p>
          <h2 style={{ fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', lineHeight: 1 }}>The Story So Far</h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '28px', top: 0, bottom: 0,
            width: '2px', background: 'linear-gradient(to bottom, #D4A843, #E8829A, #7B9ED9, #5BAD8F)',
            borderRadius: '2px',
          }} />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: '-40px' }}
              style={{ display: 'flex', gap: '48px', marginBottom: '56px', alignItems: 'flex-start' }}
            >
              {/* Dot */}
              <div style={{
                width: '58px', height: '58px', borderRadius: '50%', flexShrink: 0,
                background: '#fff', border: '3px solid #D4A843',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', zIndex: 1,
                boxShadow: '0 4px 16px rgba(212,168,67,0.2)',
              }}>
                {item.emoji}
              </div>

              <div style={{
                flex: 1, background: '#fff', borderRadius: '20px',
                padding: '28px 32px', border: '1px solid rgba(212,168,67,0.12)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em',
                    color: '#fff', background: '#D4A843',
                    padding: '4px 14px', borderRadius: '20px',
                  }}>
                    {item.year}
                  </span>
                  <h3 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.7, fontWeight: 400 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '80px 52px', background: '#fff', borderTop: '1px solid rgba(212,168,67,0.1)' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '12px' }}>— What We Stand For</p>
          <h2 style={{ fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', lineHeight: 1 }}>Our Values</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: `0 16px 40px ${v.accent}15` }}
              style={{
                padding: '36px', borderRadius: '24px',
                background: '#FDFAF5', border: `1px solid ${v.accent}20`,
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: `${v.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '20px',
              }}>
                {v.emoji}
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '12px' }}>{v.title}</h3>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.7, fontWeight: 400 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '80px 52px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '12px' }}>— The People</p>
          <h2 style={{ fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', lineHeight: 1 }}>Our Family</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', maxWidth: '900px', margin: '0 auto' }}>
          {team.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              style={{
                textAlign: 'center', padding: '40px 28px', borderRadius: '24px',
                background: '#fff', border: '1px solid rgba(212,168,67,0.12)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px',
                background: '#FFF8ED', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '40px', border: '3px solid rgba(212,168,67,0.2)',
              }}>
                {t.emoji}
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '6px' }}>{t.name}</h3>
              <p style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '12px' }}>{t.role}</p>
              <p style={{ fontSize: '16px', color: '#888', fontWeight: 400 }}>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 52px', textAlign: 'center',
        background: 'linear-gradient(135deg, #FFF8ED, #FFF0F4)',
        borderTop: '1px solid rgba(212,168,67,0.1)',
      }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ fontSize: '40px', marginBottom: '20px' }}>🪔</p>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '20px', lineHeight: 1 }}>
            Be Part of Our Story
          </h2>
          <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.8 }}>
            Visit us in Nashik or explore our collection online. Your next heirloom awaits.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(212,168,67,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '18px 52px', borderRadius: '14px', cursor: 'pointer',
                background: 'linear-gradient(135deg, #D4A843, #E8C46A)',
                border: 'none', color: '#fff',
                fontSize: '15px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'Cormorant Garamond, serif',
                boxShadow: '0 4px 18px rgba(212,168,67,0.3)',
              }}
            >
              Explore Collection →
            </motion.button>
          </Link>
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
