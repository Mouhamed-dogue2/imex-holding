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

export default function About() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (!t?.about) return null
  const a = t.about

  return (
    <div style={{ background:'var(--bg-primary)' }}>

      {/* PAGE HEADER */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', padding:'72px 48px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,var(--glow) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ animation:'fadeUp 0.75s ease both' }}>
            <OL>{a.label}</OL>
            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(38px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'640px', marginBottom:'18px' }}>
              {a.h1} {a.h2}
            </h1>
            <p style={{ fontSize:'16px', color:'var(--text-secondary)', maxWidth:'560px', lineHeight:1.85, fontWeight:300 }}>{a.desc}</p>
          </div>

          {/* Stats row */}
          <div style={{ display:'flex', gap:'48px', marginTop:'48px', paddingTop:'36px', borderTop:'1px solid var(--border)', flexWrap:'wrap' }}>
            {[
              { val:'2020', label:'Founded' },
              { val:'4+',   label:'Core Activities' },
              { val:'50+',  label:'Countries' },
              { val:'6+',   label:'Product Lines' },
            ].map((s,i) => (
              <div key={i}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--text-primary)', lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'5px', fontWeight:400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'center' }}>
              <div>
                <img
                  src="/images/about1.jpg"
                  alt="IMEX HOLDING team"
                  style={{ width:'100%', height:'400px', objectFit:'cover', borderRadius:'12px', display:'block', border:'1px solid var(--border)' }}
                />
              </div>
              <div>
                <OL>Our Story</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, marginBottom:'20px' }}>
                  {a.aboutTitle}
                </h2>
                <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'20px' }}>
                  {a.aboutText}
                </p>
                <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'28px' }}>
                  With a strong network of suppliers and partners across Africa, Europe, Asia and the Middle East, we operate with professionalism, efficiency, and integrity in every transaction.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  {['Import & Export', 'General Trading', 'Brand Representation', 'Transport & Logistics'].map((v,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'14px', color:'var(--text-secondary)', fontWeight:400 }}>
                      <div style={{ color:'var(--accent)', flexShrink:0 }}><CheckIcon/></div>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding:'88px 48px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'24px' }}>
              {[
                { label:a.missionLabel, title:a.missionTitle, text:a.missionText },
                { label:a.visionLabel,  title:a.visionTitle,  text:a.visionText  },
              ].map((item,i) => (
                <div key={i} style={{ background:'var(--bg-primary)', border:'1px solid var(--border)', borderRadius:'10px', padding:'40px', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, width:'3px', height:'100%', background:'var(--gradient-btn)' }}/>
                  <div style={{ fontSize:'11px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'12px', fontWeight:600 }}>{item.label}</div>
                  <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'28px', fontWeight:700, color:'var(--text-primary)', marginBottom:'14px', lineHeight:1.2 }}>{item.title}</h3>
                  <p style={{ fontSize:'14.5px', color:'var(--text-secondary)', lineHeight:1.85, fontWeight:300 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* About image */}
          <Reveal delay={100}>
            <div style={{ position:'relative', borderRadius:'12px', overflow:'hidden', border:'1px solid var(--border)' }}>
              <img
                src="/images/about2.jpg"
                alt="International business operations"
                style={{ width:'100%', height:'300px', objectFit:'cover', display:'block' }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(4,8,15,0.65) 0%,transparent 50%)' }}/>
              <div style={{ position:'absolute', bottom:'28px', left:'32px', right:'32px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'22px', fontWeight:700, color:'#fff', maxWidth:'400px', lineHeight:1.3 }}>
                  To become a leading African company in international trade, logistics, and commodity business.
                </div>
                <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', textAlign:'right' }}>Our Vision</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'64px', alignItems:'flex-start' }}>
              <div>
                <OL>{a.valuesLabel}</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, marginBottom:'16px' }}>
                  {a.valuesTitle}
                </h2>
                <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300 }}>
                  {a.valuesText}
                </p>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px' }}>
                {a.values.map((v,i) => (
                  <div key={i}
                    style={{ padding:'24px 20px', background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'9px', transition:'all 0.22s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}
                  >
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'11px', color:'var(--text-muted)', letterSpacing:'2px', marginBottom:'10px', fontWeight:500, textTransform:'uppercase' }}>
                      {String(i+1).padStart(2,'0')}
                    </div>
                    <div style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding:'88px 48px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ marginBottom:'52px' }}>
              <OL>{a.whyLabel}</OL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>{a.whyTitle}</h2>
            </div>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px' }}>
            {a.why.map((w,i) => (
              <Reveal key={i} delay={i*50}>
                <div style={{ padding:'28px', background:'var(--bg-primary)', border:'1px solid var(--border)', borderRadius:'9px', transition:'all 0.25s', position:'relative', overflow:'hidden', height:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}
                >
                  <div style={{ position:'absolute', top:0, left:0, width:'3px', height:'100%', background:'var(--gradient-btn)' }}/>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'12px', color:'var(--text-muted)', letterSpacing:'2px', marginBottom:'12px', fontWeight:500, textTransform:'uppercase' }}>
                    {String(i+1).padStart(2,'0')}
                  </div>
                  <h3 style={{ fontSize:'15px', fontWeight:600, color:'var(--text-primary)', marginBottom:'8px' }}>{w.title}</h3>
                  <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:1.75, fontWeight:300 }}>{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS + CTA */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
              {/* Regions */}
              <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'10px', padding:'40px' }}>
                <OL>{a.serveLabel}</OL>
                <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'28px', fontWeight:700, color:'var(--text-primary)', marginBottom:'24px' }}>Geographic Coverage</h3>
                <div style={{ display:'grid', gap:'10px' }}>
                  {a.regions.map((r,i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', background:'var(--bg-primary)', border:'1px solid var(--border)', borderRadius:'7px', fontSize:'14.5px', color:'var(--text-primary)', fontWeight:400, transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-primary)' }}
                    >
                      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)' }}/>
                        {r}
                      </div>
                      <ArrowRight/>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-accent)', borderRadius:'10px', padding:'40px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'var(--gradient-btn)' }}/>
                <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'250px', height:'250px', borderRadius:'50%', background:'radial-gradient(circle,var(--glow) 0%,transparent 65%)', pointerEvents:'none' }}/>
                <div style={{ position:'relative', zIndex:1 }}>
                  <OL>Ready to Work Together?</OL>
                  <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'30px', fontWeight:700, color:'var(--text-primary)', marginBottom:'14px', lineHeight:1.2 }}>
                    Let's Build a Partnership
                  </h3>
                  <p style={{ fontSize:'14.5px', color:'var(--text-secondary)', lineHeight:1.85, fontWeight:300, marginBottom:'28px' }}>
                    Whether you're looking for a reliable trade partner, logistics solutions, or brand representation in West Africa — we're here to help.
                  </p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                    <button onClick={() => navigate('/contact')}
                      style={{ padding:'13px', borderRadius:'7px', background:'var(--gradient-btn)', color:'#fff', fontWeight:600, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.25s', boxShadow:'var(--shadow-accent)', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}
                      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(59,130,246,0.42)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                    >
                      Contact Us <ArrowRight/>
                    </button>
                    <button onClick={() => navigate('/services')}
                      style={{ padding:'12px', borderRadius:'7px', background:'transparent', color:'var(--text-primary)', fontWeight:500, fontSize:'14px', border:'1px solid var(--border)', cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.25s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.background='transparent' }}
                    >
                      Our Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}