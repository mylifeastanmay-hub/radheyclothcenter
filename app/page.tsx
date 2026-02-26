'use client'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/lib/store'
import Link from 'next/link'

const products = [
  { id: 1, name: "Banarasi Saree", price: 1299, desc: "Pure silk with golden zari work", tag: "Bestseller", category: "Women", emoji: "👘", accent: "#D4A843", soft: "#FFF8ED", stock: 3 },
  { id: 2, name: "Royal Sherwani", price: 2499, desc: "Embroidered sherwani for groom & occasions", tag: "Premium", category: "Men", emoji: "🥻", accent: "#7B9ED9", soft: "#EEF4FF", stock: 5 },
  { id: 3, name: "Bridal Lehenga", price: 3899, desc: "Heavy embroidery bridal lehenga choli", tag: "Bridal", category: "Women", emoji: "👗", accent: "#E8829A", soft: "#FFF0F4", stock: 2 },
  { id: 4, name: "Silk Kurta Set", price: 799, desc: "Premium cotton-silk kurta pajama", tag: "Daily Wear", category: "Men", emoji: "🧥", accent: "#5BAD8F", soft: "#EDFAF4", stock: 12 },
  { id: 5, name: "Anarkali Suit", price: 1499, desc: "Elegant floral anarkali with dupatta", tag: "Trending", category: "Women", emoji: "👚", accent: "#E8A84C", soft: "#FFF9ED", stock: 4 },
  { id: 6, name: "Dhoti Kurta", price: 699, desc: "Traditional festive dhoti kurta set", tag: "Classic", category: "Men", emoji: "🩱", accent: "#7B9ED9", soft: "#EEF4FF", stock: 8 },
  { id: 7, name: "Chanderi Saree", price: 1099, desc: "Lightweight chanderi silk with border", tag: "New", category: "Women", emoji: "🪭", accent: "#C97EB5", soft: "#FFF0FB", stock: 6 },
  { id: 8, name: "Indo-Western Suit", price: 1799, desc: "Modern fusion with traditional touch", tag: "Fusion", category: "Men", emoji: "🎽", accent: "#5BAD8F", soft: "#EDFAF4", stock: 7 },
  { id: 9, name: "Patola Saree", price: 2199, desc: "Authentic Gujarati patola weave", tag: "Heritage", category: "Women", emoji: "🪆", accent: "#E8829A", soft: "#FFF0F4", stock: 3 },
  { id: 10, name: "Kanjivaram Saree", price: 2799, desc: "Pure silk from Tamil Nadu with rich zari", tag: "Heritage", category: "Women", emoji: "👑", accent: "#D4A843", soft: "#FFF8ED", stock: 2 },
  { id: 11, name: "Nehru Jacket", price: 899, desc: "Classic Nehru collar jacket for men", tag: "Trending", category: "Men", emoji: "🧣", accent: "#7B9ED9", soft: "#EEF4FF", stock: 9 },
  { id: 12, name: "Bandhgala Suit", price: 1999, desc: "Elegant closed-neck formal Indian suit", tag: "Premium", category: "Men", emoji: "🕴️", accent: "#9B8EC4", soft: "#F4F0FF", stock: 4 },
  { id: 13, name: "Jodhpuri Suit", price: 2299, desc: "Royal Rajasthani jodhpuri for occasions", tag: "Royal", category: "Men", emoji: "👔", accent: "#5BAD8F", soft: "#EDFAF4", stock: 3 },
  { id: 14, name: "Ghagra Choli", price: 1299, desc: "Vibrant Rajasthani ghagra with mirror work", tag: "Festive", category: "Women", emoji: "💃", accent: "#E8829A", soft: "#FFF0F4", stock: 5 },
  { id: 15, name: "Boys Sherwani", price: 999, desc: "Adorable sherwani set for little ones", tag: "Kids", category: "Kids", emoji: "🤴", accent: "#7B9ED9", soft: "#EEF4FF", stock: 10 },
  { id: 16, name: "Girls Lehenga", price: 799, desc: "Beautiful embroidered lehenga for girls", tag: "Kids", category: "Kids", emoji: "👸", accent: "#E8829A", soft: "#FFF0F4", stock: 8 },
  { id: 17, name: "Sharara Suit", price: 1599, desc: "Flowy sharara with embroidered kurti", tag: "New", category: "Women", emoji: "🌸", accent: "#C97EB5", soft: "#FFF0FB", stock: 6 },
  { id: 18, name: "Modi Kurta", price: 599, desc: "Half sleeve cotton Modi style kurta", tag: "Daily Wear", category: "Men", emoji: "🧘", accent: "#5BAD8F", soft: "#EDFAF4", stock: 15 },
]

const categories = ['All', 'Women', 'Men', 'Kids']

const occasions = [
  { label: 'Wedding', emoji: '💒', filter: ['Bridal', 'Premium', 'Royal'] },
  { label: 'Diwali', emoji: '🪔', filter: ['Festive', 'Trending', 'Heritage'] },
  { label: 'Daily', emoji: '☀️', filter: ['Daily Wear', 'Classic', 'Fusion'] },
  { label: 'Kids Party', emoji: '🎉', filter: ['Kids'] },
]

const topSellers = [
  { id: 1, name: "Banarasi Saree", price: 1299, emoji: "👘", accent: "#D4A843", tag: "Bestseller" },
  { id: 3, name: "Bridal Lehenga", price: 3899, emoji: "👗", accent: "#E8829A", tag: "Bridal" },
  { id: 2, name: "Royal Sherwani", price: 2499, emoji: "🥻", accent: "#7B9ED9", tag: "Premium" },
  { id: 10, name: "Kanjivaram Saree", price: 2799, emoji: "👑", accent: "#C97EB5", tag: "Heritage" },
  { id: 4, name: "Silk Kurta Set", price: 799, emoji: "🧥", accent: "#5BAD8F", tag: "Daily Wear" },
]

