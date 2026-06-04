import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from '../i18n/index.jsx'

const OL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--accent)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>{children}</span>
  </div>
)

const inputStyle = {
  width:'100%', background:'var(--bg-primary)', border:'1px solid var(--border)',
  borderRadius:'7px', padding:'12px 16px', fontSize:'14px',
  fontFamily:'Inter,sans-serif', color:'var(--text-primary)', outline:'none',
  transition:'border-color 0.2s', display:'block',
}

export default function Contact() {
  const { t } = useTranslation()
  const form = useRef()
  const [status, setStatus]   = useState(null)
  const [loading, setLoading] = useState(false)
  if (!t?.contact) return null
  const c = t.contact

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', form.current,'YOUR_PUBLIC_KEY')
      setStatus('success')
      form.current.reset()
    } catch { setStatus('error') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ background:'var(--bg-primary)' }}>

      {/* HEADER */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', padding:'72px 48px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,var(--glow) 0%,transparent 65%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1, animation:'fadeUp 0.75s ease both' }}>
          <OL>{c.label}</OL>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(38px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'640px', marginBottom:'18px' }}>
            {c.title}
          </h1>
          <p style={{ fontSize:'16px', color:'var(--text-secondary)', maxWidth:'520px', lineHeight:1.85, fontWeight:300 }}>{c.desc}</p>
        </div>
      </section>

      {/* MAIN */}
      <section style={{ padding:'88px 48px', background:'var(--bg-primary)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'56px', alignItems:'start' }}>

          {/* INFO */}
          <div>
            <OL>Contact Information</OL>
            <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--text-primary)', marginBottom:'28px', lineHeight:1.15 }}>
              Reach Out Directly
            </h2>

            <div style={{ display:'flex', flexDirection:'column', gap:'0', border:'1px solid var(--border)', borderRadius:'9px', overflow:'hidden', marginBottom:'24px' }}>
              {[
                { label:'Phone',   vals:['+220 559 1066'] },
                { label:'Email',   vals:['imexholding1@gmail.com'] },
                { label:'WhatsApp',vals:['+220 559 1066'] },
                { label:'Address', vals:['Banjul, The Gambia', 'West Africa'] },
                { label:'Regions', vals:['Africa · Europe · Asia · Middle East'] },
              ].map((item,i,arr) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'110px 1fr', gap:'16px', padding:'16px 20px', borderBottom: i<arr.length-1 ? '1px solid var(--border)' : 'none', background:'var(--bg-secondary)', transition:'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--accent-bg)'}
                  onMouseLeave={e => e.currentTarget.style.background='var(--bg-secondary)'}
                >
                  <span style={{ fontSize:'11px', textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', fontWeight:500, paddingTop:'2px' }}>{item.label}</span>
                  <div>
                    {item.vals.map((v,j) => (
                      <div key={j} style={{ fontSize:'14px', color:'var(--text-primary)', fontWeight:400, lineHeight:1.6 }}>{v}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/2205591066" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'9px', textDecoration:'none', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-secondary)' }}
            >
              <div>
                <div style={{ fontSize:'13.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'2px' }}>Chat on WhatsApp</div>
                <div style={{ fontSize:'12px', color:'var(--text-muted)', fontWeight:300 }}>Quick response guaranteed</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }}/>
                <span style={{ fontSize:'12px', color:'#16a34a', fontWeight:600 }}>Online</span>
              </div>
            </a>
          </div>

          {/* FORM */}
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'10px', overflow:'hidden' }}>
            <div style={{ height:'3px', background:'var(--gradient-btn)', backgroundSize:'200% 200%', animation:'gradMove 4s ease infinite' }}/>
            <div style={{ padding:'40px' }}>
              <OL>Send a Message</OL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'28px', fontWeight:700, color:'var(--text-primary)', marginBottom:'28px' }}>{c.formTitle}</h2>

              {status === 'success' && (
                <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:'7px', padding:'12px 16px', marginBottom:'20px', fontSize:'14px', color:'#16a34a' }}>
                  {c.successMsg}
                </div>
              )}
              {status === 'error' && (
                <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:'7px', padding:'12px 16px', marginBottom:'20px', fontSize:'14px', color:'#dc2626' }}>
                  {c.errorMsg}
                </div>
              )}

              <form ref={form} onSubmit={handleSubmit}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
                  <div>
                    <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'7px' }}>{c.name}</label>
                    <input name="user_name" type="text" placeholder={c.namePlaceholder} required style={inputStyle}
                      onFocus={e => e.target.style.borderColor='var(--accent)'}
                      onBlur={e => e.target.style.borderColor='var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'7px' }}>{c.emailField}</label>
                    <input name="user_email" type="email" placeholder={c.emailPlaceholder} required style={inputStyle}
                      onFocus={e => e.target.style.borderColor='var(--accent)'}
                      onBlur={e => e.target.style.borderColor='var(--border)'}
                    />
                  </div>
                </div>
                <div style={{ marginBottom:'16px' }}>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'7px' }}>{c.subject}</label>
                  <input name="subject" type="text" placeholder={c.subjectPlaceholder} style={inputStyle}
                    onFocus={e => e.target.style.borderColor='var(--accent)'}
                    onBlur={e => e.target.style.borderColor='var(--border)'}
                  />
                </div>
                <div style={{ marginBottom:'24px' }}>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'7px' }}>{c.message}</label>
                  <textarea name="message" placeholder={c.messagePlaceholder} rows={5} required style={{ ...inputStyle, resize:'vertical', minHeight:'120px' }}
                    onFocus={e => e.target.style.borderColor='var(--accent)'}
                    onBlur={e => e.target.style.borderColor='var(--border)'}
                  />
                </div>
                <button type="submit" disabled={loading}
                  style={{ width:'100%', background: loading ? 'rgba(59,130,246,0.5)' : 'var(--gradient-btn)', color:'#fff', padding:'14px', borderRadius:'7px', fontWeight:600, fontSize:'14.5px', border:'none', cursor:loading?'not-allowed':'pointer', fontFamily:'Inter,sans-serif', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', boxShadow: loading ? 'none' : 'var(--shadow-accent)' }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.transform='translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none' }}
                >
                  {loading ? (
                    <>
                      <div style={{ width:'15px', height:'15px', border:'2px solid rgba(255,255,255,0.3)', borderTop:'2px solid #fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                      Sending...
                    </>
                  ) : c.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP + HOURS */}
      <section style={{ padding:'0 48px 88px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr', gap:'20px' }}>

          {/* Map placeholder */}
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'10px', overflow:'hidden', minHeight:'260px', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)', backgroundSize:'32px 32px' }}/>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'12px' }}>
              <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'22px', fontWeight:700, color:'var(--text-primary)', marginBottom:'4px' }}>Banjul, The Gambia</div>
              <div style={{ fontSize:'13px', color:'var(--text-muted)', marginBottom:'14px' }}>West Africa</div>
              <a href="https://maps.google.com/?q=Banjul,Gambia" target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'10px 22px', borderRadius:'7px', background:'var(--gradient-btn)', color:'#fff', fontSize:'13.5px', fontWeight:600, textDecoration:'none', fontFamily:'Inter,sans-serif', boxShadow:'var(--shadow-accent)' }}
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Info cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {[
              { label:'Business Hours', val:'Mon – Fri: 08:00 – 18:00\nSat: 09:00 – 14:00' },
              { label:'Response Time',  val:'Within 24 hours' },
              { label:'Languages',      val:'English · French · Spanish' },
            ].map((item,i) => (
              <div key={i} style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'9px', padding:'20px 22px' }}>
                <div style={{ fontSize:'10.5px', fontWeight:600, textTransform:'uppercase', letterSpacing:'1.5px', color:'var(--text-muted)', marginBottom:'10px' }}>{item.label}</div>
                <div style={{ fontSize:'14px', color:'var(--text-primary)', fontWeight:400, lineHeight:1.7, whiteSpace:'pre-line' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}