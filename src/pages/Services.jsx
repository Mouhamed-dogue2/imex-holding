import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

function useReveal(t = 0.12) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect() } }, { threshold: t })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, on]
}

const Reveal = ({ children, delay = 0, x = 0, y = 24 }) => {
  const [ref, on] = useReveal()
  return <div ref={ref} style={{ opacity:on?1:0, transform:on?'none':`translate(${x}px,${y}px)`, transition:`opacity 0.7s ease ${delay}ms,transform 0.7s ease ${delay}ms` }}>{children}</div>
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

export default function Services() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(null)
  if (!t?.services) return null
  const s = t.services

  const details = [
    'Global sourcing, supplier negotiations, and quality control across all commodity types.',
    'Wide range of products for various markets and industries at competitive prices.',
    'Commercial representation, product distribution and market development in West Africa.',
    'Time-critical shipments handled with precision — door-to-door air cargo worldwide.',
    'Full container and less-than-container sea shipping from major ports globally.',
    'Bonded and open warehousing with real-time inventory management systems.',
    'HS code classification, duty optimisation, and complete customs filing services.',
    'Procurement, logistics coordination, inventory control and last-mile delivery.',
  ]

  return (
    <div style={{ background:'var(--bg-primary)' }}>

      {/* HEADER */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', padding:'72px 48px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,var(--glow) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ animation:'fadeUp 0.75s ease both' }}>
            <OL>{s.label}</OL>
            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(38px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'640px', marginBottom:'18px' }}>
              {s.title}
            </h1>
            <p style={{ fontSize:'16px', color:'var(--text-secondary)', maxWidth:'560px', lineHeight:1.85, fontWeight:300 }}>{s.sub}</p>
          </div>
          <div style={{ display:'flex', gap:'48px', marginTop:'48px', paddingTop:'36px', borderTop:'1px solid var(--border)', flexWrap:'wrap' }}>
            {[
              { val:'8',    label:'Specialised Services' },
              { val:'50+',  label:'Countries Covered' },
              { val:'24/7', label:'Client Support' },
              { val:'100%', label:'Compliance Rate' },
            ].map((s,i) => (
              <div key={i}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--text-primary)', lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'5px', fontWeight:400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — expandable */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ marginBottom:'48px' }}>
              <OL>All Services</OL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>What We Offer</h2>
            </div>
          </Reveal>

          <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'var(--border)', borderRadius:'10px', overflow:'hidden' }}>
            {s.items.map((svc,i) => (
              <Reveal key={i} delay={i*30}>
                <div
                  style={{ background:'var(--bg-primary)', transition:'background 0.2s' }}
                  onMouseEnter={e => { if (open!==i) e.currentTarget.style.background='var(--bg-secondary)' }}
                  onMouseLeave={e => { if (open!==i) e.currentTarget.style.background='var(--bg-primary)' }}
                >
                  <button
                    onClick={() => setOpen(open===i ? null : i)}
                    style={{ width:'100%', padding:'24px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:'24px' }}
                  >
                    <div style={{ display:'flex', alignItems:'center', gap:'24px', flex:1 }}>
                      <span style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'13px', color:'var(--text-muted)', fontWeight:500, minWidth:'32px', letterSpacing:'1px' }}>
                        {String(i+1).padStart(2,'0')}
                      </span>
                      <span style={{ fontSize:'16px', fontWeight:600, color:'var(--text-primary)', letterSpacing:'0.1px' }}>{svc.title}</span>
                    </div>
                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.25s', background: open===i ? 'var(--accent)' : 'transparent', borderColor: open===i ? 'var(--accent)' : 'var(--border)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open===i?'#fff':'var(--text-muted)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition:'transform 0.25s', transform:open===i?'rotate(45deg)':'none' }}>
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </button>

                  <div style={{ maxHeight: open===i ? '240px' : '0', overflow:'hidden', transition:'max-height 0.35s ease' }}>
                    <div style={{ padding:'0 32px 28px 32px', paddingLeft:'calc(32px + 32px + 24px)' }}>
                      <p style={{ fontSize:'14.5px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300, marginBottom:'14px' }}>
                        {svc.desc}
                      </p>
                      <p style={{ fontSize:'13.5px', color:'var(--text-muted)', lineHeight:1.75, fontWeight:300, marginBottom:'16px' }}>
                        {details[i]}
                      </p>
                      <button onClick={() => navigate('/contact')}
                        style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:'none', border:'none', color:'var(--accent)', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', padding:0, transition:'gap 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.gap='10px'}
                        onMouseLeave={e => e.currentTarget.style.gap='7px'}
                      >
                        Request this service <ArrowRight/>
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding:'88px 48px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ marginBottom:'52px' }}>
              <OL>How It Works</OL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>Our Process</h2>
            </div>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'var(--border)', borderRadius:'10px', overflow:'hidden' }}>
            {[
              { num:'01', title:'Consultation', desc:'We analyse your specific needs and define the optimal strategy for your trade or logistics operation.' },
              { num:'02', title:'Planning', desc:'We prepare a comprehensive logistics plan including routing, documentation, and timeline.' },
              { num:'03', title:'Execution', desc:'Our team manages every step with precision, ensuring compliance and quality throughout.' },
              { num:'04', title:'Delivery', desc:'Secure, on-time delivery with full documentation and real-time tracking updates.' },
            ].map((step,i) => (
              <Reveal key={i} delay={i*60}>
                <div style={{ background:'var(--bg-secondary)', padding:'36px 28px', transition:'background 0.22s', height:'100%' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--accent-bg)'}
                  onMouseLeave={e => e.currentTarget.style.background='var(--bg-secondary)'}
                >
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', opacity:0.12, lineHeight:1, marginBottom:'20px' }}>{step.num}</div>
                  <h3 style={{ fontSize:'15.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'10px' }}>{step.title}</h3>
                  <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:1.75, fontWeight:300 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY + IMAGE */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>
              <div>
                <OL>Our Advantage</OL>
                <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1, marginBottom:'20px' }}>
                  Why Choose IMEX HOLDING?
                </h2>
                <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'28px' }}>
                  With years of experience in international trade and logistics, we deliver tailored solutions that meet the highest global standards.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0', border:'1px solid var(--border)', borderRadius:'9px', overflow:'hidden', marginBottom:'28px' }}>
                  {['Strong international partner network','Expertise in international trade','Fast and secure logistics solutions','Professional customer service','Commitment to quality and efficiency'].map((item,i,arr) => (
                    <div key={i} style={{ padding:'14px 18px', fontSize:'13.5px', color:'var(--text-secondary)', fontWeight:400, borderBottom: i<arr.length-1 ? '1px solid var(--border)' : 'none', background:'var(--bg-secondary)', display:'flex', alignItems:'center', gap:'12px', transition:'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background='var(--accent-bg)'}
                      onMouseLeave={e => e.currentTarget.style.background='var(--bg-secondary)'}
                    >
                      <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', flexShrink:0 }}/>
                      {item}
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate('/contact')}
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 28px', borderRadius:'7px', background:'var(--gradient-btn)', color:'#fff', fontWeight:600, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.25s', boxShadow:'var(--shadow-accent)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(59,130,246,0.40)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                >
                  Get a Free Quote <ArrowRight/>
                </button>
              </div>
              <div>
                <img
                    src="/images/service1.jpg"
                    alt="Professional logistics team"
                    style={{ width:'100%', height:'480px', objectFit:'cover', borderRadius:'12px', display:'block', border:'1px solid var(--border)' }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}