// ─── GLOBAL GRAIN OVERLAY ────────────────────────────────────
function GrainOverlay() {
  return (
    <>
      <svg style={{
        position: 'fixed', inset: 0, zIndex: 55, width: '100%', height: '100%',
        pointerEvents: 'none', opacity: 0.028, mixBlendMode: 'multiply' as any,
      }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <motion.div
        animate={{ scale: [1, 1.05, 0.97, 1.02, 1], rotate: [0, 0.5, -0.3, 0.2, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 80% 60% at 15% 8%, rgba(212,168,67,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 88% 82%, rgba(232,130,154,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(123,158,217,0.04) 0%, transparent 50%)
          `,
        }}
      />
    </>
  )
}

// ─── FLOATING CLOTHES LAYER ──────────────────────────────────
function FloatingClothes() {
  const items = [
    { emoji: '👘', left: '1.5%', top: '12%', size: 52, dur: 11, delay: 0,   rot: [-8, 5, -3, 7]   },
    { emoji: '🥻', left: '0.5%', top: '35%', size: 40, dur: 14, delay: 2,   rot: [10, -4, 8, -6]  },
    { emoji: '👗', left: '2%',   top: '58%', size: 46, dur: 9,  delay: 4,   rot: [-6, 9, -2, 5]   },
    { emoji: '🧥', left: '1%',   top: '78%', size: 36, dur: 12, delay: 1,   rot: [4, -7, 6, -4]   },
    { emoji: '👚', right: '1.5%',top: '8%',  size: 48, dur: 13, delay: 1.5, rot: [6, -8, 4, -5]   },
    { emoji: '🩱', right: '0.8%',top: '30%', size: 42, dur: 10, delay: 3.5, rot: [-5, 7, -9, 3]   },
    { emoji: '🧣', right: '2%',  top: '55%', size: 50, dur: 15, delay: 0.8, rot: [9, -3, 7, -8]   },
    { emoji: '🎽', right: '1%',  top: '76%', size: 38, dur: 11, delay: 5,   rot: [-7, 5, -4, 8]   },
    { emoji: '💃', left: '30%',  top: '2%',  size: 34, dur: 8,  delay: 2.5, rot: [-4, 6, -2, 5]   },
    { emoji: '👑', left: '60%',  top: '1%',  size: 38, dur: 10, delay: 4.2, rot: [5, -6, 3, -4]   },
    { emoji: '🪆', left: '25%',  bottom: '3%', size: 36, dur: 12, delay: 1.8, rot: [-3, 7, -5, 4] },
    { emoji: '🥻', left: '65%',  bottom: '2%', size: 40, dur: 9,  delay: 3,   rot: [6, -4, 8, -6] },
  ]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -22, -38, -18, 0],
            rotate: item.rot,
            scale: [1, 1.04, 0.97, 1.02, 1],
          }}
          transition={{ duration: item.dur, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
          style={{
            position: 'absolute',
            left: (item as any).left,
            right: (item as any).right,
            top: (item as any).top,
            bottom: (item as any).bottom,
            fontSize: item.size,
            opacity: 0.07,
            filter: 'drop-shadow(0 4px 16px rgba(212,168,67,0.2))',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  )
}

// ─── FLOATING PAISLEYS ───────────────────────────────────────
function FloatingPaisleys() {
  const shapes = [
    { x: '4%',   y: '20%',     size: 34, color: '#D4A843', dur: 8,  delay: 0   },
    { x: '5%',   y: '50%',     size: 22, color: '#7B9ED9', dur: 11, delay: 2.5 },
    { x: '4%',   y: '75%',     size: 18, color: '#E8829A', dur: 9,  delay: 4.5 },
    { x: '92%',  y: '15%',     size: 30, color: '#E8829A', dur: 10, delay: 1.2 },
    { x: '93%',  y: '48%',     size: 20, color: '#5BAD8F', dur: 13, delay: 0.8 },
    { x: '92%',  y: '72%',     size: 26, color: '#C97EB5', dur: 8,  delay: 3   },
    { x: '46%',  y: '3%',      size: 16, color: '#C97EB5', dur: 7,  delay: 3.8 },
  ]
  const PaisleySVG = ({ color }: { color: string }) => (
    <svg viewBox="0 0 40 64" style={{ width: '100%', height: '100%' }}>
      <path d="M20 4C32 4 38 14 38 26C38 44 26 58 20 60C14 58 2 44 2 26C2 14 8 4 20 4Z" fill={color} />
      <path d="M20 16C26 16 30 20 30 26C30 34 24 40 20 42C16 40 10 34 10 26C10 20 14 16 20 16Z" fill="white" opacity={0.3} />
      <path d="M20 24Q24 22 24 26Q24 30 20 32Q18 28 20 24Z" fill={color} opacity={0.7} />
    </svg>
  )
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, -9, 0], rotate: [0, 9, -6, 0], scale: [1, 1.06, 0.96, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          style={{
            position: 'absolute', left: s.x, top: s.y,
            width: s.size, height: s.size * 1.6, opacity: 0.09,
          }}
        >
          <PaisleySVG color={s.color} />
        </motion.div>
      ))}
    </div>
  )
}

// ─── HERO MANDALA ────────────────────────────────────────────
function HeroMandala() {
  return (
    <div style={{
      position: 'absolute', right: '2%', top: '50%', transform: 'translateY(-50%)',
      width: 580, height: 580, pointerEvents: 'none',
    }}>
      {/* Outer slow spin */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        viewBox="-290 -290 580 580"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="mg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8829A" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E8829A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="250" fill="url(#mg1)" />
        <circle cx="0" cy="0" r="275" fill="url(#mg2)" />
        {/* Outer accent dots */}
        {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((a,i) => {
          const rad = a * Math.PI / 180
          return <circle key={i} cx={Math.cos(rad)*260} cy={Math.sin(rad)*260} r={i%2===0?3.5:1.8} fill="#D4A843" opacity={i%2===0?0.55:0.22} />
        })}
        {/* Gold 16-petal ring r=210 */}
        {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((a,i) => {
          const rad = a * Math.PI / 180
          const cx = Math.cos(rad)*210, cy = Math.sin(rad)*210
          return <ellipse key={i} cx={cx} cy={cy} rx={32} ry={12} fill="#D4A843" opacity={0.2} transform={`rotate(${a},${cx},${cy})`} />
        })}
        {/* Rose 12-petal ring r=155 */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const rad = a * Math.PI / 180
          const cx = Math.cos(rad)*155, cy = Math.sin(rad)*155
          return <ellipse key={i} cx={cx} cy={cy} rx={24} ry={9} fill="#E8829A" opacity={0.22} transform={`rotate(${a},${cx},${cy})`} />
        })}
        {/* Blue 8-petal ring r=100 */}
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const rad = a * Math.PI / 180
          const cx = Math.cos(rad)*100, cy = Math.sin(rad)*100
          return <ellipse key={i} cx={cx} cy={cy} rx={17} ry={6.5} fill="#7B9ED9" opacity={0.26} transform={`rotate(${a},${cx},${cy})`} />
        })}
        {/* Rings */}
        <circle cx="0" cy="0" r="210" fill="none" stroke="#D4A843" strokeWidth={0.8} opacity={0.18} />
        <circle cx="0" cy="0" r="155" fill="none" stroke="#D4A843" strokeWidth={0.8} strokeDasharray="4 8" opacity={0.18} />
        <circle cx="0" cy="0" r="100" fill="none" stroke="#D4A843" strokeWidth={0.8} opacity={0.18} />
        <circle cx="0" cy="0" r="55"  fill="none" stroke="#D4A843" strokeWidth={0.8} strokeDasharray="4 8" opacity={0.18} />
        <circle cx="0" cy="0" r="20"  fill="none" stroke="#D4A843" strokeWidth={2} opacity={0.6} />
        {/* Center lotus */}
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const rad = a * Math.PI / 180
          const cx = Math.cos(rad)*9.5, cy = Math.sin(rad)*9.5
          return <ellipse key={i} cx={cx} cy={cy} rx={13} ry={5} fill="#D4A843" opacity={0.6} transform={`rotate(${a},${cx},${cy})`} />
        })}
        <circle cx="0" cy="0" r="7" fill="#D4A843" opacity={0.85} />
      </motion.svg>

      {/* Counter-rotating inner spokes */}
      <div style={{ position: 'absolute', width: '55%', height: '55%', top: '22.5%', left: '22.5%' }}>
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          viewBox="-160 -160 320 320"
          style={{ width: '100%', height: '100%' }}
        >
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
            const rad = a * Math.PI / 180
            return <line key={i} x1={0} y1={0} x2={Math.cos(rad)*140} y2={Math.sin(rad)*140} stroke="#D4A843" strokeWidth={0.5} opacity={0.13} />
          })}
          <circle cx="0" cy="0" r="140" fill="none" stroke="#D4A843" strokeWidth={0.7} opacity={0.17} />
          <circle cx="0" cy="0" r="105" fill="none" stroke="#D4A843" strokeWidth={0.7} strokeDasharray="3 6" opacity={0.15} />
          <circle cx="0" cy="0" r="70"  fill="none" stroke="#D4A843" strokeWidth={0.7} opacity={0.15} />
        </motion.svg>
      </div>
    </div>
  )
}

// ─── TOP SELLERS FLOATING CARDS ──────────────────────────────
function TopSellersSection() {
  const cardPositions = [
    { left: '10%',  top: '5%',  dur: 8,  delay: 0,   rot: [-3, 2],  accent: '#D4A843', bg: '#FFF8ED' },
    { right: '5%',  top: '0%',  dur: 10, delay: 1.5, rot: [4, -2],  accent: '#E8829A', bg: '#FFF0F4' },
    { left: '5%',   top: '42%', dur: 12, delay: 0.7, rot: [-5, 3],  accent: '#7B9ED9', bg: '#EEF4FF' },
    { right: '8%',  top: '38%', dur: 9,  delay: 2,   rot: [6, -4],  accent: '#C97EB5', bg: '#FFF0FB' },
    { left: '32%',  top: '72%', dur: 11, delay: 3,   rot: [-2, 5],  accent: '#5BAD8F', bg: '#EDFAF4' },
  ]
  return (
    <section style={{ padding: '80px 52px', position: 'relative', overflow: 'hidden', background: '#FDFAF5' }}>
      {/* Orbit ring decorations */}
      <svg style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, pointerEvents: 'none', opacity: 0.06 }} viewBox="-350 -350 700 700">
        <circle cx="0" cy="0" r="300" fill="none" stroke="#D4A843" strokeWidth={1.5} strokeDasharray="8 12" />
        <circle cx="0" cy="0" r="220" fill="none" stroke="#D4A843" strokeWidth={1} strokeDasharray="5 9" />
        <circle cx="0" cy="0" r="140" fill="none" stroke="#D4A843" strokeWidth={0.8} strokeDasharray="3 6" />
      </svg>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,168,67,0.05),transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
        {/* Left text */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ fontSize: 13, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#D4A843', marginBottom: 12, fontWeight: 700 }}>— Star Pieces</p>
          <h2 style={{ fontSize: 'clamp(44px,5vw,68px)', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', lineHeight: 1, marginBottom: 24 }}>
            Our Top<br/>Sellers
          </h2>
          <p style={{ fontSize: 17, color: '#666', lineHeight: 1.8, maxWidth: 360, marginBottom: 32, fontFamily: 'Cormorant Garamond, serif' }}>
            The pieces our customers love most. Handpicked for their beauty, quality, and timeless appeal.
          </p>
          <motion.a
            href="#collection"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(212,168,67,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 34px', borderRadius: 14, cursor: 'none',
              background: 'linear-gradient(135deg,#D4A843,#E8C46A)', border: 'none', color: '#fff',
              fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'Cormorant Garamond, serif', textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 4px 18px rgba(212,168,67,0.3)',
            }}
          >
            Shop All →
          </motion.a>
        </motion.div>

        {/* Right: floating cards */}
        <div style={{ position: 'relative', height: 480 }}>
          {/* Connecting dashed lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }} viewBox="0 0 500 480">
            <line x1="100" y1="60"  x2="380" y2="50"  stroke="#D4A843" strokeWidth={0.8} strokeDasharray="4 6" />
            <line x1="100" y1="60"  x2="90"  y2="240" stroke="#D4A843" strokeWidth={0.8} strokeDasharray="4 6" />
            <line x1="380" y1="50"  x2="390" y2="230" stroke="#D4A843" strokeWidth={0.8} strokeDasharray="4 6" />
            <line x1="90"  y1="240" x2="240" y2="380" stroke="#D4A843" strokeWidth={0.8} strokeDasharray="4 6" />
            <line x1="390" y1="230" x2="240" y2="380" stroke="#D4A843" strokeWidth={0.8} strokeDasharray="4 6" />
            <circle cx="240" cy="220" r="6" fill="none" stroke="#D4A843" strokeWidth={1} />
            <circle cx="240" cy="220" r="3" fill="#D4A843" opacity={0.4} />
          </svg>
          {topSellers.map((p, i) => {
            const pos = cardPositions[i]
            return (
              <motion.div
                key={p.id}
                animate={{ y: [0, -14, 0], rotate: [pos.rot[0], pos.rot[1], pos.rot[0]] }}
                transition={{ duration: pos.dur, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
                style={{
                  position: 'absolute',
                  left: (pos as any).left,
                  right: (pos as any).right,
                  top: pos.top,
                  width: 150,
                  background: pos.bg,
                  borderRadius: 20,
                  padding: '16px 20px',
                  boxShadow: `0 8px 32px ${p.accent}20`,
                  border: `1px solid ${p.accent}25`,
                  textAlign: 'center',
                }}
              >
                <div style={{
                  display: 'inline-block', background: p.accent, color: '#fff',
                  fontSize: 8, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: 20, marginBottom: 8,
                }}>{p.tag}</div>
                <div style={{ fontSize: 38, display: 'block', marginBottom: 8 }}>{p.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', letterSpacing: '0.04em', fontFamily: 'Cormorant Garamond, serif' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: p.accent, fontWeight: 700, marginTop: 3 }}>₹{p.price.toLocaleString()}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── KNITTED WHEEL BACKGROUND ────────────────────────────────
function KnittedWheelBg() {
  return (
    <>
      {/* Big outer knit wheel */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, opacity: 0.05, pointerEvents: 'none' }}
        viewBox="-350 -350 700 700"
      >
        <g stroke="#D4A843" strokeWidth={0.7}>
          {[-280,-224,-168,-112,-56,0,56,112,168,224,280].map(y => (
            <line key={y} x1={-340} y1={y} x2={340} y2={y} />
          ))}
          {[-280,-224,-168,-112,-56,0,56,112,168,224,280].map(x => (
            <line key={x} x1={x} y1={-340} x2={x} y2={340} />
          ))}
        </g>
        <g stroke="#E8829A" strokeWidth={0.4} opacity={0.5}>
          {[-340,-284,-228,-172,-116,-60,0,60,116,172,228,284,340].map((v,i) => (
            <line key={i} x1={-340} y1={v} x2={340-v-340} y2={340} />
          ))}
          {[-340,-284,-228,-172,-116,-60,0,60,116,172,228,284,340].map((v,i) => (
            <line key={`b${i}`} x1={v} y1={-340} x2={v+680} y2={340} />
          ))}
        </g>
        <g fill="#D4A843" opacity={0.6}>
          {[-280,-168,-56,56,168,280].map(x =>
            [-280,-168,-56,56,168,280].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={x===0&&y===0?5:2.5} />
            ))
          )}
        </g>
      </motion.svg>

      {/* Inner counter-rotating rosette */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 440, height: 440, opacity: 0.065, pointerEvents: 'none' }}
        viewBox="-220 -220 440 440"
      >
        {[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345].map((a,i) => {
          const rad = a * Math.PI / 180
          const cx = Math.cos(rad)*180, cy = Math.sin(rad)*180
          return <ellipse key={i} cx={cx} cy={cy} rx={36} ry={13} fill="#D4A843" transform={`rotate(${a},${cx},${cy})`} />
        })}
        <circle cx="0" cy="0" r="200" fill="none" stroke="#D4A843" strokeWidth={1.5} />
        <circle cx="0" cy="0" r="140" fill="none" stroke="#D4A843" strokeWidth={1} strokeDasharray="5 8" />
        <circle cx="0" cy="0" r="80"  fill="none" stroke="#D4A843" strokeWidth={1} />
        <circle cx="0" cy="0" r="25"  fill="#D4A843" opacity={0.8} />
      </motion.svg>

      {/* Center radial bleach */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%,#F9F6F0 20%,transparent 75%)', pointerEvents: 'none' }} />
    </>
  )
}

// ─── COLLECTION DIAMOND BG ───────────────────────────────────
function CollectionDiamondBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.042 }}>
        <defs>
          <pattern id="diamond" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#D4A843" strokeWidth={0.9} />
            <circle cx="30" cy="30" r="2.8" fill="#D4A843" />
            <circle cx="0"  cy="0"  r="1.6" fill="#D4A843" />
            <circle cx="60" cy="0"  r="1.6" fill="#D4A843" />
            <circle cx="0"  cy="60" r="1.6" fill="#D4A843" />
            <circle cx="60" cy="60" r="1.6" fill="#D4A843" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond)" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 65% at 50% 40%,#F9F6F0 15%,transparent 75%)' }} />
    </div>
  )
}

// ─── STATS WEAVE BG ──────────────────────────────────────────
function StatsWeaveBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.045 }}>
        <defs>
          <pattern id="weave" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0"  y="0"  width="12" height="1.5" fill="#D4A843" />
            <rect x="12" y="12" width="12" height="1.5" fill="#D4A843" />
            <rect x="0"  y="0"  width="1.5" height="12" fill="#D4A843" />
            <rect x="12" y="12" width="1.5" height="12" fill="#D4A843" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#weave)" />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#D4A843,#E8C46A,#D4A843,transparent)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#D4A843,#E8C46A,#D4A843,transparent)', opacity: 0.5 }} />
    </div>
  )
}

// ─── FOOTER MANDALAS ─────────────────────────────────────────
function FooterMandalas() {
  const PetalRing = ({ r, count, accent }: { r: number, count: number, accent: string }) =>
    <>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * 360
        const rad = a * Math.PI / 180
        const cx = Math.cos(rad) * r, cy = Math.sin(rad) * r
        return <ellipse key={i} cx={cx} cy={cy} rx={30} ry={10} fill={accent} opacity={0.9} transform={`rotate(${a},${cx},${cy})`} />
      })}
    </>
  return (
    <>
      {/* Large bottom-right */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', right: '4%', bottom: -50, width: 420, height: 420, opacity: 0.038, pointerEvents: 'none', zIndex: 0 }}
        viewBox="-200 -200 400 400"
      >
        {[188,148,108,70,36].map((r,i) => (
          <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#D4A843" strokeWidth={i===0?2:1} strokeDasharray={i%2===1?'6 10':'none'} />
        ))}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const rad = a * Math.PI / 180
          return <line key={i} x1={0} y1={0} x2={Math.cos(rad)*188} y2={Math.sin(rad)*188} stroke="#D4A843" strokeWidth={0.6} />
        })}
        <PetalRing r={108} count={12} accent="#D4A843" />
        <circle cx="0" cy="0" r="14" fill="#D4A843" />
      </motion.svg>
      {/* Small top-left */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', left: '2%', top: 20, width: 200, height: 200, opacity: 0.025, pointerEvents: 'none', zIndex: 0 }}
        viewBox="-100 -100 200 200"
      >
        <circle cx="0" cy="0" r="90" fill="none" stroke="#D4A843" strokeWidth={1.5} strokeDasharray="5 8" />
        <circle cx="0" cy="0" r="60" fill="none" stroke="#D4A843" strokeWidth={1} />
        <circle cx="0" cy="0" r="30" fill="none" stroke="#D4A843" strokeWidth={0.8} />
        {[0,45,90,135].map((a,i) => {
          const rad = a * Math.PI / 180
          return <line key={i} x1={Math.cos(rad)*-90} y1={Math.sin(rad)*-90} x2={Math.cos(rad)*90} y2={Math.sin(rad)*90} stroke="#D4A843" strokeWidth={0.5} />
        })}
        <circle cx="0" cy="0" r="8" fill="#D4A843" />
      </motion.svg>
    </>
  )
}

// ─── QUICK VIEW MODAL ────────────────────────────────────────
function QuickViewModal({ product, onClose, onAdd, wishlist, toggleWishlist }: any) {
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(10,8,20,0.7)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#FDFAF5', borderRadius: 28, width: '100%', maxWidth: 760, overflow: 'hidden', boxShadow: `0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px ${product.accent}30`, display: 'grid', gridTemplateColumns: '1fr 1fr' }}
      >
        <div style={{ background: product.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 400 }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${product.accent}25, transparent 70%)` }} />
          <div style={{ position: 'absolute', top: 16, left: 16, background: product.accent, borderRadius: 20, padding: '5px 14px', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff' }}>{product.tag}</div>
          {product.stock <= 3 && (
            <div style={{ position: 'absolute', top: 16, right: 16, background: '#FF6B6B', borderRadius: 20, padding: '5px 14px', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Only {product.stock} left!</div>
          )}
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: 120, filter: `drop-shadow(0 16px 32px ${product.accent}40)` }}>{product.emoji}</motion.span>
        </div>
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <button onClick={onClose} style={{ alignSelf: 'flex-end', width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', fontSize: 14, color: '#888', marginBottom: -8 }}>✕</button>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: product.accent, fontWeight: 700, marginBottom: 6 }}>{product.category}</p>
            <h2 style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', lineHeight: 1.1 }}>{product.name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 36, fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: product.accent }}>₹{product.price.toLocaleString()}</span>
            <span style={{ fontSize: 18, color: '#ccc', textDecoration: 'line-through' }}>₹{(product.price + 600).toLocaleString()}</span>
          </div>
          <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>{product.desc}</p>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', fontWeight: 700, marginBottom: 10 }}>
              Size {!selectedSize && <span style={{ color: '#E8829A' }}>— select one</span>}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{ width: 44, height: 44, borderRadius: 10, cursor: 'pointer', background: selectedSize === s ? product.accent : '#fff', border: `1.5px solid ${selectedSize === s ? product.accent : 'rgba(0,0,0,0.1)'}`, fontSize: 13, fontWeight: 700, color: selectedSize === s ? '#fff' : '#555', transition: 'all 0.2s ease' }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 10, overflow: 'hidden' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 38, height: 44, background: '#fff', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}>−</button>
              <span style={{ width: 40, textAlign: 'center', fontWeight: 700, color: '#1A1A2E' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: 38, height: 44, background: '#fff', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}>+</button>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { if (!selectedSize) { alert('Please select a size'); return; } onAdd(product, qty); onClose(); }}
              style={{ flex: 1, padding: 13, borderRadius: 12, cursor: 'pointer', background: `linear-gradient(135deg,${product.accent},${product.accent}CC)`, border: 'none', color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif', boxShadow: `0 4px 18px ${product.accent}40` }}
            >Add to Cart</motion.button>
            <button onClick={() => toggleWishlist(product.id)} style={{ width: 44, height: 44, borderRadius: 12, cursor: 'pointer', background: '#fff', border: '1.5px solid rgba(0,0,0,0.1)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {wishlist.includes(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
          <Link href={`/product/${product.id}`} style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: product.accent, textDecoration: 'none', fontWeight: 700, borderBottom: `1px solid ${product.accent}40`, paddingBottom: 2, alignSelf: 'flex-start' }}>
            View Full Details →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── SIZE GUIDE MODAL ────────────────────────────────────────
function SizeGuideModal({ onClose }: { onClose: () => void }) {
  const sizes = [
    { size: 'XS', chest: '32"', waist: '26"', hip: '34"' },
    { size: 'S',  chest: '34"', waist: '28"', hip: '36"' },
    { size: 'M',  chest: '36"', waist: '30"', hip: '38"' },
    { size: 'L',  chest: '38"', waist: '32"', hip: '40"' },
    { size: 'XL', chest: '40"', waist: '34"', hip: '42"' },
    { size: 'XXL',chest: '42"', waist: '36"', hip: '44"' },
  ]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(10,8,20,0.7)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} onClick={e => e.stopPropagation()}
        style={{ background: '#FDFAF5', borderRadius: 24, padding: 48, width: '100%', maxWidth: 560, boxShadow: '0 40px 80px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: 6 }}>Measurements</p>
            <h3 style={{ fontSize: 36, fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>Size Guide</h3>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', fontSize: 14, color: '#888' }}>✕</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Cormorant Garamond, serif' }}>
          <thead>
            <tr>{['Size','Chest','Waist','Hip'].map(h => (
              <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', fontWeight: 700, borderBottom: '2px solid rgba(212,168,67,0.15)' }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {sizes.map((row, i) => (
              <tr key={row.size} style={{ background: i%2===0?'transparent':'rgba(212,168,67,0.04)' }}>
                <td style={{ padding: '14px 16px', fontSize: 18, fontWeight: 700, color: '#D4A843' }}>{row.size}</td>
                <td style={{ padding: '14px 16px', fontSize: 17, color: '#555' }}>{row.chest}</td>
                <td style={{ padding: '14px 16px', fontSize: 17, color: '#555' }}>{row.waist}</td>
                <td style={{ padding: '14px 16px', fontSize: 17, color: '#555' }}>{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: 24, fontSize: 13, color: '#aaa', lineHeight: 1.7 }}>💡 For the best fit, measure over your inner garments. If between sizes, choose the larger size for traditional Indian wear.</p>
      </motion.div>
    </motion.div>
  )
}

// ─── DISCOUNT POPUP ──────────────────────────────────────────
function DiscountPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 700, background: 'rgba(10,8,20,0.6)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', stiffness: 240, damping: 26 }} onClick={e => e.stopPropagation()}
        style={{ background: '#1A1A2E', borderRadius: 28, overflow: 'hidden', width: '100%', maxWidth: 480, boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,67,0.2)', position: 'relative' }}>
        <div style={{ height: 4, background: 'linear-gradient(90deg,#D4A843,#E8829A,#7B9ED9,#D4A843)' }} />
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', fontSize: 12, color: '#888' }}>✕</button>
        <div style={{ padding: '48px 44px', textAlign: 'center' }}>
          <motion.p animate={{ rotate: [0,10,-10,0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }} style={{ fontSize: 56, marginBottom: 20 }}>🎁</motion.p>
          <p style={{ fontSize: 11, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: 12 }}>Exclusive Offer</p>
          <h3 style={{ fontSize: 52, fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#fff', lineHeight: 1, marginBottom: 12 }}>10% Off</h3>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontFamily: 'Cormorant Garamond, serif', lineHeight: 1.6 }}>your first order. Join thousands of happy customers across India.</p>
          {!submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}
                style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 15, fontFamily: 'Cormorant Garamond, serif', outline: 'none' }} />
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { if (email) { setSubmitted(true); localStorage.setItem('discountSeen','true') } }}
                style={{ padding: 16, borderRadius: 12, cursor: 'pointer', background: 'linear-gradient(135deg,#D4A843,#E8C46A)', border: 'none', color: '#1A1A2E', fontSize: 12, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif' }}>
                Claim My 10% Off
              </motion.button>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.15em' }}>No thanks, I'll pay full price</button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>🎉</p>
              <p style={{ fontSize: 24, fontFamily: 'Cormorant Garamond, serif', color: '#D4A843', fontWeight: 700, marginBottom: 8 }}>Code: WELCOME10</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Use at checkout for 10% off your first order!</p>
              <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} style={{ marginTop: 24, padding: '14px 32px', borderRadius: 12, cursor: 'pointer', background: 'linear-gradient(135deg,#D4A843,#E8C46A)', border: 'none', color: '#1A1A2E', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Start Shopping →</motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const t = e.target as HTMLElement
      setHovering(!!(t.closest('button') || t.closest('a') || t.closest('[data-hoverable]')))
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mousedown', down); window.removeEventListener('mouseup', up) }
  }, [])
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTrail(prev => ({ x: prev.x + (pos.x - prev.x) * 0.12, y: prev.y + (pos.y - prev.y) * 0.12 }))
    })
    return () => cancelAnimationFrame(id)
  }, [pos, trail])
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', width: hovering?48:clicking?12:10, height: hovering?48:clicking?12:10, borderRadius: '50%', background: hovering?'rgba(212,168,67,0.15)':'#D4A843', border: hovering?'1.5px solid #D4A843':'none', transform: `translate(${pos.x-(hovering?24:clicking?6:5)}px,${pos.y-(hovering?24:clicking?6:5)}px)`, transition: 'width 0.2s,height 0.2s,background 0.2s', mixBlendMode: 'multiply' as any }} />
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none', width: 4, height: 4, borderRadius: '50%', background: 'rgba(212,168,67,0.4)', transform: `translate(${trail.x-2}px,${trail.y-2}px)` }} />
    </>
  )
}

// ─── PRODUCT CARD ────────────────────────────────────────────
function ProductCard3D({ p, index, onQuickView, wishlist, toggleWishlist }: any) {
  const { addItem } = useCart()
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const isWished = wishlist.includes(p.id)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setRotY(((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 10)
    setRotX(-((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * 10)
  }
  const handleAdd = () => { addItem(p); setAdded(true); setTimeout(() => setAdded(false), 1800) }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16,1,0.3,1] }}
      ref={cardRef} onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotX(0); setRotY(0); setIsHovered(false) }}
      onMouseEnter={() => setIsHovered(true)}
      style={{ perspective: 1200 }} data-hoverable
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY, scale: isHovered?1.03:1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ borderRadius: 24, overflow: 'hidden', background: '#FFFFFF', boxShadow: isHovered?`0 20px 60px ${p.accent}25, 0 4px 20px rgba(0,0,0,0.08)`:'0 2px 20px rgba(0,0,0,0.06)', border: `1px solid ${isHovered?p.accent+'40':'rgba(0,0,0,0.06)'}`, transition: 'box-shadow 0.4s ease,border 0.4s ease', position: 'relative' }}
      >
        <button onClick={() => toggleWishlist(p.id)} style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)' }}>
          {isWished ? '❤️' : '🤍'}
        </button>
        <div style={{ background: p.soft, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <motion.div animate={{ opacity: isHovered?0.7:0, scale: isHovered?1.2:1 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 60%,${p.accent}30,transparent 70%)` }} />
          <div style={{ position: 'absolute', top: 14, left: 14, background: p.accent, borderRadius: 20, padding: '4px 12px', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff' }}>{p.tag}</div>
          {p.stock <= 3 && (
            <motion.div animate={{ scale: [1,1.05,1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#FF6B6B,#FF8E53)', borderRadius: 20, padding: '4px 14px', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', boxShadow: '0 4px 12px rgba(255,107,107,0.4)', whiteSpace: 'nowrap' }}>
              🔥 Only {p.stock} left!
            </motion.div>
          )}
          <motion.span animate={{ rotateY: isHovered?[0,360]:0, scale: isHovered?1.2:1, y: isHovered?-8:0 }} transition={{ rotateY: { duration: 1, ease: 'easeInOut' }, scale: { duration: 0.4 }, y: { duration: 0.4 } }} style={{ fontSize: 80, display: 'block', filter: isHovered?`drop-shadow(0 8px 20px ${p.accent}50)`:'none', transition: 'filter 0.3s ease' }}>
            {p.emoji}
          </motion.span>
        </div>
        <div style={{ padding: '20px 22px 22px', background: '#fff' }}>
          <motion.div animate={{ scaleX: isHovered?1:0.3, opacity: isHovered?1:0.3 }} style={{ height: 2, borderRadius: 2, marginBottom: 14, background: `linear-gradient(90deg,${p.accent},${p.accent}50)`, transformOrigin: 'left' }} />
          <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: 5, fontWeight: 600 }}>{p.category}</p>
          <h4 style={{ fontSize: 18, fontWeight: 500, marginBottom: 5, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', letterSpacing: '0.02em' }}>{p.name}</h4>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 16, lineHeight: 1.5 }}>{p.desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <div>
              <span style={{ fontSize: 20, fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>₹{p.price.toLocaleString()}</span>
              <span style={{ fontSize: 12, color: '#bbb', textDecoration: 'line-through', marginLeft: 6 }}>₹{(p.price+600).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onQuickView(p)}
                style={{ padding: '8px 12px', borderRadius: 10, cursor: 'pointer', background: '#fff', border: `1.5px solid ${p.accent}40`, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: p.accent }}>
                Quick View
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={handleAdd}
                style={{ padding: '8px 14px', borderRadius: 10, cursor: 'pointer', background: added?'#5BAD8F':p.accent, border: 'none', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: `0 4px 14px ${added?'#5BAD8F':p.accent}50`, transition: 'background 0.3s ease' }}>
                {added ? '✓' : '+ Cart'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────
export default function Home() {
  const { items, removeItem, total, addItem } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('splashShown')
  })
  const [activeCategory, setActiveCategory] = useState('All')
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showDiscount, setShowDiscount] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [scrollY, setScrollY] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (!showSplash) return
    const t = setTimeout(() => { setShowSplash(false); sessionStorage.setItem('splashShown','true') }, 3800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (showSplash) return
    if (localStorage.getItem('discountSeen')) return
    const t = setTimeout(() => setShowDiscount(true), 6000)
    return () => clearTimeout(t)
  }, [showSplash])

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const animDelay = (base: number) => showSplash ? base : 0
  const toggleWishlist = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)
  const cartCount = items.reduce((a: number, i: any) => a + i.quantity, 0)

  return (
    <>
      <CustomCursor />

      {/* ── GLOBAL VISUALS (always on top of everything, pointer-events:none) ── */}
      <GrainOverlay />
      <FloatingClothes />
      <FloatingPaisleys />

      {/* ── SPLASH ── */}
      <AnimatePresence>
        {showSplash && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: [0.76,0,0.24,1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FDFAF5' }}>
            {[{ color:'#FDE8C8',x:'15%',y:'20%',size:400 },{ color:'#E8D5F5',x:'80%',y:'15%',size:350 },{ color:'#D5EBF5',x:'75%',y:'75%',size:300 },{ color:'#F5D5E8',x:'10%',y:'80%',size:280 }].map((orb,i) => (
              <motion.div key={i} animate={{ scale:[1,1.15,1], opacity:[0.6,1,0.6] }} transition={{ duration:3+i, repeat:Infinity, ease:'easeInOut', delay:i*0.4 }}
                style={{ position:'absolute', left:orb.x, top:orb.y, width:orb.size, height:orb.size, borderRadius:'50%', background:orb.color, filter:'blur(70px)', transform:'translate(-50%,-50%)' }} />
            ))}
            {[320,240,160].map((size,i) => (
              <motion.div key={i} animate={{ rotate: i%2===0?360:-360 }} transition={{ duration:18+i*6, repeat:Infinity, ease:'linear' }}
                style={{ position:'absolute', borderRadius:'50%', width:size, height:size, border:`1px solid rgba(212,168,67,${0.12+i*0.06})` }} />
            ))}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.3 }} style={{ textAlign:'center', zIndex:10 }}>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5, duration:1.2 }}
                style={{ fontSize:96, fontFamily:'Tiro Devanagari Hindi, serif', color:'#D4A843', marginBottom:24, textShadow:'0 4px 30px rgba(212,168,67,0.25)', lineHeight:1 }}>
                नमस्कार
              </motion.p>
              <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:1, duration:1 }}
                style={{ height:2, width:220, margin:'0 auto 24px', background:'linear-gradient(90deg,transparent,#D4A843,transparent)' }} />
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
                style={{ fontSize:14, letterSpacing:'0.6em', textTransform:'uppercase', color:'#B89860', fontFamily:'Cormorant Garamond, serif', marginBottom:10, fontWeight:600 }}>
                The House of
              </motion.p>
              <motion.h1 initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.6 }}
                style={{ fontSize:64, fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase', color:'#1A1A2E', fontFamily:'Cormorant Garamond, serif', lineHeight:1 }}>
                Radhey
              </motion.h1>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.9 }}
                style={{ fontSize:18, letterSpacing:'0.55em', textTransform:'uppercase', color:'#D4A843', fontFamily:'Cormorant Garamond, serif', fontWeight:500 }}>
                Cloth Center
              </motion.p>
            </motion.div>
            <div style={{ position:'absolute', bottom:56, width:180, height:1, background:'rgba(212,168,67,0.15)', overflow:'hidden', borderRadius:1 }}>
              <motion.div initial={{ x:'-100%' }} animate={{ x:'100%' }} transition={{ duration:3.5, ease:'easeInOut' }}
                style={{ height:'100%', width:'100%', background:'linear-gradient(90deg,transparent,#D4A843,transparent)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ background: '#F9F6F0', fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', minHeight: '100vh', cursor: 'none' }}>

        {/* ── NAVBAR ── */}
        <motion.nav initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ delay:animDelay(4.1), duration:0.8 }}
          style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 52px', background: scrollY>60?'rgba(253,250,245,0.97)':'rgba(249,246,240,0.8)', backdropFilter:'blur(20px)', borderBottom: scrollY>60?'1px solid rgba(212,168,67,0.15)':'1px solid transparent', transition:'all 0.5s ease' }}>
          <div>
            <p style={{ fontSize:11, letterSpacing:'0.55em', textTransform:'uppercase', color:'#D4A843', marginBottom:3, fontWeight:700 }}>The House of</p>
            <h1 style={{ fontSize:24, letterSpacing:'0.25em', textTransform:'uppercase', fontWeight:700, fontFamily:'Cormorant Garamond, serif', color:'#1A1A2E' }}>Radhey Cloth Center</h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:36 }}>
            {['Home','Collection','Heritage','Contact'].map(link => (
              <a key={link} href={link==='Home'?'/':link==='Collection'?'#collection':`/${link.toLowerCase()}`}
                style={{ fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'#555', textDecoration:'none', transition:'color 0.3s ease', fontWeight:700, fontFamily:'Cormorant Garamond, serif' }}
                onMouseEnter={e => (e.currentTarget.style.color='#D4A843')}
                onMouseLeave={e => (e.currentTarget.style.color='#555')}
              >{link}</a>
            ))}
            <button onClick={() => setShowSizeGuide(true)} style={{ fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', color:'#888', background:'none', border:'none', cursor:'none', fontWeight:600, fontFamily:'Cormorant Garamond, serif', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='#D4A843')}
              onMouseLeave={e => (e.currentTarget.style.color='#888')}
            >📏 Size Guide</button>
            <button style={{ fontSize:13, background:'none', border:'none', cursor:'none', color: wishlist.length>0?'#E8829A':'#888', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
              {wishlist.length>0?'❤️':'🤍'} {wishlist.length>0&&wishlist.length}
            </button>
            <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={() => setCartOpen(true)}
              style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 22px', borderRadius:12, cursor:'none', background: cartCount>0?'#D4A843':'transparent', border:`1.5px solid ${cartCount>0?'#D4A843':'rgba(212,168,67,0.4)'}`, fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color: cartCount>0?'#fff':'#D4A843', transition:'all 0.3s ease', boxShadow: cartCount>0?'0 4px 16px rgba(212,168,67,0.3)':'none' }}>
              Cart
              {cartCount>0&&<span style={{ width:18, height:18, borderRadius:'50%', background:'#fff', color:'#D4A843', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800 }}>{cartCount}</span>}
            </motion.button>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <section ref={heroRef} style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:80 }}>
          <motion.div style={{ position:'absolute', inset:0, y:heroY, opacity:heroOpacity }}>
            {/* Soft glow blobs */}
            <div style={{ position:'absolute', right:-80, top:'10%', width:620, height:620, borderRadius:'50%', background:'radial-gradient(circle,rgba(253,232,200,0.45),rgba(245,213,232,0.25),transparent 68%)', filter:'blur(44px)' }} />
            <div style={{ position:'absolute', left:-100, bottom:'10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(213,235,245,0.35),transparent 68%)', filter:'blur(44px)' }} />
            {/* Floating flower petals */}
            {['🌸','🌺','✨','🌼','💮'].map((petal,i) => (
              <motion.span key={i} animate={{ y:[0,-20,0], opacity:[0.4,0.8,0.4], rotate:[0,10,0] }} transition={{ duration:3+i, repeat:Infinity, delay:i*0.7 }}
                style={{ position:'absolute', fontSize:20, left:`${15+i*15}%`, top:`${20+(i%3)*20}%`, pointerEvents:'none' }}>
                {petal}
              </motion.span>
            ))}
            {/* ★ HERO MANDALA ★ */}
            <HeroMandala />
          </motion.div>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:animDelay(4.2), duration:1.5 }}
            style={{ maxWidth:820, padding:'0 52px', position:'relative', zIndex:10 }}>
            <motion.p initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:animDelay(4.4) }}
              style={{ fontSize:14, letterSpacing:'0.55em', textTransform:'uppercase', color:'#D4A843', marginBottom:28, fontWeight:700 }}>
              Est. 1995 — Nashik, Maharashtra
            </motion.p>
            <motion.h2 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:animDelay(4.6), duration:1 }}
              style={{ fontSize:'clamp(72px,10vw,128px)', fontWeight:600, lineHeight:0.92, fontFamily:'Cormorant Garamond, serif', color:'#1A1A2E', letterSpacing:'-0.02em', marginBottom:4 }}>
              The Art of
            </motion.h2>
            <motion.h2 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:animDelay(4.8), duration:1 }}
              style={{ fontSize:'clamp(72px,10vw,128px)', fontWeight:600, lineHeight:0.92, fontFamily:'Cormorant Garamond, serif', color:'#D4A843', letterSpacing:'-0.02em', marginBottom:40 }}>
              Indian Tradition
            </motion.h2>
            <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:animDelay(5), duration:0.8 }}
              style={{ height:3, width:100, marginBottom:36, background:'linear-gradient(90deg,#D4A843,#E8829A)', transformOrigin:'left', borderRadius:2 }} />
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:animDelay(5.1) }}
              style={{ fontSize:20, color:'#555', lineHeight:1.9, maxWidth:500, marginBottom:48, fontWeight:400, letterSpacing:'0.02em', fontFamily:'Cormorant Garamond, serif' }}>
              Curating the finest handwoven sarees, sherwanis and traditional Indian garments since 1995. Each piece tells a story of heritage and craft.
            </motion.p>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:animDelay(5.3) }} style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <motion.a href="#collection" whileHover={{ scale:1.04, boxShadow:'0 8px 28px rgba(212,168,67,0.35)' }} whileTap={{ scale:0.97 }}
                style={{ padding:'18px 44px', borderRadius:14, cursor:'none', background:'linear-gradient(135deg,#D4A843,#E8C46A)', border:'none', color:'#fff', fontSize:13, fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', boxShadow:'0 4px 18px rgba(212,168,67,0.3)', fontFamily:'Cormorant Garamond, serif', textDecoration:'none', display:'inline-block' }}>
                Explore Collection
              </motion.a>
              <motion.button whileHover={{ scale:1.04, borderColor:'#D4A843', color:'#D4A843' }} onClick={() => setShowDiscount(true)}
                style={{ padding:'18px 44px', borderRadius:14, cursor:'none', background:'transparent', border:'2px solid rgba(26,26,46,0.2)', color:'#444', fontSize:13, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', transition:'all 0.3s ease', fontFamily:'Cormorant Garamond, serif' }}>
                🎁 Get 10% Off
              </motion.button>
            </motion.div>
          </motion.div>

          <div style={{ position:'absolute', bottom:36, left:52, display:'flex', alignItems:'center', gap:10 }}>
            <motion.div animate={{ scaleY:[1,0.2,1] }} transition={{ duration:1.5, repeat:Infinity }}
              style={{ width:1, height:40, background:'linear-gradient(to bottom,#D4A843,transparent)', transformOrigin:'top' }} />
            <p style={{ fontSize:9, letterSpacing:'0.35em', textTransform:'uppercase', color:'#D4A843', opacity:0.7 }}>Scroll</p>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div style={{ padding:'14px 0', overflow:'hidden', background:'#fff', borderTop:'1px solid rgba(212,168,67,0.12)', borderBottom:'1px solid rgba(212,168,67,0.12)' }}>
          <motion.div animate={{ x:[0,-1400] }} transition={{ duration:22, repeat:Infinity, ease:'linear' }} style={{ display:'flex', whiteSpace:'nowrap' }}>
            {[...Array(10)].map((_,i) => (
              <span key={i} style={{ fontSize:10, letterSpacing:'0.35em', textTransform:'uppercase', padding:'0 36px', color:['#D4A843','#E8829A','#7B9ED9','#5BAD8F','#C97EB5'][i%5], fontWeight:600 }}>
                {['Free Delivery Above ₹999','New Festive Collection 2025','Authentic Handwoven Wear','30 Day Returns','Cash on Delivery'][i%5]}
                <span style={{ marginLeft:36, opacity:0.3 }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── TOP SELLERS SECTION ── */}
        <TopSellersSection />

        {/* ── OCCASION FILTERS with Knitted Wheel bg ── */}
        <section style={{ padding:'60px 52px 0', position:'relative', overflow:'hidden' }}>
          <KnittedWheelBg />
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ position:'relative', zIndex:1 }}>
            <p style={{ fontSize:12, letterSpacing:'0.45em', textTransform:'uppercase', color:'#D4A843', marginBottom:24, fontWeight:700 }}>— Shop By Occasion</p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {occasions.map((occ,i) => (
                <motion.button key={occ.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                  whileHover={{ scale:1.04, boxShadow:'0 8px 24px rgba(212,168,67,0.2)' }} whileTap={{ scale:0.97 }}
                  onClick={() => setActiveCategory('All')}
                  style={{ padding:'16px 28px', borderRadius:16, cursor:'none', background:'#fff', border:'1.5px solid rgba(212,168,67,0.2)', display:'flex', alignItems:'center', gap:10, fontSize:15, fontWeight:600, color:'#444', fontFamily:'Cormorant Garamond, serif', transition:'all 0.3s ease', boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize:24 }}>{occ.emoji}</span>{occ.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── COLLECTION ── */}
        <section id="collection" style={{ padding:'60px 52px 90px', position:'relative', overflow:'hidden' }}>
          <CollectionDiamondBg />
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:52, flexWrap:'wrap', gap:20, position:'relative', zIndex:1 }}>
            <div>
              <p style={{ fontSize:13, letterSpacing:'0.45em', textTransform:'uppercase', color:'#D4A843', marginBottom:12, fontWeight:700 }}>— Our Collection</p>
              <h3 style={{ fontSize:'clamp(48px,5vw,72px)', fontWeight:600, fontFamily:'Cormorant Garamond, serif', color:'#1A1A2E', lineHeight:1 }}>The Atelier</h3>
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
              {categories.map(cat => (
                <motion.button key={cat} whileTap={{ scale:0.96 }} onClick={() => setActiveCategory(cat)}
                  style={{ padding:'9px 22px', borderRadius:12, cursor:'none', background: activeCategory===cat?'#D4A843':'#fff', border:`1.5px solid ${activeCategory===cat?'#D4A843':'rgba(212,168,67,0.25)'}`, fontSize:11, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color: activeCategory===cat?'#fff':'#888', boxShadow: activeCategory===cat?'0 4px 14px rgba(212,168,67,0.25)':'none', transition:'all 0.3s ease' }}>
                  {cat}
                </motion.button>
              ))}
              <button onClick={() => setShowSizeGuide(true)}
                style={{ padding:'9px 16px', borderRadius:12, cursor:'none', background:'#fff', border:'1.5px solid rgba(212,168,67,0.25)', fontSize:11, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', color:'#888', transition:'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#D4A843'; e.currentTarget.style.color='#D4A843' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(212,168,67,0.25)'; e.currentTarget.style.color='#888' }}>
                📏 Size Guide
              </button>
            </div>
          </motion.div>
          <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:24, position:'relative', zIndex:1 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p,i) => (
                <ProductCard3D key={p.id} p={p} index={i} onQuickView={setQuickViewProduct} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section style={{ padding:'70px 52px', background:'#fff', borderTop:'1px solid rgba(212,168,67,0.1)', borderBottom:'1px solid rgba(212,168,67,0.1)', position:'relative', overflow:'hidden' }}>
          <StatsWeaveBg />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, maxWidth:860, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
            {[{ num:'30', label:'Day Returns', color:'#E8829A' },{ num:'₹999', label:'Free Delivery', color:'#D4A843' },{ num:'100%', label:'Authentic', color:'#7B9ED9' },{ num:'1995', label:'Established', color:'#5BAD8F' }].map((f,i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }} viewport={{ once:true }}>
                <p style={{ fontSize:'clamp(44px,5vw,72px)', fontWeight:600, marginBottom:8, fontFamily:'Cormorant Garamond, serif', color:f.color }}>{f.num}</p>
                <p style={{ fontSize:13, letterSpacing:'0.25em', textTransform:'uppercase', color:'#888', fontWeight:700 }}>{f.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── WHATSAPP ── */}
        <motion.a href="https://wa.me/919881229141?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20collection." target="_blank" rel="noopener noreferrer"
          initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:animDelay(5.5), type:'spring', stiffness:200 }}
          whileHover={{ scale:1.1, boxShadow:'0 12px 36px rgba(37,211,102,0.4)' }} whileTap={{ scale:0.95 }}
          style={{ position:'fixed', bottom:32, right:32, zIndex:300, width:60, height:60, borderRadius:'50%', background:'linear-gradient(135deg,#25D366,#128C7E)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 24px rgba(37,211,102,0.35)', textDecoration:'none', fontSize:28, cursor:'none' }}>
          💬
          <motion.div animate={{ scale:[1,1.6], opacity:[0.4,0] }} transition={{ duration:1.8, repeat:Infinity }}
            style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid #25D366' }} />
        </motion.a>

        {/* ── CART SIDEBAR ── */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setCartOpen(false)}
                style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(26,26,46,0.25)', backdropFilter:'blur(6px)' }} />
              <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }} transition={{ type:'tween', duration:0.45, ease:[0.76,0,0.24,1] }}
                style={{ position:'fixed', right:0, top:0, height:'100%', width:400, zIndex:201, overflowY:'auto', background:'#FDFAF5', borderLeft:'1px solid rgba(212,168,67,0.15)', boxShadow:'-20px 0 60px rgba(26,26,46,0.08)' }}>
                <div style={{ height:3, background:'linear-gradient(90deg,#D4A843,#E8829A,#7B9ED9)' }} />
                <div style={{ padding:'36px 36px 24px', borderBottom:'1px solid rgba(212,168,67,0.1)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <p style={{ fontSize:13, letterSpacing:'0.4em', textTransform:'uppercase', color:'#D4A843', marginBottom:6, fontWeight:700 }}>Your Selection</p>
                      <h3 style={{ fontSize:36, fontWeight:600, fontFamily:'Cormorant Garamond, serif', color:'#1A1A2E' }}>The Cart</h3>
                    </div>
                    <button onClick={() => setCartOpen(false)} style={{ width:32, height:32, borderRadius:'50%', background:'rgba(212,168,67,0.1)', border:'none', cursor:'none', color:'#D4A843', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
                  </div>
                </div>
                <div style={{ padding:'24px 36px' }}>
                  {items.length===0 ? (
                    <div style={{ textAlign:'center', marginTop:80 }}>
                      <p style={{ fontSize:48, marginBottom:16 }}>🛍️</p>
                      <p style={{ fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase', color:'#bbb', fontWeight:600 }}>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      {items.map((item: any) => (
                        <motion.div key={item.id} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
                          style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderBottom:'1px solid rgba(212,168,67,0.08)' }}>
                          <div>
                            <p style={{ fontSize:18, fontWeight:600, fontFamily:'Cormorant Garamond, serif', color:'#1A1A2E', marginBottom:3 }}>{item.name}</p>
                            <p style={{ fontSize:14, color:'#D4A843', fontWeight:700 }}>₹{item.price.toLocaleString()} × {item.quantity}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} style={{ fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#ccc', background:'none', border:'none', cursor:'none', transition:'color 0.2s', fontWeight:600 }}
                            onMouseEnter={e => (e.currentTarget.style.color='#E8829A')}
                            onMouseLeave={e => (e.currentTarget.style.color='#ccc')}
                          >Remove</button>
                        </motion.div>
                      ))}
                      <div style={{ marginTop:28, paddingTop:20, borderTop:'1px solid rgba(212,168,67,0.12)' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                          <p style={{ fontSize:11, letterSpacing:'0.25em', textTransform:'uppercase', color:'#aaa', fontWeight:600 }}>Total</p>
                          <p style={{ fontSize:22, fontWeight:400, fontFamily:'Cormorant Garamond, serif', color:'#1A1A2E' }}>₹{total().toLocaleString()}</p>
                        </div>
                        <p style={{ fontSize:11, color:'#bbb', marginBottom:24 }}>🎁 Free delivery included</p>
                        <motion.button whileHover={{ scale:1.02, boxShadow:'0 8px 28px rgba(212,168,67,0.35)' }} whileTap={{ scale:0.98 }}
                          style={{ width:'100%', padding:15, background:'linear-gradient(135deg,#D4A843,#E8C46A)', border:'none', borderRadius:14, cursor:'none', fontSize:11, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:'#fff', boxShadow:'0 4px 18px rgba(212,168,67,0.3)' }}>
                          Proceed to Checkout
                        </motion.button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <footer style={{ padding:'72px 52px', background:'#fff', borderTop:'1px solid rgba(212,168,67,0.1)', position:'relative', overflow:'hidden' }}>
          <FooterMandalas />
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:56, marginBottom:56, position:'relative', zIndex:1 }}>
            <div>
              <p style={{ fontSize:12, letterSpacing:'0.5em', textTransform:'uppercase', color:'#D4A843', marginBottom:8, fontWeight:700 }}>The House of</p>
              <h5 style={{ fontSize:28, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'Cormorant Garamond, serif', color:'#1A1A2E', marginBottom:18 }}>Radhey Cloth Center</h5>
              <p style={{ fontSize:16, fontWeight:400, lineHeight:1.9, color:'#888', maxWidth:300, fontFamily:'Cormorant Garamond, serif' }}>
                Your trusted destination for authentic Indian traditional wear since 1995. Bringing culture and tradition to your wardrobe.
              </p>
            </div>
            <div>
              <p style={{ fontSize:12, letterSpacing:'0.4em', textTransform:'uppercase', color:'#bbb', marginBottom:22, fontWeight:700 }}>Navigate</p>
              {['Home','Collection','Heritage','Contact'].map(l => (
                <a key={l} href={l==='Home'?'/':l==='Collection'?'#collection':`/${l.toLowerCase()}`}
                  style={{ display:'block', fontSize:17, fontWeight:500, color:'#666', textDecoration:'none', marginBottom:12, transition:'color 0.2s', fontFamily:'Cormorant Garamond, serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color='#D4A843')}
                  onMouseLeave={e => (e.currentTarget.style.color='#666')}
                >{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize:12, letterSpacing:'0.4em', textTransform:'uppercase', color:'#bbb', marginBottom:22, fontWeight:700 }}>Visit Us</p>
              {['Bus Stand Road','Shembalpimpri, Nashik','+91 98812 29141','mylifeastanmay@gmail.com'].map(line => (
                <p key={line} style={{ fontSize:16, color:'#777', marginBottom:10, fontFamily:'Cormorant Garamond, serif', fontWeight:400 }}>{line}</p>
              ))}
              <a href="https://wa.me/919881229141" target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:12, padding:'10px 20px', borderRadius:12, background:'#25D366', color:'#fff', textDecoration:'none', fontSize:13, fontWeight:700, letterSpacing:'0.1em' }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
          <div style={{ height:1, background:'rgba(212,168,67,0.1)', marginBottom:24 }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', position:'relative', zIndex:1 }}>
            <p style={{ fontSize:13, letterSpacing:'0.25em', textTransform:'uppercase', color:'#bbb', fontWeight:600 }}>© 2025 Radhey Cloth Center</p>
            <p style={{ fontSize:13, letterSpacing:'0.25em', textTransform:'uppercase', color:'#bbb', fontWeight:600 }}>Made with ❤️ in India</p>
          </div>
        </footer>
      </main>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)}
            onAdd={(p: any, qty: number) => { for (let i=0;i<qty;i++) addItem(p) }}
            wishlist={wishlist} toggleWishlist={toggleWishlist} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showDiscount && <DiscountPopup onClose={() => setShowDiscount(false)} />}
      </AnimatePresence>
    </>
  )
}
