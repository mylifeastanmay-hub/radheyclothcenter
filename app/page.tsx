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

// Quick View Modal
function QuickViewModal({ product, onClose, onAdd, wishlist, toggleWishlist }: any) {
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(10,8,20,0.7)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FDFAF5',
          borderRadius: '28px',
          width: '100%', maxWidth: '760px',
          overflow: 'hidden',
          boxShadow: `0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px ${product.accent}30`,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Left visual */}
        <div style={{
          background: product.soft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', minHeight: '400px',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${product.accent}25, transparent 70%)`,
          }} />
          <div style={{
            position: 'absolute', top: 16, left: 16,
            background: product.accent, borderRadius: '20px',
            padding: '5px 14px', fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff',
          }}>{product.tag}</div>
          {product.stock <= 3 && (
            <div style={{
              position: 'absolute', top: 16, right: 16,
              background: '#FF6B6B', borderRadius: '20px',
              padding: '5px 14px', fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
            }}>Only {product.stock} left!</div>
          )}
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '120px', filter: `drop-shadow(0 16px 32px ${product.accent}40)` }}
          >{product.emoji}</motion.span>
        </div>

        {/* Right info */}
        <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <button onClick={onClose} style={{
            alignSelf: 'flex-end', width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer',
            fontSize: '14px', color: '#888', marginBottom: '-8px',
          }}>✕</button>

          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', color: product.accent, fontWeight: 700, marginBottom: '6px' }}>
              {product.category}
            </p>
            <h2 style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', lineHeight: 1.1 }}>
              {product.name}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: product.accent }}>
              ₹{product.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '18px', color: '#ccc', textDecoration: 'line-through' }}>
              ₹{(product.price + 600).toLocaleString()}
            </span>
          </div>

          <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.7 }}>{product.desc}</p>

          {/* Size */}
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', fontWeight: 700, marginBottom: '10px' }}>
              Size {!selectedSize && <span style={{ color: '#E8829A' }}>— select one</span>}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{
                  width: '44px', height: '44px', borderRadius: '10px', cursor: 'pointer',
                  background: selectedSize === s ? product.accent : '#fff',
                  border: `1.5px solid ${selectedSize === s ? product.accent : 'rgba(0,0,0,0.1)'}`,
                  fontSize: '13px', fontWeight: 700,
                  color: selectedSize === s ? '#fff' : '#555',
                  transition: 'all 0.2s ease',
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden',
            }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '38px', height: '44px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#555' }}>−</button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: 700, color: '#1A1A2E' }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ width: '38px', height: '44px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#555' }}>+</button>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { if (!selectedSize) { alert('Please select a size'); return; } onAdd(product, qty); onClose(); }}
              style={{
                flex: 1, padding: '13px', borderRadius: '12px', cursor: 'pointer',
                background: `linear-gradient(135deg, ${product.accent}, ${product.accent}CC)`,
                border: 'none', color: '#fff',
                fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'Cormorant Garamond, serif',
                boxShadow: `0 4px 18px ${product.accent}40`,
              }}
            >Add to Cart</motion.button>
            <button onClick={() => toggleWishlist(product.id)} style={{
              width: '44px', height: '44px', borderRadius: '12px', cursor: 'pointer',
              background: '#fff', border: '1.5px solid rgba(0,0,0,0.1)',
              fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {wishlist.includes(product.id) ? '❤️' : '🤍'}
            </button>
          </div>

          <Link href={`/product/${product.id}`} style={{
            fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: product.accent, textDecoration: 'none', fontWeight: 700,
            borderBottom: `1px solid ${product.accent}40`, paddingBottom: '2px', alignSelf: 'flex-start',
          }}>
            View Full Details →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Size Guide Modal
function SizeGuideModal({ onClose }: { onClose: () => void }) {
  const sizes = [
    { size: 'XS', chest: '32"', waist: '26"', hip: '34"' },
    { size: 'S', chest: '34"', waist: '28"', hip: '36"' },
    { size: 'M', chest: '36"', waist: '30"', hip: '38"' },
    { size: 'L', chest: '38"', waist: '32"', hip: '40"' },
    { size: 'XL', chest: '40"', waist: '34"', hip: '42"' },
    { size: 'XXL', chest: '42"', waist: '36"', hip: '44"' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(10,8,20,0.7)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FDFAF5', borderRadius: '24px', padding: '48px',
          width: '100%', maxWidth: '560px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '6px' }}>Measurements</p>
            <h3 style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>Size Guide</h3>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#888' }}>✕</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Cormorant Garamond, serif' }}>
            <thead>
              <tr>
                {['Size', 'Chest', 'Waist', 'Hip'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', fontWeight: 700, borderBottom: '2px solid rgba(212,168,67,0.15)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, i) => (
                <tr key={row.size} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(212,168,67,0.04)' }}>
                  <td style={{ padding: '14px 16px', fontSize: '18px', fontWeight: 700, color: '#D4A843' }}>{row.size}</td>
                  <td style={{ padding: '14px 16px', fontSize: '17px', color: '#555' }}>{row.chest}</td>
                  <td style={{ padding: '14px 16px', fontSize: '17px', color: '#555' }}>{row.waist}</td>
                  <td style={{ padding: '14px 16px', fontSize: '17px', color: '#555' }}>{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '24px', fontSize: '13px', color: '#aaa', lineHeight: 1.7 }}>
          💡 For the best fit, measure over your inner garments. If between sizes, choose the larger size for traditional Indian wear.
        </p>
      </motion.div>
    </motion.div>
  )
}

// Discount Popup
function DiscountPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 700,
        background: 'rgba(10,8,20,0.6)', backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1A1A2E',
          borderRadius: '28px', overflow: 'hidden',
          width: '100%', maxWidth: '480px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,67,0.2)',
          position: 'relative',
        }}
      >
        {/* Gold gradient top */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #D4A843, #E8829A, #7B9ED9, #D4A843)' }} />

        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
          fontSize: '12px', color: '#888',
        }}>✕</button>

        <div style={{ padding: '48px 44px', textAlign: 'center' }}>
          <motion.p
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            style={{ fontSize: '56px', marginBottom: '20px' }}
          >🎁</motion.p>

          <p style={{ fontSize: '11px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#D4A843', fontWeight: 700, marginBottom: '12px' }}>
            Exclusive Offer
          </p>
          <h3 style={{ fontSize: '52px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#fff', lineHeight: 1, marginBottom: '12px' }}>
            10% Off
          </h3>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontFamily: 'Cormorant Garamond, serif', lineHeight: 1.6 }}>
            your first order. Join thousands of happy customers across India.
          </p>

          {!submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  padding: '16px 20px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: '15px', fontFamily: 'Cormorant Garamond, serif',
                  outline: 'none',
                }}
              />
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(212,168,67,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { if (email) { setSubmitted(true); localStorage.setItem('discountSeen', 'true') } }}
                style={{
                  padding: '16px', borderRadius: '12px', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #D4A843, #E8C46A)',
                  border: 'none', color: '#1A1A2E',
                  fontSize: '12px', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase',
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                Claim My 10% Off
              </motion.button>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', fontSize: '12px', cursor: 'pointer', letterSpacing: '0.15em' }}>
                No thanks, I'll pay full price
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</p>
              <p style={{ fontSize: '24px', fontFamily: 'Cormorant Garamond, serif', color: '#D4A843', fontWeight: 700, marginBottom: '8px' }}>
                Code: WELCOME10
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Use at checkout for 10% off your first order!</p>
              <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} style={{
                marginTop: '24px', padding: '14px 32px', borderRadius: '12px', cursor: 'pointer',
                background: 'linear-gradient(135deg, #D4A843, #E8C46A)', border: 'none', color: '#1A1A2E',
                fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>Start Shopping →</motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Custom Cursor
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setHovering(!!(target.closest('button') || target.closest('a') || target.closest('[data-hoverable]')))
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }))
    })
    return () => cancelAnimationFrame(id)
  }, [pos, trail])

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
        width: hovering ? '48px' : clicking ? '12px' : '10px',
        height: hovering ? '48px' : clicking ? '12px' : '10px',
        borderRadius: '50%',
        background: hovering ? 'rgba(212,168,67,0.15)' : '#D4A843',
        border: hovering ? '1.5px solid #D4A843' : 'none',
        transform: `translate(${pos.x - (hovering ? 24 : clicking ? 6 : 5)}px, ${pos.y - (hovering ? 24 : clicking ? 6 : 5)}px)`,
        transition: 'width 0.2s, height 0.2s, background 0.2s',
        mixBlendMode: 'multiply',
      }} />
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none',
        width: '4px', height: '4px', borderRadius: '50%',
        background: 'rgba(212,168,67,0.4)',
        transform: `translate(${trail.x - 2}px, ${trail.y - 2}px)`,
      }} />
    </>
  )
}

