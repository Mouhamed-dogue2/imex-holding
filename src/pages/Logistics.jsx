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

const LOG_DETAILS = [
  { coverage:'Gambia, Senegal, Guinea-Bissau, Mali', capacity:'5T – 40T trucks', delay:'24–72h', cert:'Transport insurance included' },
  { coverage:'Europe, Asia, Americas, Africa',        capacity:'FCL 20\' / 40\' / 40\'HC', delay:'15–45 days', cert:'Bill of Lading provided' },
  { coverage:'200+ worldwide destinations',           capacity:'50kg – 15 tonnes', delay:'24–96h', cert:'Airway Bill provided' },
  { coverage:'Banjul & West Africa region',           capacity:'Up to 5,000 m²', delay:'Immediate', cert:'Digitised inventory' },
  { coverage:'All ports & airports',                  capacity:'All cargo types', delay:'48–72h', cert:'Customs authority approved' },
  { coverage:'Worldwide',                             capacity:'All cargo types', delay:'Real-time', cert:'GPS & IoT integrated' },
]

export default function Logistics() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  if (!t?.logistics) return null
  const l = t.logistics

  return (
    <div style={{ background:'var(--bg-primary)' }}>

      {/* HEADER */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', padding:'72px 48px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,var(--glow) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1, animation:'fadeUp 0.75s ease both' }}>
          <OL>{l.label}</OL>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(38px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'640px', marginBottom:'18px' }}>
            {l.title}
          </h1>
          <p style={{ fontSize:'16px', color:'var(--text-secondary)', maxWidth:'560px', lineHeight:1.85, fontWeight:300 }}>{l.sub}</p>

          {/* KPIs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'var(--border)', borderRadius:'10px', overflow:'hidden', marginTop:'48px' }}>
            {[
              { val:'50+',  label:'Countries Served' },
              { val:'24/7', label:'Operational Support' },
              { val:'100%', label:'Customs Compliance' },
              { val:'<48h', label:'Processing Time' },
            ].map((kpi,i) => (
              <div key={i} style={{ background:'var(--bg-secondary)', padding:'24px 28px' }}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'30px', fontWeight:700, color:'var(--text-primary)', lineHeight:1, marginBottom:'5px' }}>{kpi.val}</div>
                <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', fontWeight:400 }}>{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODES — tab system */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ marginBottom:'40px' }}>
              <OL>Transport Modes</OL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>Logistics Solutions</h2>
            </div>
          </Reveal>

          {/* Tab buttons — texte seul */}
          <div style={{ display:'flex', gap:'1px', background:'var(--border)', borderRadius:'9px', overflow:'hidden', marginBottom:'32px', flexWrap:'wrap' }}>
            {l.items.map((item,i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                style={{ flex:1, minWidth:'120px', padding:'14px 16px', background: activeTab===i ? 'var(--accent)' : 'var(--bg-secondary)', color: activeTab===i ? '#fff' : 'var(--text-secondary)', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', fontSize:'13px', fontWeight: activeTab===i ? 600 : 400, transition:'all 0.2s', letterSpacing:'0.2px' }}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {l.items[activeTab] && (() => {
            const item = l.items[activeTab]
            const det = LOG_DETAILS[activeTab]
            return (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', animation:'fadeUp 0.4s ease both' }}>
                <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'10px', padding:'36px', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, width:'3px', height:'100%', background:'var(--gradient-btn)' }}/>
                  <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600, marginBottom:'12px' }}>{item.title}</div>
                  <p style={{ fontSize:'14.5px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300, marginBottom:'24px' }}>{item.desc}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0', border:'1px solid var(--border)', borderRadius:'8px', overflow:'hidden', marginBottom:'24px' }}>
                    {[
                      { label:'Coverage',      val:det.coverage },
                      { label:'Capacity',      val:det.capacity },
                      { label:'Avg. Lead Time',val:det.delay },
                      { label:'Certification', val:det.cert },
                    ].map((row,j) => (
                      <div key={j} style={{ display:'grid', gridTemplateColumns:'130px 1fr', gap:'16px', padding:'13px 16px', borderBottom: j<3 ? '1px solid var(--border)' : 'none', background:'var(--bg-primary)' }}>
                        <span style={{ fontSize:'11px', textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', fontWeight:500, paddingTop:'1px' }}>{row.label}</span>
                        <span style={{ fontSize:'13.5px', color:'var(--text-primary)', fontWeight:400 }}>{row.val}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/contact')}
                    style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 24px', borderRadius:'7px', background:'var(--gradient-btn)', color:'#fff', fontWeight:600, fontSize:'13.5px', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.25s', boxShadow:'var(--shadow-accent)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none' }}
                  >
                    Request this service <ArrowRight/>
                  </button>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                  <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'10px', padding:'24px 28px' }}>
                    <div style={{ fontSize:'11.5px', textTransform:'uppercase', letterSpacing:'1.5px', color:'var(--text-muted)', fontWeight:500, marginBottom:'14px' }}>Included in this service</div>
                    {['Pickup and packaging','Complete documentation','Real-time tracking','Transport insurance','Dedicated support'].map((f,j) => (
                      <div key={j} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 0', borderBottom: j<4 ? '1px solid var(--border)' : 'none', fontSize:'13.5px', color:'var(--text-secondary)', fontWeight:400 }}>
                        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', flexShrink:0 }}/>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-accent)', borderRadius:'10px', padding:'24px 28px' }}>
                    <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', marginBottom:'8px', fontWeight:600 }}>Average Lead Time</div>
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'36px', fontWeight:700, color:'var(--text-primary)', lineHeight:1, marginBottom:'6px' }}>{det.delay}</div>
                    <p style={{ fontSize:'13px', color:'var(--text-muted)', fontWeight:300 }}>After receiving your request</p>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding:'88px 48px', background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <Reveal>
            <div style={{ marginBottom:'52px' }}>
              <OL>End-to-End Process</OL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>
                From Origin to Destination
              </h2>
            </div>
          </Reveal>

          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:'20px', top:'28px', bottom:'28px', width:'1px', background:'var(--border)', zIndex:0 }}/>
            {[
              { num:'01', title:'Consultation & Quote',   desc:'We contact you, analyse your transport needs, and provide a detailed quote within 24 hours.' },
              { num:'02', title:'Documentation',           desc:'Preparation of all required documents — invoices, packing lists, certificates of origin, health certificates.' },
              { num:'03', title:'Pickup & Inspection',    desc:'Our team collects your cargo at the source, verifies packaging and performs a quality inspection before shipment.' },
              { num:'04', title:'Shipment',                desc:'Cargo is dispatched via the selected mode with tracking activated and key milestone notifications.' },
              { num:'05', title:'Customs Clearance',       desc:'Full management of import and export customs formalities for seamless transit without delays.' },
              { num:'06', title:'Delivery & Confirmation', desc:'Final delivery with recipient signature, delivery report, and archiving of all documentation.' },
            ].map((step,i) => (
              <Reveal key={i} delay={i*50}>
                <div style={{ display:'flex', gap:'32px', marginBottom:'20px', position:'relative', zIndex:1 }}>
                  <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:'var(--bg-primary)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontFamily:'"Cormorant Garamond",serif', fontSize:'12px', fontWeight:700, color:'var(--accent)', letterSpacing:'1px' }}>
                    {step.num}
                  </div>
                  <div style={{ flex:1, background:'var(--bg-primary)', border:'1px solid var(--border)', borderRadius:'9px', padding:'18px 24px', transition:'all 0.22s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-primary)' }}
                  >
                    <h3 style={{ fontSize:'14.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'5px' }}>{step.title}</h3>
                    <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)' }}>
        <Reveal>
          <div style={{ maxWidth:'760px', margin:'0 auto', background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'12px', overflow:'hidden' }}>
            <div style={{ height:'3px', background:'var(--gradient-btn)', backgroundSize:'200% 200%', animation:'gradMove 4s ease infinite' }}/>
            <div style={{ padding:'52px 48px', textAlign:'center' }}>
              <OL>Ready to Ship?</OL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'14px', lineHeight:1.1 }}>
                Need a Logistics Solution?
              </h2>
              <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.85, fontWeight:300, maxWidth:'500px', margin:'0 auto 32px' }}>
                Our team is available 24/7 to help you plan and execute your international logistics operations.
              </p>
              <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
                <button onClick={() => navigate('/contact')}
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 32px', borderRadius:'7px', background:'var(--gradient-btn)', color:'#fff', fontWeight:600, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.25s', boxShadow:'var(--shadow-accent)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(59,130,246,0.40)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
                >
                  Get a Free Quote <ArrowRight/>
                </button>
                <a href="https://wa.me/2205591066" target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 28px', borderRadius:'7px', background:'transparent', color:'var(--text-primary)', fontWeight:500, fontSize:'14px', border:'1px solid var(--border)', cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.25s', textDecoration:'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.background='transparent' }}
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  )
}