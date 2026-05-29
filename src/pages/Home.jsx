// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

/* ── Animation au scroll ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const AnimSection = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, visible] = useInView()
  const transforms = { up:'translateY(32px)', down:'translateY(-32px)', left:'translateX(-32px)', right:'translateX(32px)' }
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0)' : transforms[direction],
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── Section Label ── */
const SL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
    <div style={{ width:'32px', height:'2px', background:'var(--gradient-btn)', borderRadius:'1px' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>{children}</span>
  </div>
)

/* ── Glass Card ── */
const GlassCard = ({ children, style = {}, onClick, colors }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="glass"
      style={{
        padding:'28px', cursor: onClick ? 'pointer' : 'default',
        background: colors
          ? (hov ? 'var(--bg-card)' : colors)
          : undefined,
        transform: hov ? 'translateY(-5px)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const MiniServiceCard = ({ icon, title, body, grad }) => {
  const [hov, setHov] = useState(false)
  return (
    <div className="glass"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding:'18px', background:`linear-gradient(135deg,${grad},var(--bg-card))`, transform:hov?'translateY(-4px) scale(1.02)':'none' }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
        <span style={{ fontSize:'18px' }}>{icon}</span>
        <span style={{ fontSize:'12.5px', fontWeight:600, color:'var(--text-primary)' }}>{title}</span>
      </div>
      <p style={{ fontSize:'11px', color:'var(--text-muted)', paddingLeft:'26px' }}>{body}</p>
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [counter, setCounter] = useState({ a:0, b:0, c:0 })
  const [countStarted, setCountStarted] = useState(false)
  const statsRef = useRef(null)

  /* Counter animé */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !countStarted) {
        setCountStarted(true)
        const targets = { a:50, b:4, c:6 }
        const duration = 2200
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCounter({
            a: Math.round(targets.a * ease),
            b: Math.round(targets.b * ease),
            c: Math.round(targets.c * ease),
          })
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [countStarted])

  if (!t?.hero) return null

  const btnPrimary = {
    display:'flex', alignItems:'center', gap:'8px',
    background:'var(--gradient-btn)',
    color:'#fff', padding:'14px 32px', borderRadius:'12px',
    fontWeight:700, fontSize:'14.5px', border:'none',
    cursor:'pointer', fontFamily:'Outfit,sans-serif',
    boxShadow:'var(--shadow-accent)', transition:'all 0.3s',
    backgroundSize:'200% 200%', animation:'gradMove 3s ease infinite',
  }
  const btnSecondary = {
    display:'flex', alignItems:'center', gap:'8px',
    background:'var(--bg-card)', color:'var(--accent)',
    padding:'14px 32px', borderRadius:'12px',
    fontWeight:500, fontSize:'14.5px',
    border:'1.5px solid var(--border-accent)',
    cursor:'pointer', fontFamily:'Outfit,sans-serif',
    backdropFilter:'blur(8px)', transition:'all 0.25s',
  }

  return (
    <div style={{ background:'var(--bg-primary)', overflowX:'hidden' }}>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{
        minHeight:'92vh', display:'flex', alignItems:'center',
        padding:'80px 48px', position:'relative', overflow:'hidden',
        background:'var(--gradient-hero)',
      }}>
        {/* Orbes animés */}
        <div className="hero-orb-1" style={{ position:'absolute', width:'650px', height:'650px', borderRadius:'50%', background:'radial-gradient(circle,rgba(74,158,255,0.13) 0%,transparent 70%)', top:'-120px', right:'-120px', animation:'orb 12s ease-in-out infinite', pointerEvents:'none' }}/>
        <div className="hero-orb-2" style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(123,111,255,0.10) 0%,transparent 70%)', bottom:'-80px', left:'-80px', animation:'orb2 16s ease-in-out infinite', pointerEvents:'none' }}/>
        <div className="hero-orb-3" style={{ position:'absolute', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,157,0.08) 0%,transparent 70%)', top:'35%', left:'38%', animation:'orb 22s ease-in-out infinite reverse', pointerEvents:'none' }}/>

        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'64px 64px', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1140px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1.15fr 0.85fr', gap:'72px', alignItems:'center', position:'relative', zIndex:1 }}>

          {/* ── LEFT ── */}
          <div style={{ animation:'fadeUp 0.85s ease both' }}>

            {/* Badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'var(--accent-bg)', border:'1px solid var(--border-accent)', borderRadius:'24px', padding:'8px 18px', marginBottom:'28px' }}>
              <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'var(--accent)', animation:'pulse 2s infinite' }}/>
              <span style={{ fontSize:'11.5px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>{t.hero.eyebrow}</span>
            </div>

            {/* H1 */}
            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(42px,5.2vw,68px)', fontWeight:300, lineHeight:1.06, color:'var(--text-primary)', marginBottom:'6px' }}>
              {t.hero.h1a} <strong style={{ fontWeight:700 }}>{t.hero.h1b}</strong>
            </h1>
            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(42px,5.2vw,68px)', fontWeight:300, lineHeight:1.06, marginBottom:'0' }}>
              <span style={{ background:'var(--gradient-btn)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic', fontWeight:600 }}>
                {t.hero.h1c}
              </span>{' '}
              <span style={{ color:'var(--text-primary)' }}>{t.hero.h1d}</span>
            </h1>

            {/* Divider animé */}
            <div style={{ width:'64px', height:'3px', background:'var(--gradient-btn)', borderRadius:'2px', margin:'28px 0', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }}/>

            {/* Description */}
            <p style={{ fontSize:'16px', lineHeight:1.9, color:'var(--text-secondary)', maxWidth:'480px', marginBottom:'40px', fontWeight:300 }}>
              {t.hero.desc}
            </p>

            {/* Boutons */}
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <button style={btnPrimary} onClick={() => navigate('/services')}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(74,158,255,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
              >
                {t.hero.btn1}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button style={btnSecondary} onClick={() => navigate('/contact')}
                onMouseEnter={e => { e.currentTarget.style.background='var(--accent-bg)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--bg-card)'; e.currentTarget.style.borderColor='var(--border-accent)'; e.currentTarget.style.transform='none' }}
              >
                {t.hero.btn2}
              </button>
            </div>

            {/* Stats — compteur animé */}
            <div ref={statsRef} style={{ display:'flex', gap:'44px', marginTop:'52px', paddingTop:'36px', borderTop:'1px solid var(--border)' }}>
              {[
                { val:`${counter.a}+`, label:t.hero.stat1 },
                { val:`${counter.b}`,  label:t.hero.stat2 },
                { val:`${counter.c}+`, label:t.hero.stat3 },
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'38px', fontWeight:700, background:'var(--gradient-btn)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'6px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div style={{ display:'grid', gap:'14px', animation:'fadeDown 0.9s ease 0.25s both' }}>

            {/* Featured — animated border */}
            <div className="animated-border" style={{ padding:'24px 26px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'14px' }}>
                <div style={{ width:'46px', height:'46px', borderRadius:'12px', background:'var(--gradient-btn)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0, boxShadow:'var(--shadow-accent)' }}>🌍</div>
                <div>
                  <div style={{ fontSize:'15px', fontWeight:600, color:'var(--text-primary)', marginBottom:'2px' }}>Global Trade Network</div>
                  <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>Africa · Europe · Asia · Middle East</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                {['Import','Export','Logistics','Trading','Commodities'].map(tag => (
                  <span key={tag} style={{ background:'var(--accent-bg)', border:'1px solid var(--border-accent)', color:'var(--accent)', fontSize:'11px', padding:'3px 11px', borderRadius:'20px', fontWeight:500 }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* 4 mini cards */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              {[
                { icon:'🚢', title:'Sea Freight',   body:'FCL & LCL Worldwide',  grad:'rgba(74,158,255,0.15)' },
                { icon:'✈️', title:'Air Freight',   body:'Express Cargo',         grad:'rgba(123,111,255,0.15)' },
                { icon:'⛓️', title:'Supply Chain', body:'End-to-End Solutions',  grad:'rgba(255,107,157,0.12)' },
                { icon:'🏷️', title:'Brand Rep.',   body:'West Africa Expansion', grad:'rgba(74,158,255,0.10)' },
              ].map((c,i) => (
                <MiniServiceCard key={i} {...c} />
              ))}
            </div>

            {/* Live indicator */}
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'14px', padding:'16px 20px', display:'flex', alignItems:'center', gap:'12px', backdropFilter:'blur(8px)' }}>
              <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 0 4px rgba(34,197,94,0.2)', animation:'pulse 2s infinite', flexShrink:0 }}/>
              <div>
                <div style={{ fontSize:'13px', fontWeight:600, color:'var(--text-primary)' }}>Operations Active</div>
                <div style={{ fontSize:'11.5px', color:'var(--text-muted)', marginTop:'1px' }}>24/7 Support Available</div>
              </div>
              <div style={{ marginLeft:'auto', background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)', color:'#22c55e', fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'20px', letterSpacing:'1px' }}>LIVE</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT STRIP
      ══════════════════════════════════ */}
      <section style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border-accent)', borderBottom:'1px solid var(--border-accent)', padding:'72px 48px' }}>
        <AnimSection>
          <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>

            {/* Left — visual card */}
            <div style={{ position:'relative', borderRadius:'22px', overflow:'hidden', background:'var(--gradient-hero)', border:'1px solid var(--border-accent)', padding:'44px 40px', minHeight:'300px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div style={{ position:'absolute', width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle,rgba(74,158,255,0.15) 0%,transparent 70%)', top:'-80px', right:'-80px', animation:'orb 10s ease-in-out infinite', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,157,0.10) 0%,transparent 70%)', bottom:'-40px', left:'20px', animation:'orb2 14s ease-in-out infinite', pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'var(--accent-bg)', border:'1px solid var(--border-accent)', borderRadius:'20px', padding:'5px 14px', marginBottom:'20px' }}>
                  <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', animation:'pulse 2s infinite' }}/>
                  <span style={{ fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>EST. 2020</span>
                </div>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'34px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.25, marginBottom:'20px' }}>
                  Building Connections.<br/>
                  <span style={{ background:'var(--gradient-btn)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Delivering Excellence.</span>
                </div>
              </div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', position:'relative', zIndex:1 }}>
                {['Africa','Europe','Asia','Middle East'].map(r => (
                  <span key={r} style={{ background:'rgba(255,255,255,0.08)', border:'1px solid var(--border-accent)', color:'var(--accent)', fontSize:'12px', padding:'5px 14px', borderRadius:'20px', backdropFilter:'blur(8px)', fontWeight:500 }}>{r}</span>
                ))}
              </div>
            </div>

            {/* Right — texte */}
            <div>
              <SL>{t.about?.label || 'About Us'}</SL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'18px', lineHeight:1.15 }}>
                IMEX HOLDING LTD
              </h2>
              <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', lineHeight:1.9, marginBottom:'24px', fontWeight:300 }}>
                {t.about?.aboutText}
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'28px' }}>
                {(t.about?.values || []).map((v,i) => (
                  <span key={i} style={{ background:'var(--gradient-card)', border:'1px solid var(--border-accent)', color:'var(--text-secondary)', fontSize:'12.5px', padding:'7px 16px', borderRadius:'24px', backdropFilter:'blur(8px)', fontWeight:400 }}>{v}</span>
                ))}
              </div>
              <button onClick={() => navigate('/about')}
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'transparent', color:'var(--accent)', fontSize:'14px', fontWeight:600, border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', padding:0, transition:'gap 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.gap='12px'}
                onMouseLeave={e => e.currentTarget.style.gap='8px'}
              >
                Discover our story
                <span style={{ fontSize:'18px' }}>→</span>
              </button>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* ══════════════════════════════════
          SERVICES
      ══════════════════════════════════ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'900px', height:'500px', background:'radial-gradient(ellipse,rgba(123,111,255,0.06) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <AnimSection>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'52px', flexWrap:'wrap', gap:'20px' }}>
              <div>
                <SL>{t.services.label}</SL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'46px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>{t.services.title}</h2>
              </div>
              <p style={{ fontSize:'15px', color:'var(--text-secondary)', maxWidth:'380px', lineHeight:1.8, fontWeight:300 }}>{t.services.sub}</p>
            </div>
          </AnimSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {t.services.items.map((svc,i) => (
              <AnimSection key={i} delay={i * 70}>
                <GlassCard onClick={() => navigate('/services')} style={{ height:'100%' }}>
                  <div style={{ width:'54px', height:'54px', borderRadius:'14px', background:`linear-gradient(135deg,rgba(74,158,255,0.2),rgba(123,111,255,0.2))`, border:'1px solid var(--border-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', marginBottom:'18px', boxShadow:'0 4px 16px rgba(74,158,255,0.15)' }}>
                    {svc.icon}
                  </div>
                  <h3 style={{ fontSize:'15.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'10px' }}>{svc.title}</h3>
                  <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.75, fontWeight:300, marginBottom:'18px' }}>{svc.desc}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'var(--accent)', fontSize:'13px', fontWeight:600, transition:'gap 0.2s' }}>
                    <span>Learn more</span>
                    <span>→</span>
                  </div>
                </GlassCard>
              </AnimSection>
            ))}
          </div>

          <AnimSection delay={200}>
            <div style={{ textAlign:'center', marginTop:'40px' }}>
              <button onClick={() => navigate('/services')}
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'transparent', color:'var(--accent)', fontSize:'14px', fontWeight:600, border:'1.5px solid var(--border-accent)', borderRadius:'12px', cursor:'pointer', fontFamily:'Outfit,sans-serif', padding:'12px 28px', transition:'all 0.2s', backdropFilter:'blur(8px)' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--accent-bg)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--border-accent)'; e.currentTarget.style.transform='none' }}
              >
                View all services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════
          PRODUCTS
      ══════════════════════════════════ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-secondary)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'600px', height:'600px', background:'radial-gradient(circle,rgba(74,158,255,0.06) 0%,transparent 70%)', bottom:'-100px', right:'-100px', animation:'orb 18s ease-in-out infinite', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', width:'400px', height:'400px', background:'radial-gradient(circle,rgba(255,107,157,0.05) 0%,transparent 70%)', top:'-60px', left:'-60px', animation:'orb2 14s ease-in-out infinite', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <AnimSection>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'52px', flexWrap:'wrap', gap:'20px' }}>
              <div>
                <SL>{t.products.label}</SL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'46px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>{t.products.title}</h2>
              </div>
              <p style={{ fontSize:'15px', color:'var(--text-secondary)', maxWidth:'380px', lineHeight:1.8, fontWeight:300 }}>{t.products.sub}</p>
            </div>
          </AnimSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {t.products.items.map((p,i) => {
              const gradients = [
                'linear-gradient(135deg,rgba(74,158,255,0.18),rgba(123,111,255,0.12))',
                'linear-gradient(135deg,rgba(34,197,94,0.14),rgba(74,158,255,0.10))',
                'linear-gradient(135deg,rgba(251,191,36,0.14),rgba(255,107,157,0.10))',
                'linear-gradient(135deg,rgba(255,215,0,0.16),rgba(255,107,157,0.12))',
                'linear-gradient(135deg,rgba(147,197,253,0.16),rgba(123,111,255,0.12))',
                'linear-gradient(135deg,rgba(148,163,184,0.14),rgba(74,158,255,0.10))',
              ]
              const icons    = ['🥜','🌾','🌻','🪙','💎','🏭']
              const tagColors = {
                Premium:    { bg:'rgba(74,158,255,0.15)',  border:'rgba(74,158,255,0.35)',  color:'var(--accent)' },
                Food:       { bg:'rgba(34,197,94,0.12)',   border:'rgba(34,197,94,0.30)',   color:'#16a34a' },
                Precious:   { bg:'rgba(251,191,36,0.14)',  border:'rgba(251,191,36,0.35)',  color:'#b45309' },
                Industrial: { bg:'rgba(148,163,184,0.12)', border:'rgba(148,163,184,0.30)', color:'var(--text-muted)' },
              }
              const tc = tagColors[p.tag] || tagColors.Industrial
              return (
                <AnimSection key={i} delay={i * 70}>
                  <GlassCard
                    onClick={() => navigate('/products')}
                    style={{ height:'100%' }}
                    colors={gradients[i]}
                  >
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                      <div style={{ width:'58px', height:'58px', borderRadius:'14px', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', backdropFilter:'blur(8px)' }}>
                        {icons[i]}
                      </div>
                      <span style={{ background:tc.bg, border:`1px solid ${tc.border}`, color:tc.color, fontSize:'11px', padding:'4px 12px', borderRadius:'20px', fontWeight:600 }}>{p.tag}</span>
                    </div>
                    <div style={{ fontSize:'11px', letterSpacing:'2px', color:'var(--text-muted)', marginBottom:'8px', textTransform:'uppercase' }}>
                      {String(i+1).padStart(2,'0')} — {p.cat}
                    </div>
                    <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'24px', fontWeight:700, color:'var(--text-primary)', marginBottom:'10px' }}>{p.title}</h3>
                    <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.75, fontWeight:300, marginBottom:'16px' }}>{p.desc}</p>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', color:'var(--accent)', fontSize:'13px', fontWeight:600 }}>
                      <span>View details</span><span>→</span>
                    </div>
                  </GlassCard>
                </AnimSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY US
      ══════════════════════════════════ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'64px 64px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', width:'700px', height:'400px', background:'radial-gradient(ellipse,rgba(74,158,255,0.05) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <AnimSection>
            <div style={{ textAlign:'center', marginBottom:'60px' }}>
              <SL>{t.about.whyLabel}</SL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'46px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, maxWidth:'600px', margin:'0 auto' }}>{t.about.whyTitle}</h2>
            </div>
          </AnimSection>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {t.about.why.map((w,i) => (
              <AnimSection key={i} delay={i * 80}>
                <GlassCard>
                  <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, background:'var(--gradient-btn)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1, opacity:0.5 }}>
                      {String(i+1).padStart(2,'0')}
                    </div>
                    <div style={{ flex:1, height:'1px', background:'var(--gradient-btn)', opacity:0.2 }}/>
                  </div>
                  <h3 style={{ fontSize:'16px', fontWeight:600, color:'var(--text-primary)', marginBottom:'10px' }}>{w.title}</h3>
                  <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300 }}>{w.desc}</p>
                </GlassCard>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LOGISTICS PREVIEW
      ══════════════════════════════════ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-secondary)', position:'relative', overflow:'hidden' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <AnimSection>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>
              <div>
                <SL>{t.logistics?.label || 'Logistics'}</SL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', marginBottom:'18px', lineHeight:1.15 }}>{t.logistics?.title || 'Logistics Solutions'}</h2>
                <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'32px' }}>{t.logistics?.sub}</p>
                <button onClick={() => navigate('/logistics')}
                  style={{ ...btnPrimary, width:'fit-content', padding:'13px 28px' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(74,158,255,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                >
                  Explore Logistics
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div style={{ display:'grid', gap:'14px' }}>
                {(t.logistics?.items || []).slice(0,4).map((item,i) => (
                  <AnimSection key={i} delay={i * 60} direction="right">
                    <div className="glass" style={{ display:'flex', gap:'16px', alignItems:'center', padding:'18px 22px' }}>
                      <div style={{ width:'46px', height:'46px', borderRadius:'12px', background:'var(--gradient-btn)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0, boxShadow:'var(--shadow-accent)' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize:'14.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'3px' }}>{item.title}</h4>
                        <p style={{ fontSize:'12.5px', color:'var(--text-secondary)', fontWeight:300 }}>{item.desc}</p>
                      </div>
                      <div style={{ marginLeft:'auto', color:'var(--accent)', fontSize:'18px', opacity:0.5 }}>→</div>
                    </div>
                  </AnimSection>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA FINAL
      ══════════════════════════════════ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <AnimSection>
          <div style={{ maxWidth:'900px', margin:'0 auto', textAlign:'center', position:'relative', borderRadius:'28px', overflow:'hidden', padding:'80px 60px', background:'var(--gradient-hero)', border:'1px solid var(--border-accent)' }}>
            {/* Orbes déco */}
            <div style={{ position:'absolute', width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle,rgba(74,158,255,0.14) 0%,transparent 70%)', top:'-80px', right:'-80px', animation:'orb 10s ease-in-out infinite', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', width:'250px', height:'250px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,107,157,0.10) 0%,transparent 70%)', bottom:'-50px', left:'-50px', animation:'orb2 13s ease-in-out infinite', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle,rgba(123,111,255,0.10) 0%,transparent 70%)', top:'30%', left:'10%', animation:'orb 17s ease-in-out infinite reverse', pointerEvents:'none' }}/>

            {/* Grid overlay */}
            <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }}/>

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'var(--accent-bg)', border:'1px solid var(--border-accent)', borderRadius:'24px', padding:'8px 18px', marginBottom:'24px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }}/>
                <span style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>International Partnership</span>
              </div>

              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'50px', fontWeight:700, color:'var(--text-primary)', marginBottom:'18px', lineHeight:1.1 }}>
                {t.cta.title}
              </h2>
              <p style={{ fontSize:'16px', color:'var(--text-secondary)', marginBottom:'40px', fontWeight:300, lineHeight:1.85, maxWidth:'540px', margin:'0 auto 40px' }}>
                {t.cta.desc}
              </p>

              <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
                <button onClick={() => navigate('/contact')}
                  style={{ ...btnPrimary, padding:'15px 40px', fontSize:'15.5px' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 20px 48px rgba(74,158,255,0.55)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                >
                  {t.cta.btn1}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button onClick={() => navigate('/services')}
                  style={{ ...btnSecondary, padding:'15px 40px', fontSize:'15.5px' }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--accent-bg)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='var(--bg-card)'; e.currentTarget.style.borderColor='var(--border-accent)'; e.currentTarget.style.transform='none' }}
                >
                  {t.cta.btn2}
                </button>
              </div>

              {/* Metrics en bas */}
              <div style={{ display:'flex', justifyContent:'center', gap:'48px', marginTop:'52px', paddingTop:'36px', borderTop:'1px solid var(--border)', flexWrap:'wrap' }}>
                {[
                  { val:'50+', label:'Countries' },
                  { val:'24/7', label:'Support' },
                  { val:'100%', label:'Reliable' },
                  { val:'5★', label:'Quality' },
                ].map((m,i) => (
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'30px', fontWeight:700, background:'var(--gradient-btn)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1 }}>{m.val}</div>
                    <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'5px' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimSection>
      </section>

    </div>
  )
}