// Product Card
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
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRotY(((x - rect.width / 2) / (rect.width / 2)) * 10)
    setRotX(-((y - rect.height / 2) / (rect.height / 2)) * 10)
  }

  const handleAdd = () => {
    addItem(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotX(0); setRotY(0); setIsHovered(false) }}
      onMouseEnter={() => setIsHovered(true)}
      style={{ perspective: '1200px' }}
      data-hoverable
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY, scale: isHovered ? 1.03 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          borderRadius: '24px', overflow: 'hidden', background: '#FFFFFF',
          boxShadow: isHovered
            ? `0 20px 60px ${p.accent}25, 0 4px 20px rgba(0,0,0,0.08)`
            : '0 2px 20px rgba(0,0,0,0.06)',
          border: `1px solid ${isHovered ? p.accent + '40' : 'rgba(0,0,0,0.06)'}`,
          transition: 'box-shadow 0.4s ease, border 0.4s ease',
          position: 'relative',
        }}
      >
        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(p.id)}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 10,
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
            fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s ease',
          }}
        >
          {isWished ? '❤️' : '🤍'}
        </button>

        {/* Card top */}
        <div style={{
          background: p.soft, height: '220px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <motion.div
            animate={{ opacity: isHovered ? 0.7 : 0, scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 50% 60%, ${p.accent}30, transparent 70%)`,
            }}
          />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: p.accent, borderRadius: '20px',
            padding: '4px 12px', fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff',
          }}>{p.tag}</div>

          {/* Scarcity badge */}
          {p.stock <= 3 && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                borderRadius: '20px', padding: '4px 14px',
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#fff',
                boxShadow: '0 4px 12px rgba(255,107,107,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              🔥 Only {p.stock} left!
            </motion.div>
          )}

          <motion.span
            animate={{
              rotateY: isHovered ? [0, 360] : 0,
              scale: isHovered ? 1.2 : 1,
              y: isHovered ? -8 : 0,
            }}
            transition={{
              rotateY: { duration: 1, ease: 'easeInOut' },
              scale: { duration: 0.4 },
              y: { duration: 0.4 },
            }}
            style={{
              fontSize: '80px', display: 'block',
              filter: isHovered ? `drop-shadow(0 8px 20px ${p.accent}50)` : 'none',
              transition: 'filter 0.3s ease',
            }}
          >{p.emoji}</motion.span>
        </div>

        {/* Card bottom */}
        <div style={{ padding: '20px 22px 22px', background: '#fff' }}>
          <motion.div
            animate={{ scaleX: isHovered ? 1 : 0.3, opacity: isHovered ? 1 : 0.3 }}
            style={{
              height: '2px', borderRadius: '2px', marginBottom: '14px',
              background: `linear-gradient(90deg, ${p.accent}, ${p.accent}50)`,
              transformOrigin: 'left',
            }}
          />
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '5px', fontWeight: 600 }}>{p.category}</p>
          <h4 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '5px', fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', letterSpacing: '0.02em' }}>{p.name}</h4>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px', lineHeight: 1.5 }}>{p.desc}</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>
                ₹{p.price.toLocaleString()}
              </span>
              <span style={{ fontSize: '12px', color: '#bbb', textDecoration: 'line-through', marginLeft: '6px' }}>
                ₹{(p.price + 600).toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => onQuickView(p)}
                style={{
                  padding: '8px 12px', borderRadius: '10px', cursor: 'pointer',
                  background: '#fff', border: `1.5px solid ${p.accent}40`,
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: p.accent, transition: 'all 0.2s',
                }}
              >Quick View</motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                onClick={handleAdd}
                style={{
                  padding: '8px 14px', borderRadius: '10px', cursor: 'pointer',
                  background: added ? '#5BAD8F' : p.accent,
                  border: 'none', color: '#fff',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  boxShadow: `0 4px 14px ${added ? '#5BAD8F' : p.accent}50`,
                  transition: 'background 0.3s ease',
                }}
              >{added ? '✓' : '+ Cart'}</motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

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
    const timer = setTimeout(() => {
      setShowSplash(false)
      sessionStorage.setItem('splashShown', 'true')
    }, 3800)
    return () => clearTimeout(timer)
  }, [])

  // Show discount popup after 6s if not seen
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

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)
  const cartCount = items.reduce((a: number, i: any) => a + i.quantity, 0)

  return (
    <>
      <CustomCursor />

      {/* SPLASH */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: '#FDFAF5',
            }}
          >
            {[
              { color: '#FDE8C8', x: '15%', y: '20%', size: 400 },
              { color: '#E8D5F5', x: '80%', y: '15%', size: 350 },
              { color: '#D5EBF5', x: '75%', y: '75%', size: 300 },
              { color: '#F5D5E8', x: '10%', y: '80%', size: 280 },
            ].map((orb, i) => (
              <motion.div key={i}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                style={{
                  position: 'absolute', left: orb.x, top: orb.y,
                  width: orb.size, height: orb.size, borderRadius: '50%',
                  background: orb.color, filter: 'blur(70px)',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
            {[320, 240, 160].map((size, i) => (
              <motion.div key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 18 + i * 6, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', borderRadius: '50%', width: size, height: size,
                  border: `1px solid rgba(212,168,67,${0.12 + i * 0.06})`,
                }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ textAlign: 'center', zIndex: 10 }}
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.2 }}
                style={{ fontSize: '96px', fontFamily: 'Tiro Devanagari Hindi, serif', color: '#D4A843', marginBottom: '24px', textShadow: '0 4px 30px rgba(212,168,67,0.25)', lineHeight: 1 }}>
                नमस्कार
              </motion.p>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 1 }}
                style={{ height: '2px', width: '220px', margin: '0 auto 24px', background: 'linear-gradient(90deg, transparent, #D4A843, transparent)' }} />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                style={{ fontSize: '14px', letterSpacing: '0.6em', textTransform: 'uppercase', color: '#B89860', fontFamily: 'Cormorant Garamond, serif', marginBottom: '10px', fontWeight: 600 }}>
                The House of
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
                style={{ fontSize: '64px', fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#1A1A2E', fontFamily: 'Cormorant Garamond, serif', lineHeight: 1 }}>
                Radhey
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
                style={{ fontSize: '18px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#D4A843', fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                Cloth Center
              </motion.p>
            </motion.div>
            <div style={{ position: 'absolute', bottom: 56, width: '180px', height: '1px', background: 'rgba(212,168,67,0.15)', overflow: 'hidden', borderRadius: '1px' }}>
              <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 3.5, ease: 'easeInOut' }}
                style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, transparent, #D4A843, transparent)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ background: '#F9F6F0', fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', minHeight: '100vh', cursor: 'none' }}>

        {/* NAVBAR */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animDelay(4.1), duration: 0.8 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 52px',
            background: scrollY > 60 ? 'rgba(253,250,245,0.97)' : 'rgba(249,246,240,0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: scrollY > 60 ? '1px solid rgba(212,168,67,0.15)' : '1px solid transparent',
            transition: 'all 0.5s ease',
          }}
        >
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '3px', fontWeight: 700 }}>The House of</p>
            <h1 style={{ fontSize: '24px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>
              Radhey Cloth Center
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {['Home', 'Collection', 'Heritage', 'Contact'].map((link) => (
              <a key={link}
                href={link === 'Home' ? '/' : link === 'Collection' ? '#collection' : `/${link.toLowerCase()}`}
                style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', textDecoration: 'none', transition: 'color 0.3s ease', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4A843')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555')}
              >{link}</a>
            ))}

            {/* Size Guide button */}
            <button onClick={() => setShowSizeGuide(true)} style={{
              fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#888', background: 'none', border: 'none', cursor: 'none',
              fontWeight: 600, fontFamily: 'Cormorant Garamond, serif',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#D4A843')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}
            >
              📏 Size Guide
            </button>

            {/* Wishlist */}
            <button style={{
              fontSize: '13px', background: 'none', border: 'none', cursor: 'none',
              color: wishlist.length > 0 ? '#E8829A' : '#888', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              {wishlist.length > 0 ? '❤️' : '🤍'} {wishlist.length > 0 && wishlist.length}
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setCartOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 22px', borderRadius: '12px', cursor: 'none',
                background: cartCount > 0 ? '#D4A843' : 'transparent',
                border: `1.5px solid ${cartCount > 0 ? '#D4A843' : 'rgba(212,168,67,0.4)'}`,
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: cartCount > 0 ? '#fff' : '#D4A843',
                transition: 'all 0.3s ease',
                boxShadow: cartCount > 0 ? '0 4px 16px rgba(212,168,67,0.3)' : 'none',
              }}
            >
              Cart
              {cartCount > 0 && (
                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', color: '#D4A843', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </motion.nav>

        {/* HERO with Parallax */}
        <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
          <motion.div style={{ position: 'absolute', inset: 0, y: heroY, opacity: heroOpacity }}>
            <div style={{ position: 'absolute', right: '-80px', top: '10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, #FDE8C840, #F5D5E820, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', left: '-100px', bottom: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, #D5EBF540, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', opacity: 0.25 }}>
              {[440, 340, 240, 140].map((size, i) => (
                <motion.div key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 25 + i * 8, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', borderRadius: '50%', width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: `1.5px solid ${['#D4A843', '#E8829A', '#7B9ED9', '#5BAD8F'][i]}` }}
                />
              ))}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px' }}>🪔</div>
            </div>
            {['🌸', '🌺', '✨', '🌼', '💮'].map((petal, i) => (
              <motion.span key={i}
                animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4], rotate: [0, 10, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
                style={{ position: 'absolute', fontSize: '20px', left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%`, pointerEvents: 'none' }}
              >{petal}</motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: animDelay(4.2), duration: 1.5 }}
            style={{ maxWidth: '820px', padding: '0 52px', position: 'relative', zIndex: 10 }}
          >
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: animDelay(4.4) }}
              style={{ fontSize: '14px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '28px', fontWeight: 700 }}>
              Est. 1995 — Nashik, Maharashtra
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: animDelay(4.6), duration: 1 }}
              style={{ fontSize: 'clamp(72px, 10vw, 128px)', fontWeight: 600, lineHeight: 0.92, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              The Art of
            </motion.h2>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: animDelay(4.8), duration: 1 }}
              style={{ fontSize: 'clamp(72px, 10vw, 128px)', fontWeight: 600, lineHeight: 0.92, fontFamily: 'Cormorant Garamond, serif', color: '#D4A843', letterSpacing: '-0.02em', marginBottom: '40px' }}>
              Indian Tradition
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: animDelay(5), duration: 0.8 }}
              style={{ height: '3px', width: '100px', marginBottom: '36px', background: 'linear-gradient(90deg, #D4A843, #E8829A)', transformOrigin: 'left', borderRadius: '2px' }} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: animDelay(5.1) }}
              style={{ fontSize: '20px', color: '#555', lineHeight: 1.9, maxWidth: '500px', marginBottom: '48px', fontWeight: 400, letterSpacing: '0.02em', fontFamily: 'Cormorant Garamond, serif' }}>
              Curating the finest handwoven sarees, sherwanis and traditional Indian garments since 1995. Each piece tells a story of heritage and craft.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: animDelay(5.3) }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <motion.a href="#collection" whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(212,168,67,0.35)' }} whileTap={{ scale: 0.97 }}
                style={{ padding: '18px 44px', borderRadius: '14px', cursor: 'none', background: 'linear-gradient(135deg, #D4A843, #E8C46A)', border: 'none', color: '#fff', fontSize: '13px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', boxShadow: '0 4px 18px rgba(212,168,67,0.3)', fontFamily: 'Cormorant Garamond, serif', textDecoration: 'none', display: 'inline-block' }}>
                Explore Collection
              </motion.a>
              <motion.button whileHover={{ scale: 1.04, borderColor: '#D4A843', color: '#D4A843' }}
                onClick={() => setShowDiscount(true)}
                style={{ padding: '18px 44px', borderRadius: '14px', cursor: 'none', background: 'transparent', border: '2px solid rgba(26,26,46,0.2)', color: '#444', fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'all 0.3s ease', fontFamily: 'Cormorant Garamond, serif' }}>
                🎁 Get 10% Off
              </motion.button>
            </motion.div>
          </motion.div>

          <div style={{ position: 'absolute', bottom: '36px', left: '52px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div animate={{ scaleY: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #D4A843, transparent)', transformOrigin: 'top' }} />
            <p style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#D4A843', opacity: 0.7 }}>Scroll</p>
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ padding: '14px 0', overflow: 'hidden', background: '#fff', borderTop: '1px solid rgba(212,168,67,0.12)', borderBottom: '1px solid rgba(212,168,67,0.12)' }}>
          <motion.div animate={{ x: [0, -1400] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {[...Array(10)].map((_, i) => (
              <span key={i} style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', padding: '0 36px', color: ['#D4A843', '#E8829A', '#7B9ED9', '#5BAD8F', '#C97EB5'][i % 5], fontWeight: 600 }}>
                {['Free Delivery Above ₹999', 'New Festive Collection 2025', 'Authentic Handwoven Wear', '30 Day Returns', 'Cash on Delivery'][i % 5]}
                <span style={{ marginLeft: '36px', opacity: 0.3 }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* OCCASION FILTERS */}
        <section style={{ padding: '60px 52px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: '0' }}
          >
            <p style={{ fontSize: '12px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '24px', fontWeight: 700 }}>— Shop By Occasion</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {occasions.map((occ, i) => (
                <motion.button
                  key={occ.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(212,168,67,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory('All')}
                  style={{
                    padding: '16px 28px', borderRadius: '16px', cursor: 'none',
                    background: '#fff', border: '1.5px solid rgba(212,168,67,0.2)',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    fontSize: '15px', fontWeight: 600, color: '#444',
                    fontFamily: 'Cormorant Garamond, serif',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{occ.emoji}</span>
                  {occ.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* COLLECTION */}
        <section id="collection" style={{ padding: '60px 52px 90px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '52px', flexWrap: 'wrap', gap: '20px' }}
          >
            <div>
              <p style={{ fontSize: '13px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '12px', fontWeight: 700 }}>— Our Collection</p>
              <h3 style={{ fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', lineHeight: 1 }}>The Atelier</h3>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {categories.map(cat => (
                <motion.button key={cat} whileTap={{ scale: 0.96 }} onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '9px 22px', borderRadius: '12px', cursor: 'none',
                    background: activeCategory === cat ? '#D4A843' : '#fff',
                    border: `1.5px solid ${activeCategory === cat ? '#D4A843' : 'rgba(212,168,67,0.25)'}`,
                    fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: activeCategory === cat ? '#fff' : '#888',
                    boxShadow: activeCategory === cat ? '0 4px 14px rgba(212,168,67,0.25)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >{cat}</motion.button>
              ))}
              <button onClick={() => setShowSizeGuide(true)} style={{
                padding: '9px 16px', borderRadius: '12px', cursor: 'none',
                background: '#fff', border: '1.5px solid rgba(212,168,67,0.25)',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.color = '#D4A843' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,168,67,0.25)'; e.currentTarget.style.color = '#888' }}
              >📏 Size Guide</button>
            </div>
          </motion.div>

          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <ProductCard3D key={p.id} p={p} index={i} onQuickView={setQuickViewProduct} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* STATS */}
        <section style={{ padding: '70px 52px', background: '#fff', borderTop: '1px solid rgba(212,168,67,0.1)', borderBottom: '1px solid rgba(212,168,67,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            {[
              { num: '30', label: 'Day Returns', color: '#E8829A' },
              { num: '₹999', label: 'Free Delivery', color: '#D4A843' },
              { num: '100%', label: 'Authentic', color: '#7B9ED9' },
              { num: '1995', label: 'Established', color: '#5BAD8F' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <p style={{ fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 600, marginBottom: '8px', fontFamily: 'Cormorant Garamond, serif', color: f.color }}>{f.num}</p>
                <p style={{ fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', fontWeight: 700 }}>{f.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHATSAPP BUTTON */}
        <motion.a
          href="https://wa.me/919881229141?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20collection."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: animDelay(5.5), type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1, boxShadow: '0 12px 36px rgba(37,211,102,0.4)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed', bottom: '32px', right: '32px', zIndex: 300,
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 24px rgba(37,211,102,0.35)',
            textDecoration: 'none', fontSize: '28px',
            cursor: 'none',
          }}
        >
          💬
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid #25D366',
            }}
          />
        </motion.a>

        {/* CART SIDEBAR */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setCartOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(26,26,46,0.25)', backdropFilter: 'blur(6px)' }}
              />
              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'fixed', right: 0, top: 0, height: '100%', width: '400px', zIndex: 201, overflowY: 'auto', background: '#FDFAF5', borderLeft: '1px solid rgba(212,168,67,0.15)', boxShadow: '-20px 0 60px rgba(26,26,46,0.08)' }}
              >
                <div style={{ height: '3px', background: 'linear-gradient(90deg, #D4A843, #E8829A, #7B9ED9)' }} />
                <div style={{ padding: '36px 36px 24px', borderBottom: '1px solid rgba(212,168,67,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '13px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '6px', fontWeight: 700 }}>Your Selection</p>
                      <h3 style={{ fontSize: '36px', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>The Cart</h3>
                    </div>
                    <button onClick={() => setCartOpen(false)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(212,168,67,0.1)', border: 'none', cursor: 'none', color: '#D4A843', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  </div>
                </div>
                <div style={{ padding: '24px 36px' }}>
                  {items.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '80px' }}>
                      <p style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</p>
                      <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', fontWeight: 600 }}>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      {items.map((item: any) => (
                        <motion.div key={item.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(212,168,67,0.08)' }}>
                          <div>
                            <p style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '3px' }}>{item.name}</p>
                            <p style={{ fontSize: '14px', color: '#D4A843', fontWeight: 700 }}>₹{item.price.toLocaleString()} × {item.quantity}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ccc', background: 'none', border: 'none', cursor: 'none', transition: 'color 0.2s', fontWeight: 600 }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#E8829A')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}
                          >Remove</button>
                        </motion.div>
                      ))}
                      <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(212,168,67,0.12)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <p style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600 }}>Total</p>
                          <p style={{ fontSize: '22px', fontWeight: 400, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>₹{total().toLocaleString()}</p>
                        </div>
                        <p style={{ fontSize: '11px', color: '#bbb', marginBottom: '24px' }}>🎁 Free delivery included</p>
                        <motion.button whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(212,168,67,0.35)' }} whileTap={{ scale: 0.98 }}
                          style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #D4A843, #E8C46A)', border: 'none', borderRadius: '14px', cursor: 'none', fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', boxShadow: '0 4px 18px rgba(212,168,67,0.3)' }}>
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

        {/* FOOTER */}
        <footer style={{ padding: '72px 52px', background: '#fff', borderTop: '1px solid rgba(212,168,67,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '56px', marginBottom: '56px' }}>
            <div>
              <p style={{ fontSize: '12px', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '8px', fontWeight: 700 }}>The House of</p>
              <h5 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '18px' }}>Radhey Cloth Center</h5>
              <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.9, color: '#888', maxWidth: '300px', fontFamily: 'Cormorant Garamond, serif' }}>
                Your trusted destination for authentic Indian traditional wear since 1995. Bringing culture and tradition to your wardrobe.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#bbb', marginBottom: '22px', fontWeight: 700 }}>Navigate</p>
              {['Home', 'Collection', 'Heritage', 'Contact'].map(l => (
                <a key={l} href={l === 'Home' ? '/' : l === 'Collection' ? '#collection' : `/${l.toLowerCase()}`}
                  style={{ display: 'block', fontSize: '17px', fontWeight: 500, color: '#666', textDecoration: 'none', marginBottom: '12px', transition: 'color 0.2s', fontFamily: 'Cormorant Garamond, serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#D4A843')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                >{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#bbb', marginBottom: '22px', fontWeight: 700 }}>Visit Us</p>
              {['Bus Stand Road', 'Shembalpimpri, Nashik', '+91 98812 29141', 'mylifeastanmay@gmail.com'].map(line => (
                <p key={line} style={{ fontSize: '16px', color: '#777', marginBottom: '10px', fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>{line}</p>
              ))}
              <a href="https://wa.me/919881229141" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '12px', padding: '10px 20px', borderRadius: '12px', background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em' }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
          <div style={{ height: '1px', background: 'rgba(212,168,67,0.1)', marginBottom: '24px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#bbb', fontWeight: 600 }}>© 2025 Radhey Cloth Center</p>
            <p style={{ fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#bbb', fontWeight: 600 }}>Made with ❤️ in India</p>
          </div>
        </footer>
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAdd={(p: any, qty: number) => { for (let i = 0; i < qty; i++) addItem(p) }}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
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
