import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

function useReveal(t = 0.12) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } },
      { threshold: t }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, on]
}

const Reveal = ({ children, delay = 0, x = 0, y = 24 }) => {
  const [ref, on] = useReveal()
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'none' : `translate(${x}px,${y}px)`,
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>{children}</div>
  )
}

const OL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--accent)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>{children}</span>
  </div>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

// Images professionnelles pour chaque produit
const PROD_IMAGES = [
  // 01 Cashew Nuts — noix de cajou réelles
  '/images/cashew.avif', // Image locale optimisée
  // 02 Rice
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
  // 03 Cooking Oil
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
  // 04 Gold
  'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80',
  // 05 Diamonds
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  // 06 Industrial
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
]

const PROD_DETAILS = [
  { origin:'West Africa',   season:'April – July',  quality:'Grade A / Grade B',     packaging:'FCL 20\'/40\'' },
  { origin:'Asia & Africa', season:'Year-round',     quality:'Long grain / Parboiled', packaging:'50kg bags, Big Bags' },
  { origin:'Malaysia, Senegal', season:'Year-round', quality:'Refined / Crude',        packaging:'1L–20L drums, IBC' },
  { origin:'West Africa',   season:'Year-round',     quality:'999.9 / 22K / 18K',      packaging:'On request' },
  { origin:'Central Africa',season:'Year-round',     quality:'Gem / Industrial',        packaging:'On request' },
  { origin:'International', season:'Year-round',     quality:'Variable',                packaging:'On quote' },
]

