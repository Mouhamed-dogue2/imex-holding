import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } },
      { threshold }
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

const DL = () => (
  <div style={{ width:'40px', height:'3px', background:'var(--gradient-btn)', borderRadius:'2px', margin:'22px 0' }}/>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ a:0, b:0, c:0, d:0 })
  const [started, setStarted] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true)
        const T = { a:50, b:4, c:100, d:6 }, dur = 2000, t0 = Date.now()
        const tick = () => {
          const p = Math.min((Date.now()-t0)/dur, 1)
          const ease = 1 - Math.pow(1-p, 3)
          setCounts({ a:Math.round(T.a*ease), b:Math.round(T.b*ease), c:Math.round(T.c*ease), d:Math.round(T.d*ease) })
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [started])

  if (!t?.hero) return null

  const btnPrimary = {
    display:'inline-flex', alignItems:'center', gap:'8px',
    padding:'13px 28px', borderRadius:'7px',
    background:'var(--gradient-btn)', backgroundSize:'200% 200%',
    color:'#fff', fontWeight:600, fontSize:'14px', border:'none',
    cursor:'pointer', fontFamily:'Inter,sans-serif',
    transition:'all 0.25s', boxShadow:'var(--shadow-accent)',
    letterSpacing:'0.2px',
  }

  const btnOutline = {
    display:'inline-flex', alignItems:'center', gap:'8px',
    padding:'13px 28px', borderRadius:'7px',
    background:'transparent', color:'var(--text-primary)',
    fontWeight:500, fontSize:'14px',
    border:'1px solid var(--border)',
    cursor:'pointer', fontFamily:'Inter,sans-serif',
    transition:'all 0.25s', letterSpacing:'0.2px',
  }

  return (
    <div style={{ background:'var(--bg-primary)' }}>

      {/* ══ HERO ══ */}
      <section style={{
        minHeight:'90vh', display:'flex', alignItems:'center',
        padding:'80px 48px', position:'relative', overflow:'hidden',
        background:'var(--gradient-hero)',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'-15%', right:'-10%', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle,var(--glow) 0%,transparent 65%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1.05fr 0.95fr', gap:'80px', alignItems:'center', position:'relative', zIndex:1 }}>

          {/* LEFT */}
          <div style={{ animation:'fadeUp 0.8s ease both' }}>
            <OL>International Trade & Logistics</OL>

            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(42px,5vw,68px)', fontWeight:700, lineHeight:1.07, color:'var(--text-primary)' }}>
              Connecting Markets,
            </h1>
            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(42px,5vw,68px)', fontWeight:300, lineHeight:1.07, color:'var(--text-primary)', fontStyle:'italic' }}>
              Delivering{' '}
              <span style={{ background:'var(--gradient-btn)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:600 }}>
                Excellence.
              </span>
            </h1>

            <DL/>

            <p style={{ fontSize:'15.5px', lineHeight:1.9, color:'var(--text-secondary)', maxWidth:'500px', marginBottom:'40px', fontWeight:300 }}>
              IMEX HOLDING LTD is a West Africa–based company specialised in international trade, import-export, logistics, and brand representation — connecting businesses to markets across 4 continents.
            </p>

            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <button style={btnPrimary} onClick={() => navigate('/services')}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(59,130,246,0.42)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
              >
                Explore Services <ArrowRight/>
              </button>
              <button style={btnOutline} onClick={() => navigate('/contact')}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.background='transparent' }}
              >
                Get in Touch
              </button>
            </div>

            <div ref={statsRef} style={{ display:'flex', gap:'44px', marginTop:'52px', paddingTop:'32px', borderTop:'1px solid var(--border)', flexWrap:'wrap' }}>
              {[
                { val:`${counts.a}+`, label:'Countries' },
                { val:`${counts.b}`,  label:'Activities' },
                { val:`${counts.c}%`, label:'Committed' },
                { val:`${counts.d}+`, label:'Products' },
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'34px', fontWeight:700, color:'var(--text-primary)', lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'5px', fontWeight:400 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ animation:'fadeLeft 0.9s ease 0.2s both' }}>
            <div style={{ borderRadius:'14px', overflow:'hidden', border:'1px solid var(--border)', marginBottom:'16px', position:'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80"
                alt="International cargo shipping"
                style={{ width:'100%', height:'280px', objectFit:'cover', display:'block' }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(4,8,15,0.65) 0%,transparent 55%)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', bottom:'22px', left:'22px', right:'22px' }}>
                <div style={{ fontSize:'10.5px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.65)', marginBottom:'4px' }}>Global Operations</div>
                <div style={{ fontSize:'15px', fontWeight:600, color:'#fff' }}>Africa · Europe · Asia · Middle East</div>
              </div>
            </div>

            {/* 4 service tags — texte seulement, sans icônes */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
              {[
                { label:'Sea Freight',  sub:'FCL & LCL Worldwide' },
                { label:'Air Freight',  sub:'Express Cargo' },
                { label:'Supply Chain', sub:'End-to-End' },
                { label:'Brand Rep.',   sub:'West Africa' },
              ].map((c,i) => (
                <div key={i}
                  style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'9px', padding:'14px 16px', transition:'all 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-secondary)' }}
                >
                  <div style={{ fontSize:'13px', fontWeight:600, color:'var(--text-primary)', marginBottom:'3px' }}>{c.label}</div>
                  <div style={{ fontSize:'11.5px', color:'var(--text-muted)', fontWeight:300 }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'88px 48px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center' }}>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=80"
                  alt="IMEX HOLDING operations"
                  style={{ width:'100%', height:'360px', objectFit:'cover', borderRadius:'12px', display:'block', border:'1px solid var(--border)' }}
                />
              </div>
              <div>
                <OL>Who We Are</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, marginBottom:'20px' }}>
                  IMEX HOLDING LTD
                </h2>
                <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'20px' }}>
                  {t.about?.aboutText}
                </p>
                <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'28px' }}>
                  With a strong network of suppliers and partners, we operate across several strategic sectors with professionalism, efficiency, and integrity.
                </p>

                {/* Checklist — icône check minimaliste */}
                <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'28px' }}>
                  {['Import & Export', 'General Trading', 'Brand Representation', 'Transport & Logistics'].map((v,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'14px', color:'var(--text-secondary)', fontWeight:400 }}>
                      <div style={{ color:'var(--accent)', flexShrink:0 }}><CheckIcon/></div>
                      {v}
                    </div>
                  ))}
                </div>

                <button
                  style={{ ...btnOutline, padding:'11px 22px' }}
                  onClick={() => navigate('/about')}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.background='transparent' }}
                >
                  Learn more about us
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'flex-end', marginBottom:'52px' }}>
              <div>
                <OL>What We Do</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>Our Services</h2>
              </div>
              <div>
                <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300, marginBottom:'16px' }}>
                  From sourcing and procurement to last-mile delivery — comprehensive solutions for international trade.
                </p>
                <button
                  style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'none', border:'none', color:'var(--accent)', fontSize:'13.5px', fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', padding:0, transition:'gap 0.2s' }}
                  onClick={() => navigate('/services')}
                  onMouseEnter={e => e.currentTarget.style.gap='11px'}
                  onMouseLeave={e => e.currentTarget.style.gap='7px'}
                >
                  View all services <ArrowRight/>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Grille services — numéros + texte, sans icônes */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'var(--border)', borderRadius:'10px', overflow:'hidden' }}>
            {t.services.items.slice(0,8).map((svc,i) => (
              <Reveal key={i} delay={i*45}>
                <div
                  onClick={() => navigate('/services')}
                  style={{ background:'var(--bg-primary)', padding:'28px 22px', cursor:'pointer', transition:'background 0.22s', minHeight:'185px' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--accent-bg)'}
                  onMouseLeave={e => e.currentTarget.style.background='var(--bg-primary)'}
                >
                  <div style={{ fontSize:'11.5px', letterSpacing:'1.5px', color:'var(--text-muted)', fontWeight:500, textTransform:'uppercase', marginBottom:'12px' }}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                  <h3 style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)', marginBottom:'8px', lineHeight:1.35 }}>{svc.title}</h3>
                  <p style={{ fontSize:'12.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{svc.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section style={{ padding:'88px 48px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'52px', flexWrap:'wrap', gap:'20px' }}>
              <div>
                <OL>Commodities</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>Products We Trade</h2>
              </div>
              <button
                style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'none', border:'none', color:'var(--accent)', fontSize:'13.5px', fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', padding:0, transition:'gap 0.2s' }}
                onClick={() => navigate('/products')}
                onMouseEnter={e => e.currentTarget.style.gap='11px'}
                onMouseLeave={e => e.currentTarget.style.gap='7px'}
              >
                Full catalogue <ArrowRight/>
              </button>
            </div>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
            <Reveal>
              <div style={{ position:'relative', borderRadius:'12px', overflow:'hidden', height:'100%', minHeight:'400px', border:'1px solid var(--border)' }}>
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=700&q=80"
                  alt="Trade commodities"
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(4,8,15,0.78) 0%,transparent 55%)' }}/>
                <div style={{ position:'absolute', bottom:'28px', left:'28px', right:'28px' }}>
                  <div style={{ fontSize:'10.5px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:'8px' }}>Premium Commodities</div>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'24px', fontWeight:700, color:'#fff', lineHeight:1.2 }}>
                    Quality Products for Global Markets
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Product list — sans icônes, juste numéros */}
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {t.products.items.map((p,i) => (
                <Reveal key={i} delay={i*45} x={20} y={0}>
                  <div
                    onClick={() => navigate('/products')}
                    style={{ background:'var(--bg-primary)', border:'1px solid var(--border)', borderRadius:'9px', padding:'18px 22px', cursor:'pointer', transition:'all 0.22s', display:'flex', justifyContent:'space-between', alignItems:'center' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-primary)' }}
                  >
                    <div style={{ display:'flex', alignItems:'center', gap:'18px' }}>
                      <span style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'13px', color:'var(--text-muted)', fontWeight:500, minWidth:'26px' }}>
                        {String(i+1).padStart(2,'0')}
                      </span>
                      <div>
                        <div style={{ fontSize:'14.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'2px' }}>{p.title}</div>
                        <div style={{ fontSize:'12px', color:'var(--text-muted)', fontWeight:300 }}>{p.cat}</div>
                      </div>
                    </div>
                    <span style={{ background:'var(--accent-bg)', border:'1px solid var(--border-accent)', color:'var(--accent)', fontSize:'10.5px', padding:'3px 10px', borderRadius:'4px', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.5px', flexShrink:0 }}>
                      {p.tag}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOGISTICS ══ */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center' }}>
            <Reveal>
              <div>
                <OL>Transport & Logistics</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, marginBottom:'20px' }}>
                  Reliable Logistics Solutions
                </h2>
                <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'28px' }}>
                  From land transportation to air and sea freight — we provide safe, fast and reliable delivery services for clients and partners across the globe.
                </p>

                {/* Liste simple sans icônes */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0', marginBottom:'32px', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden' }}>
                  {['Land Transport','Sea Freight','Air Freight','Customs Clearance','Warehousing','Cargo Tracking'].map((item,i) => (
                    <div key={i} style={{ padding:'12px 16px', fontSize:'13.5px', color:'var(--text-secondary)', fontWeight:400, borderBottom: i<4 ? '1px solid var(--border)' : 'none', borderRight: i%2===0 ? '1px solid var(--border)' : 'none', background:'var(--bg-secondary)', display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', flexShrink:0 }}/>
                      {item}
                    </div>
                  ))}
                </div>

                <button style={btnPrimary} onClick={() => navigate('/logistics')}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(59,130,246,0.40)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                >
                  Logistics Solutions <ArrowRight/>
                </button>
              </div>
            </Reveal>

            <Reveal delay={100} x={24} y={0}>
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                <img
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=700&q=80"
                  alt="Sea freight containers"
                  style={{ width:'100%', height:'220px', objectFit:'cover', borderRadius:'12px', display:'block', border:'1px solid var(--border)' }}
                />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"
                    alt="Air freight"
                    style={{ width:'100%', height:'130px', objectFit:'cover', borderRadius:'9px', display:'block', border:'1px solid var(--border)' }}
                  />
                  <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-accent)', borderRadius:'9px', padding:'20px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--text-primary)', lineHeight:1, marginBottom:'5px' }}>24/7</div>
                    <div style={{ fontSize:'11px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1.5px', fontWeight:500, marginBottom:'10px' }}>Operations</div>
                    <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                      <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }}/>
                      <span style={{ fontSize:'12px', color:'#16a34a', fontWeight:600 }}>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section style={{ padding:'88px 48px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'64px', alignItems:'flex-start' }}>
              <div>
                <OL>Why Choose Us</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, marginBottom:'16px' }}>Our Strengths</h2>
                <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300 }}>
                  Built on professionalism, trust and a proven track record in international trade.
                </p>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                {t.about.why.map((w,i) => (
                  <div key={i}
                    style={{ padding:'26px', background:'var(--bg-primary)', border:'1px solid var(--border)', borderRadius:'9px', transition:'all 0.25s', position:'relative', overflow:'hidden' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}
                  >
                    <div style={{ position:'absolute', top:0, left:0, width:'3px', height:'100%', background:'var(--gradient-btn)' }}/>
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'12.5px', color:'var(--text-muted)', letterSpacing:'2px', marginBottom:'10px', fontWeight:500, textTransform:'uppercase' }}>
                      {String(i+1).padStart(2,'0')}
                    </div>
                    <h3 style={{ fontSize:'14.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'7px' }}>{w.title}</h3>
                    <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:1.75, fontWeight:300 }}>{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)' }}>
        <Reveal>
          <div style={{ maxWidth:'860px', margin:'0 auto' }}>
            <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'12px', overflow:'hidden' }}>
              <div style={{ height:'3px', background:'var(--gradient-btn)', backgroundSize:'200% 200%', animation:'gradMove 4s ease infinite' }}/>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>

                {/* Left */}
                <div style={{ padding:'52px 44px', borderRight:'1px solid var(--border)' }}>
                  <OL>Partnership</OL>
                  <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'36px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.15, marginBottom:'14px' }}>
                    {t.cta.title}
                  </h2>
                  <p style={{ fontSize:'14.5px', color:'var(--text-secondary)', lineHeight:1.85, fontWeight:300, marginBottom:'28px' }}>
                    {t.cta.desc}
                  </p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                    <button style={{ ...btnPrimary, justifyContent:'center' }} onClick={() => navigate('/contact')}
                      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(59,130,246,0.42)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                    >
                      Contact Us
                    </button>
                    <button style={{ ...btnOutline, justifyContent:'center' }} onClick={() => navigate('/services')}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.background='transparent' }}
                    >
                      Our Services
                    </button>
                  </div>
                </div>

                {/* Right */}
                <div style={{ padding:'52px 44px', background:'var(--bg-card)' }}>
                  <div style={{ fontSize:'10.5px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--text-muted)', fontWeight:500, marginBottom:'24px' }}>Key Figures</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
                    {[
                      { val:'50+',  label:'Countries Served' },
                      { val:'24/7', label:'Support Available' },
                      { val:'100%', label:'Reliable Service' },
                      { val:'4+',   label:'Core Activities' },
                    ].map((m,i) => (
                      <div key={i} style={{ paddingBottom:'18px', borderBottom:'1px solid var(--border)' }}>
                        <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--text-primary)', lineHeight:1, marginBottom:'4px' }}>{m.val}</div>
                        <div style={{ fontSize:'10.5px', letterSpacing:'1px', textTransform:'uppercase', color:'var(--text-muted)', fontWeight:400 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:'24px', padding:'14px 18px', background:'var(--accent-bg)', border:'1px solid var(--border-accent)', borderRadius:'7px' }}>
                    <div style={{ fontSize:'12.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300, fontStyle:'italic' }}>
                      "Your trusted partner in international trade and logistics across global markets."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  )
}