'use client'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { useCart } from '@/lib/store'
import Link from 'next/link'

const products = [
  { id: 1, name: "Banarasi Saree", price: 1299, desc: "Pure silk with golden zari work", tag: "Bestseller", category: "Women", emoji: "👘", accent: "#D4A843", soft: "#FFF8ED", fullDesc: "The Banarasi saree is a testament to India's rich weaving heritage. Handcrafted in Varanasi by master weavers, each saree takes weeks to complete. The golden zari threads are woven in intricate floral and paisley motifs, creating a fabric that shimmers with every movement. Perfect for weddings, festivals, and special occasions.", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Ivory Gold", "Deep Red", "Royal Blue"], material: "Pure Silk", origin: "Varanasi, UP", stock: 3 },
  { id: 2, name: "Royal Sherwani", price: 2499, desc: "Embroidered sherwani for groom & occasions", tag: "Premium", category: "Men", emoji: "🥻", accent: "#7B9ED9", soft: "#EEF4FF", fullDesc: "The Royal Sherwani is crafted for the modern Indian man who appreciates tradition. Featuring hand-embroidered motifs on premium brocade fabric, this sherwani exudes regal elegance. The intricate zardozi work on the collar and cuffs adds a touch of royal sophistication.", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Ivory White", "Royal Maroon", "Navy Blue"], material: "Brocade Silk", origin: "Lucknow, UP", stock: 5 },
  { id: 3, name: "Bridal Lehenga", price: 3899, desc: "Heavy embroidery bridal lehenga choli", tag: "Bridal", category: "Women", emoji: "👗", accent: "#E8829A", soft: "#FFF0F4", fullDesc: "Our Bridal Lehenga is the centerpiece of every bride's dream wedding. Hand-embroidered with thousands of mirror pieces, sequins, and zari threads, this masterpiece takes over 3 months to create. The flowing skirt, fitted choli, and sheer dupatta make for a complete bridal ensemble.", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Bridal Red", "Blush Pink", "Royal Gold"], material: "Heavy Silk with Net", origin: "Jaipur, Rajasthan", stock: 2 },
  { id: 4, name: "Silk Kurta Set", price: 799, desc: "Premium cotton-silk kurta pajama", tag: "Daily Wear", category: "Men", emoji: "🧥", accent: "#5BAD8F", soft: "#EDFAF4", fullDesc: "The Silk Kurta Set combines comfort with elegance for everyday wear. Made from a premium cotton-silk blend, it drapes beautifully and feels luxurious against the skin. The subtle thread work on the collar and placket adds a refined touch without being overstated.", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Off White", "Sage Green", "Sky Blue"], material: "Cotton-Silk Blend", origin: "Surat, Gujarat", stock: 12 },
  { id: 5, name: "Anarkali Suit", price: 1499, desc: "Elegant floral anarkali with dupatta", tag: "Trending", category: "Women", emoji: "👚", accent: "#E8A84C", soft: "#FFF9ED", fullDesc: "Inspired by the legendary Anarkali, this suit features a flowing floor-length silhouette with intricate floral embroidery. The soft georgette fabric moves gracefully, and the matching dupatta with embroidered borders completes the look.", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Peach", "Mint Green", "Lavender"], material: "Georgette with Net", origin: "Delhi", stock: 4 },
]

const relatedProducts = [
  { id: 7, name: "Chanderi Saree", price: 1099, emoji: "🪭", accent: "#C97EB5", soft: "#FFF0FB" },
  { id: 9, name: "Patola Saree", price: 2199, emoji: "🪆", accent: "#E8829A", soft: "#FFF0F4" },
  { id: 10, name: "Kanjivaram Saree", price: 2799, emoji: "👑", accent: "#D4A843", soft: "#FFF8ED" },
]

const reviews = [
  { name: "Priya Sharma", rating: 5, location: "Mumbai", text: "Absolutely stunning quality! The zari work is even more beautiful in person. Received so many compliments at my cousin's wedding.", date: "Jan 2025", avatar: "👩" },
  { name: "Anita Patel", rating: 5, location: "Ahmedabad", text: "Fast delivery and the packaging was so luxurious. The saree feels exactly as described — pure silk, very soft.", date: "Dec 2024", avatar: "👩‍🦱" },
  { name: "Ritu Verma", rating: 4, location: "Delhi", text: "Lovely piece, the colors are vibrant and true to the photos. Would definitely buy again from Radhey.", date: "Feb 2025", avatar: "👩‍🦳" },
]

// Custom Cursor
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  if (typeof window !== 'undefined') {
    // Only add listeners on client
  }

  useState(() => {
    if (typeof window === 'undefined') return
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
  })

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

// Size Guide Modal
function SizeGuideModal({ onClose, accent }: { onClose: () => void, accent: string }) {
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
      style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(10,8,20,0.7)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#FDFAF5', borderRadius: '24px', padding: '48px', width: '100%', maxWidth: '560px', boxShadow: '0 40px 80px rgba(0,0,0,0.25)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: '6px' }}>Measurements</p>
            <h3 style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>Size Guide</h3>
          </div>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#888' }}>✕</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Cormorant Garamond, serif' }}>
          <thead>
            <tr>
              {['Size', 'Chest', 'Waist', 'Hip'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', fontWeight: 700, borderBottom: `2px solid ${accent}20` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map((row, i) => (
              <tr key={row.size} style={{ background: i % 2 === 0 ? 'transparent' : `${accent}06` }}>
                <td style={{ padding: '14px 16px', fontSize: '18px', fontWeight: 700, color: accent }}>{row.size}</td>
                <td style={{ padding: '14px 16px', fontSize: '17px', color: '#555' }}>{row.chest}</td>
                <td style={{ padding: '14px 16px', fontSize: '17px', color: '#555' }}>{row.waist}</td>
                <td style={{ padding: '14px 16px', fontSize: '17px', color: '#555' }}>{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: '24px', fontSize: '13px', color: '#aaa', lineHeight: 1.7 }}>
          💡 For the best fit, measure over your inner garments. If between sizes, choose the larger size.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params?.id || '1')
  const product = products.find(p => p.id === productId) || products[0]
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [emojiRotate, setEmojiRotate] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [activeThumb, setActiveThumb] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)

  // Sticky add to cart visibility
  const buyRef = useRef<HTMLDivElement>(null)
  const [showStickyBtn, setShowStickyBtn] = useState(false)

  if (typeof window !== 'undefined') {
    // Observer for sticky button
  }

  const handleAdd = () => {
    if (!selectedSize) { alert('Please select a size'); return }
    for (let i = 0; i < quantity; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const thumbEmojis = [product.emoji, '🪡', '✨']

  // Live viewers count (random between 4-12)
  const viewers = Math.floor(Math.random() * 8) + 4

  return (
    <>
      <CustomCursor />

      <main style={{ background: '#F9F6F0', minHeight: '100vh', fontFamily: 'Cormorant Garamond, serif', cursor: 'none' }}>

        {/* NAVBAR */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 52px',
          background: 'rgba(253,250,245,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,168,67,0.15)',
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.55em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '2px', fontWeight: 700 }}>The House of</p>
            <h1 style={{ fontSize: '22px', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>
              Radhey Cloth Center
            </h1>
          </Link>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px', color: '#888' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#D4A843' }}>›</span>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Collection</Link>
            <span style={{ color: '#D4A843' }}>›</span>
            <span style={{ color: '#1A1A2E', fontWeight: 600 }}>{product.name}</span>
          </div>
        </nav>

        <div style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', padding: '120px 52px 80px' }}>

          {/* MAIN PRODUCT */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '100px' }}>

            {/* LEFT */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                onHoverStart={() => setEmojiRotate(true)}
                onHoverEnd={() => setEmojiRotate(false)}
                style={{
                  background: product.soft, borderRadius: '28px', height: '520px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: `0 20px 60px ${product.accent}20`,
                  border: `1px solid ${product.accent}20`, marginBottom: '16px',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${product.accent}20, transparent 70%)` }} />
                <div style={{
                  position: 'absolute', top: 20, left: 20,
                  background: product.accent, borderRadius: '20px',
                  padding: '6px 16px', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff',
                  boxShadow: `0 4px 14px ${product.accent}50`,
                }}>{product.tag}</div>

                {/* Live viewers */}
                <motion.div
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute', top: 20, right: 20,
                    background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                    borderRadius: '20px', padding: '6px 14px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '12px', color: '#555', fontWeight: 600,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5BAD8F' }} />
                  {viewers} viewing now
                </motion.div>

                {/* Low stock */}
                {product.stock <= 3 && (
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                      borderRadius: '20px', padding: '7px 20px',
                      fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: '#fff',
                      boxShadow: '0 4px 16px rgba(255,107,107,0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >🔥 Only {product.stock} left in stock!</motion.div>
                )}

                <motion.span
                  animate={{ rotateY: emojiRotate ? 360 : 0, scale: emojiRotate ? 1.15 : 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  style={{ fontSize: '160px', display: 'block', filter: `drop-shadow(0 20px 40px ${product.accent}40)` }}
                >{product.emoji}</motion.span>
              </motion.div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {thumbEmojis.map((em, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, boxShadow: `0 8px 24px ${product.accent}30` }}
                    onClick={() => setActiveThumb(i)}
                    style={{
                      flex: 1, height: '100px', borderRadius: '16px',
                      background: product.soft, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '40px', cursor: 'none',
                      border: activeThumb === i ? `2px solid ${product.accent}` : `1px solid ${product.accent}20`,
                      transition: 'all 0.3s ease',
                    }}
                  >{em}</motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: product.accent, fontWeight: 700, marginBottom: '10px' }}>
                {product.category} · {product.origin}
              </p>
              <h1 style={{ fontSize: '56px', fontWeight: 700, lineHeight: 1, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '18px', color: '#777', marginBottom: '16px', lineHeight: 1.7, fontWeight: 400 }}>{product.desc}</p>

              {/* Star rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#D4A843', fontSize: '18px' }}>★</span>)}
                </div>
                <span style={{ fontSize: '14px', color: '#888', fontWeight: 600 }}>4.9</span>
                <span style={{ fontSize: '14px', color: '#bbb' }}>({reviews.length} reviews)</span>
                <a href="#reviews" style={{ fontSize: '12px', color: product.accent, textDecoration: 'none', letterSpacing: '0.1em', fontWeight: 700 }}>Read Reviews →</a>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '36px' }}>
                <span style={{ fontSize: '48px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: product.accent }}>
                  ₹{product.price.toLocaleString()}
                </span>
                <span style={{ fontSize: '20px', color: '#bbb', textDecoration: 'line-through' }}>₹{(product.price + 600).toLocaleString()}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#5BAD8F', background: '#EDFAF4', padding: '4px 12px', borderRadius: '20px' }}>Save ₹600</span>
              </div>

              <div style={{ height: '1px', background: 'rgba(212,168,67,0.15)', marginBottom: '28px' }} />

              {/* Color */}
              <div style={{ marginBottom: '28px' }}>
                <p style={{ fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', fontWeight: 700, marginBottom: '14px' }}>
                  Colour — <span style={{ color: product.accent }}>{selectedColor}</span>
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map(col => (
                    <motion.button key={col} whileTap={{ scale: 0.95 }} onClick={() => setSelectedColor(col)}
                      style={{
                        padding: '9px 20px', borderRadius: '10px', cursor: 'none',
                        background: selectedColor === col ? product.accent : '#fff',
                        border: `1.5px solid ${selectedColor === col ? product.accent : 'rgba(0,0,0,0.1)'}`,
                        fontSize: '13px', fontWeight: 600, color: selectedColor === col ? '#fff' : '#555',
                        transition: 'all 0.25s ease',
                        boxShadow: selectedColor === col ? `0 4px 14px ${product.accent}40` : 'none',
                      }}
                    >{col}</motion.button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <p style={{ fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', fontWeight: 700 }}>
                    Size {!selectedSize && <span style={{ color: '#E8829A', fontSize: '11px' }}>— Please select</span>}
                  </p>
                  <button onClick={() => setShowSizeGuide(true)} style={{
                    fontSize: '12px', color: product.accent, background: 'none', border: 'none', cursor: 'none',
                    fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'underline', fontFamily: 'Cormorant Garamond, serif',
                  }}>📏 Size Guide</button>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.sizes.map(size => (
                    <motion.button key={size} whileTap={{ scale: 0.95 }} onClick={() => setSelectedSize(size)}
                      style={{
                        width: '52px', height: '52px', borderRadius: '12px', cursor: 'none',
                        background: selectedSize === size ? product.accent : '#fff',
                        border: `1.5px solid ${selectedSize === size ? product.accent : 'rgba(0,0,0,0.1)'}`,
                        fontSize: '14px', fontWeight: 700, color: selectedSize === size ? '#fff' : '#555',
                        transition: 'all 0.25s ease',
                        boxShadow: selectedSize === size ? `0 4px 14px ${product.accent}40` : 'none',
                      }}
                    >{size}</motion.button>
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
                <p style={{ fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', fontWeight: 700 }}>Qty</p>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '44px', height: '44px', background: '#fff', border: 'none', fontSize: '20px', cursor: 'none', color: '#555', fontWeight: 300 }}>−</button>
                  <span style={{ width: '48px', textAlign: 'center', fontSize: '18px', fontWeight: 700, color: '#1A1A2E' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ width: '44px', height: '44px', background: '#fff', border: 'none', fontSize: '20px', cursor: 'none', color: '#555', fontWeight: 300 }}>+</button>
                </div>
              </div>

              {/* Buttons */}
              <div ref={buyRef} style={{ display: 'flex', gap: '14px', marginBottom: '32px' }}>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: `0 10px 30px ${product.accent}40` }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  style={{
                    flex: 1, padding: '18px', borderRadius: '14px', cursor: 'none',
                    background: added ? '#5BAD8F' : `linear-gradient(135deg, ${product.accent}, ${product.accent}CC)`,
                    border: 'none', color: '#fff',
                    fontSize: '15px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontFamily: 'Cormorant Garamond, serif',
                    boxShadow: `0 4px 18px ${product.accent}35`,
                    transition: 'background 0.3s ease',
                  }}
                >{added ? '✓ Added to Cart!' : 'Add to Cart'}</motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setWishlisted(!wishlisted)}
                  style={{
                    width: '56px', height: '56px', borderRadius: '14px', cursor: 'none',
                    background: wishlisted ? '#FFF0F4' : '#fff',
                    border: `1.5px solid ${wishlisted ? '#E8829A' : 'rgba(0,0,0,0.1)'}`,
                    fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >{wishlisted ? '❤️' : '🤍'}</motion.button>
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                href={`https://wa.me/919881229141?text=Hi! I'm interested in the ${product.name} (₹${product.price}). Can you help me?`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: '#fff', textDecoration: 'none', marginBottom: '28px',
                  fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                  fontFamily: 'Cormorant Garamond, serif',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
                }}
              >
                💬 Ask on WhatsApp
              </motion.a>

              {/* Trust badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { icon: '🚚', text: 'Free Delivery above ₹999' },
                  { icon: '↩️', text: '30 Day Easy Returns' },
                  { icon: '✅', text: '100% Authentic Fabric' },
                  { icon: '🏺', text: `Origin: ${product.origin}` },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderRadius: '12px', background: '#fff', border: '1px solid rgba(212,168,67,0.12)' }}>
                    <span style={{ fontSize: '18px' }}>{b.icon}</span>
                    <span style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* TABS */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid rgba(212,168,67,0.12)', marginBottom: '40px' }}>
              {['description', 'material', 'care'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '16px 36px', background: 'none', border: 'none', cursor: 'none',
                    fontSize: '15px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                    fontFamily: 'Cormorant Garamond, serif',
                    color: activeTab === tab ? product.accent : '#aaa',
                    borderBottom: activeTab === tab ? `3px solid ${product.accent}` : '3px solid transparent',
                    marginBottom: '-2px', transition: 'all 0.3s ease',
                  }}
                >{tab}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ maxWidth: '700px' }}>
                {activeTab === 'description' && (
                  <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.9, fontWeight: 400 }}>{product.fullDesc}</p>
                )}
                {activeTab === 'material' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {[
                      { label: 'Material', value: product.material },
                      { label: 'Origin', value: product.origin },
                      { label: 'Category', value: product.category },
                      { label: 'Occasion', value: 'Festive / Wedding' },
                      { label: 'Wash', value: 'Dry Clean Only' },
                      { label: 'Craft', value: 'Handwoven / Hand Embroidered' },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: '16px 20px', borderRadius: '14px', background: '#fff', border: '1px solid rgba(212,168,67,0.1)' }}>
                        <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#bbb', fontWeight: 700, marginBottom: '4px' }}>{item.label}</p>
                        <p style={{ fontSize: '17px', color: '#1A1A2E', fontWeight: 600 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'care' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { icon: '🧺', tip: 'Dry clean only for best results' },
                      { icon: '🌡️', tip: 'Store in a cool, dry place away from sunlight' },
                      { icon: '👜', tip: 'Keep in muslin cloth bag to avoid snagging' },
                      { icon: '🪡', tip: 'Handle zari work with care to maintain shine' },
                      { icon: '💧', tip: 'Avoid direct contact with perfume or water' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '14px', background: '#fff', border: '1px solid rgba(212,168,67,0.1)' }}>
                        <span style={{ fontSize: '24px' }}>{item.icon}</span>
                        <p style={{ fontSize: '17px', color: '#555', fontWeight: 400 }}>{item.tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* REVIEWS */}
          <motion.div id="reviews" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '80px' }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.45em', textTransform: 'uppercase', color: product.accent, marginBottom: '12px', fontWeight: 700 }}>— Customer Stories</p>
            <h3 style={{ fontSize: '52px', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '40px', lineHeight: 1 }}>Reviews</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid rgba(212,168,67,0.1)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.rating ? '#D4A843' : '#eee', fontSize: '16px' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.8, marginBottom: '20px', fontStyle: 'italic' }}>"{r.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '32px' }}>{r.avatar}</span>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#1A1A2E', fontFamily: 'Cormorant Garamond, serif' }}>{r.name}</p>
                      <p style={{ fontSize: '12px', color: '#aaa' }}>{r.location} · {r.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RELATED */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#D4A843', marginBottom: '12px', fontWeight: 700 }}>— You May Also Like</p>
            <h3 style={{ fontSize: '52px', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '40px', lineHeight: 1 }}>Related Pieces</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {relatedProducts.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  whileHover={{ scale: 1.02, boxShadow: `0 16px 40px ${rp.accent}20` }}
                  style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)', cursor: 'none', transition: 'all 0.3s ease' }}
                >
                  <Link href={`/product/${rp.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: rp.soft, height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '70px' }}>{rp.emoji}</div>
                    <div style={{ padding: '20px' }}>
                      <h4 style={{ fontSize: '22px', fontWeight: 600, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E', marginBottom: '6px' }}>{rp.name}</h4>
                      <p style={{ fontSize: '18px', color: rp.accent, fontWeight: 700 }}>₹{rp.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* STICKY ADD TO CART */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: scrollY > 600 ? 0 : 100, opacity: scrollY > 600 ? 1 : 0 }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
            background: 'rgba(253,250,245,0.97)', backdropFilter: 'blur(20px)',
            borderTop: `1px solid ${product.accent}20`,
            padding: '16px 52px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '40px' }}>{product.emoji}</span>
            <div>
              <p style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif', color: '#1A1A2E' }}>{product.name}</p>
              <p style={{ fontSize: '22px', color: product.accent, fontWeight: 700, fontFamily: 'Cormorant Garamond, serif' }}>₹{product.price.toLocaleString()}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${product.accent}40` }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            style={{
              padding: '14px 44px', borderRadius: '14px', cursor: 'none',
              background: added ? '#5BAD8F' : `linear-gradient(135deg, ${product.accent}, ${product.accent}CC)`,
              border: 'none', color: '#fff',
              fontSize: '13px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'Cormorant Garamond, serif',
              boxShadow: `0 4px 18px ${product.accent}35`,
              transition: 'background 0.3s ease',
            }}
          >{added ? '✓ Added!' : 'Add to Cart'}</motion.button>
        </motion.div>

        {/* FOOTER */}
        <footer style={{ padding: '52px', background: '#fff', borderTop: '1px solid rgba(212,168,67,0.1)', textAlign: 'center', marginTop: '80px', marginBottom: '80px' }}>
          <p style={{ fontSize: '13px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#bbb', fontWeight: 600 }}>
            © 2025 Radhey Cloth Center · Made with ❤️ in India
          </p>
        </footer>
      </main>

      {/* WhatsApp floating */}
      <motion.a
        href={`https://wa.me/919881229141?text=Hi! I'm interested in the ${product.name}.`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        style={{
          position: 'fixed', bottom: '100px', right: '32px', zIndex: 300,
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.35)',
          textDecoration: 'none', fontSize: '26px', cursor: 'none',
        }}
      >
        💬
        <motion.div animate={{ scale: [1, 1.6], opacity: [0.4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #25D366' }} />
      </motion.a>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} accent={product.accent} />}
      </AnimatePresence>
    </>
  )
}