export default function Products() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  if (!t?.products) return null
  const p = t.products

  return (
    <div style={{ background:'var(--bg-primary)' }}>

      {/* HEADER */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', padding:'72px 48px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,var(--glow) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1, animation:'fadeUp 0.75s ease both' }}>
          <OL>{p.label}</OL>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(38px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'640px', marginBottom:'18px' }}>
            {p.title}
          </h1>
          <p style={{ fontSize:'16px', color:'var(--text-secondary)', maxWidth:'560px', lineHeight:1.85, fontWeight:300 }}>{p.sub}</p>
          <div style={{ display:'flex', gap:'14px', marginTop:'28px', flexWrap:'wrap' }}>
            {['Premium','Food','Precious','Industrial'].map(tag => (
              <span key={tag} style={{ background:'var(--accent-bg)', border:'1px solid var(--border-accent)', color:'var(--accent)', fontSize:'11px', padding:'4px 14px', borderRadius:'4px', fontWeight:500, letterSpacing:'0.5px', textTransform:'uppercase' }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <p style={{ fontSize:'14px', color:'var(--text-muted)', marginBottom:'36px', fontStyle:'italic', fontWeight:300 }}>
              Click on any product to view detailed specifications.
            </p>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {p.items.map((item, i) => {
              const isSel = selected === i
              const det = PROD_DETAILS[i]
              return (
                <Reveal key={i} delay={i * 50}>
                  <div
                    onClick={() => setSelected(isSel ? null : i)}
                    style={{
                      background:'var(--bg-secondary)',
                      border:`1px solid ${isSel ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius:'10px',
                      overflow:'hidden',
                      cursor:'pointer',
                      transition:'all 0.3s ease',
                      transform: isSel ? 'translateY(-3px)' : 'none',
                      boxShadow: isSel ? 'var(--shadow-accent)' : 'none',
                    }}
                  >
                    {/* Image */}
                    <div style={{ height:'200px', overflow:'hidden', position:'relative', background:'var(--bg-card)' }}>
                      <img
                        src={PROD_IMAGES[i]}
                        alt={item.title}
                        loading="lazy"
                        style={{
                            width:'100%', height:'100%', objectFit:'cover', display:'block',
                            transition:'transform 0.5s ease',
                        }}
                        onError={e => {
                            e.currentTarget.src = `https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&q=80`
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform='none'}
                        />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(4,8,15,0.45) 0%,transparent 50%)', pointerEvents:'none' }}/>
                      <div style={{ position:'absolute', top:'14px', right:'14px' }}>
                        <span style={{
                          background:'rgba(4,8,15,0.72)',
                          border:'1px solid rgba(255,255,255,0.18)',
                          backdropFilter:'blur(8px)',
                          color:'rgba(255,255,255,0.90)',
                          fontSize:'10.5px', padding:'4px 11px', borderRadius:'4px',
                          fontWeight:600, textTransform:'uppercase', letterSpacing:'0.8px',
                        }}>{item.tag}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding:'22px 24px 0' }}>
                      <div style={{ fontSize:'11px', letterSpacing:'2px', color:'var(--text-muted)', textTransform:'uppercase', marginBottom:'6px', fontWeight:500 }}>
                        {String(i+1).padStart(2,'0')} — {item.cat}
                      </div>
                      <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'22px', fontWeight:700, color:'var(--text-primary)', marginBottom:'8px' }}>{item.title}</h3>
                      <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{item.desc}</p>
                    </div>

                    {/* Expanded specs */}
                    <div style={{
                      maxHeight: isSel ? '320px' : '0',
                      overflow:'hidden',
                      transition:'max-height 0.4s ease',
                    }}>
                      <div style={{ padding:'18px 24px 0', marginTop:'14px', borderTop:'1px solid var(--border)', margin:'14px 24px 0' }}>
                        {[
                          { label:'Origin',      val:det.origin },
                          { label:'Seasonality', val:det.season },
                          { label:'Quality',     val:det.quality },
                          { label:'Packaging',   val:det.packaging },
                        ].map((row,j) => (
                          <div key={j} style={{
                            display:'flex', justifyContent:'space-between', alignItems:'center',
                            padding:'9px 0',
                            borderBottom: j < 3 ? '1px solid var(--border)' : 'none',
                            fontSize:'13px',
                          }}>
                            <span style={{ color:'var(--text-muted)', fontWeight:400, textTransform:'uppercase', fontSize:'10.5px', letterSpacing:'1px' }}>{row.label}</span>
                            <span style={{ color:'var(--text-primary)', fontWeight:500 }}>{row.val}</span>
                          </div>
                        ))}

                        <button
                          onClick={e => { e.stopPropagation(); navigate('/contact') }}
                          style={{
                            display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                            marginTop:'16px', marginBottom:'24px',
                            width:'100%', padding:'13px',
                            borderRadius:'7px',
                            background:'var(--gradient-btn)',
                            color:'#fff', fontWeight:600, fontSize:'14px',
                            border:'none', cursor:'pointer',
                            fontFamily:'Inter,sans-serif',
                            boxShadow:'var(--shadow-accent)',
                            transition:'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(59,130,246,0.42)' }}
                          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                        >
                          Request a Quote <ArrowRight/>
                        </button>
                      </div>
                    </div>

                    {/* Toggle indicator */}
                    <div style={{
                      padding:'12px 24px',
                      borderTop:'1px solid var(--border)',
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                    }}>
                      <span style={{ fontSize:'11.5px', color:'var(--text-muted)', fontWeight:300 }}>
                        {isSel ? 'Close' : 'View specifications'}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transition:'transform 0.3s ease', transform:isSel?'rotate(180deg)':'none' }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* QUALITY STANDARDS */}
      <section style={{ padding:'88px 48px', background:'var(--bg-secondary)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>
              <div>
                <OL>Quality & Compliance</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, marginBottom:'20px' }}>
                  International Quality Standards
                </h2>
                <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'28px' }}>
                  Every product we trade is subject to rigorous quality controls. We work exclusively with certified suppliers and trusted partners worldwide.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0', border:'1px solid var(--border)', borderRadius:'9px', overflow:'hidden', marginBottom:'28px' }}>
                  {[
                    'Verified and certified suppliers',
                    'Quality control at every stage',
                    'Complete documentation and traceability',
                    'Compliance with international standards',
                    'Quality assurance during transit',
                  ].map((q,i,arr) => (
                    <div key={i} style={{
                      padding:'14px 18px', fontSize:'13.5px', color:'var(--text-secondary)', fontWeight:400,
                      borderBottom: i < arr.length-1 ? '1px solid var(--border)' : 'none',
                      background:'var(--bg-primary)',
                      display:'flex', alignItems:'center', gap:'12px',
                    }}>
                      <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', flexShrink:0 }}/>
                      {q}
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate('/contact')}
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 28px', borderRadius:'7px', background:'var(--gradient-btn)', color:'#fff', fontWeight:600, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.25s', boxShadow:'var(--shadow-accent)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(59,130,246,0.40)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                >
                  Request a Product <ArrowRight/>
                </button>
              </div>

              <div>
                <div style={{ background:'var(--bg-primary)', border:'1px solid var(--border)', borderRadius:'10px', overflow:'hidden' }}>
                  <div style={{ padding:'18px 24px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg-secondary)' }}>
                    <span style={{ fontSize:'12px', fontWeight:600, color:'var(--text-primary)', textTransform:'uppercase', letterSpacing:'1px' }}>Product Availability</span>
                    <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                      <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }}/>
                      <span style={{ fontSize:'12px', color:'#16a34a', fontWeight:600 }}>Available</span>
                    </div>
                  </div>
                  {p.items.map((item,i) => (
                    <div key={i}
                      style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 24px', borderBottom: i < p.items.length-1 ? '1px solid var(--border)' : 'none', transition:'background 0.2s', cursor:'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.background='var(--accent-bg)'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      onClick={() => navigate('/products')}
                    >
                      <div>
                        <div style={{ fontSize:'14px', fontWeight:500, color:'var(--text-primary)', marginBottom:'2px' }}>{item.title}</div>
                        <div style={{ fontSize:'11.5px', color:'var(--text-muted)', fontWeight:300 }}>{PROD_DETAILS[i].origin}</div>
                      </div>
                      <span style={{ background:'var(--accent-bg)', border:'1px solid var(--border-accent)', color:'var(--accent)', fontSize:'10.5px', padding:'3px 10px', borderRadius:'4px', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.5px' }}>
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}