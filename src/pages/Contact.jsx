// src/pages/Contact.jsx
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from '../i18n/index.jsx'

const SL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--gold)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{children}</span>
  </div>
)

const Input = ({ label, children }) => (
  <div style={{ marginBottom:'18px' }}>
    <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'8px' }}>{label}</label>
    {children}
  </div>
)

const inputStyle = {
  width:'100%', background:'var(--bg-primary)', border:'1px solid var(--border)',
  borderRadius:'10px', padding:'13px 16px', fontSize:'14px',
  fontFamily:'Outfit,sans-serif', color:'var(--text-primary)', outline:'none',
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
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form.current,
        'YOUR_PUBLIC_KEY'
      )
      setStatus('success')
      form.current.reset()
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const contactItems = [
    { icon:'📞', label: c.phone,   vals:['+220 559 1066','+220 796 5656'] },
    { icon:'📧', label: c.email,   vals:['imexholding1@gmail.com'] },
    { icon:'💬', label:'WhatsApp', vals:['+220 559 1066'] },
    { icon:'📍', label: c.address, vals:['Banjul, The Gambia','West Africa'] },
    { icon:'🌍', label: c.serve,   vals:['Africa · Europe · Asia · Middle East'] },
  ]

  return (
    <div style={{ background:'var(--bg-primary)', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border-gold)', padding:'80px 48px 72px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(var(--hero-grid) 1px,transparent 1px),linear-gradient(90deg,var(--hero-grid) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
        <div style={{ position:'absolute', right:0, top:0, width:'400px', height:'400px', background:'radial-gradient(circle,var(--gold-bg) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <SL>{c.label}</SL>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(40px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'600px' }}>{c.title}</h1>
          <p style={{ fontSize:'16px', color:'var(--text-secondary)', marginTop:'18px', maxWidth:'520px', lineHeight:1.85, fontWeight:300 }}>{c.desc}</p>
          <div style={{ display:'flex', gap:'16px', marginTop:'32px', flexWrap:'wrap' }}>
            {[
              { icon:'📞', label:'+220 559 1066' },
              { icon:'📧', label:'imexholding1@gmail.com' },
              { icon:'💬', label:'WhatsApp' },
            ].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', background:'var(--bg-card)', border:'1px solid var(--border-gold)', borderRadius:'10px', padding:'10px 16px' }}>
                <span style={{ fontSize:'16px' }}>{item.icon}</span>
                <span style={{ fontSize:'13px', color:'var(--text-primary)', fontWeight:400 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'52px', alignItems:'start' }}>

          {/* ── INFO ── */}
          <div>
            <SL>Our Information</SL>
            <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--text-primary)', marginBottom:'28px', lineHeight:1.2 }}>Contact Details</h2>

            <div style={{ display:'grid', gap:'14px', marginBottom:'32px' }}>
              {contactItems.map((item,i) => (
                <div key={i} style={{ display:'flex', gap:'16px', alignItems:'flex-start', padding:'18px 20px', background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'14px', transition:'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--border-gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
                >
                  <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize:'10.5px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'5px' }}>{item.label}</div>
                    {item.vals.map((v,j) => (
                      <div key={j} style={{ fontSize:'14px', color:'var(--text-primary)', fontWeight:400, lineHeight:1.6 }}>{v}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/2205591066" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', gap:'14px', background:'rgba(37,211,102,0.08)', border:'1px solid rgba(37,211,102,0.25)', borderRadius:'14px', padding:'18px 22px', textDecoration:'none', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(37,211,102,0.15)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(37,211,102,0.08)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.25)' }}
            >
              <div style={{ width:'48px', height:'48px', borderRadius:'12px', background:'rgba(37,211,102,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>💬</div>
              <div>
                <div style={{ fontSize:'14px', fontWeight:600, color:'#25D366', marginBottom:'3px' }}>Chat on WhatsApp</div>
                <div style={{ fontSize:'12.5px', color:'var(--text-muted)', fontWeight:300 }}>Quick response guaranteed</div>
              </div>
              <div style={{ marginLeft:'auto', color:'#25D366', fontSize:'18px' }}>→</div>
            </a>
          </div>

          {/* ── FORM ── */}
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'44px' }}>
            <SL>Send a Message</SL>
            <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'30px', fontWeight:700, color:'var(--text-primary)', marginBottom:'28px' }}>{c.formTitle}</h2>

            {status === 'success' && (
              <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:'10px', padding:'14px 18px', marginBottom:'24px', fontSize:'14px', color:'#4ade80', display:'flex', alignItems:'center', gap:'10px' }}>
                ✅ {c.successMsg}
              </div>
            )}
            {status === 'error' && (
              <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'10px', padding:'14px 18px', marginBottom:'24px', fontSize:'14px', color:'#f87171', display:'flex', alignItems:'center', gap:'10px' }}>
                ❌ {c.errorMsg}
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                <Input label={c.name}>
                  <input name="user_name" type="text" placeholder={c.namePlaceholder} required style={inputStyle}
                    onFocus={e => e.target.style.borderColor='var(--gold)'}
                    onBlur={e => e.target.style.borderColor='var(--border)'}
                  />
                </Input>
                <Input label={c.emailField}>
                  <input name="user_email" type="email" placeholder={c.emailPlaceholder} required style={inputStyle}
                    onFocus={e => e.target.style.borderColor='var(--gold)'}
                    onBlur={e => e.target.style.borderColor='var(--border)'}
                  />
                </Input>
              </div>
              <Input label={c.subject}>
                <input name="subject" type="text" placeholder={c.subjectPlaceholder} style={inputStyle}
                  onFocus={e => e.target.style.borderColor='var(--gold)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'}
                />
              </Input>
              <Input label={c.message}>
                <textarea name="message" placeholder={c.messagePlaceholder} rows={5} required style={{ ...inputStyle, resize:'vertical', minHeight:'130px' }}
                  onFocus={e => e.target.style.borderColor='var(--gold)'}
                  onBlur={e => e.target.style.borderColor='var(--border)'}
                />
              </Input>

              <button type="submit" disabled={loading}
                style={{
                  width:'100%', background: loading ? 'rgba(201,168,76,0.4)' : 'var(--gold)',
                  color:'#07100A', padding:'15px', borderRadius:'11px',
                  fontWeight:700, fontSize:'15px', border:'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily:'Outfit,sans-serif', letterSpacing:'0.3px',
                  transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background='var(--gold-light)'; e.currentTarget.style.transform='translateY(-2px)' }}}
                onMouseLeave={e => { e.currentTarget.style.background=loading?'rgba(201,168,76,0.4)':'var(--gold)'; e.currentTarget.style.transform='none' }}
              >
                {loading ? (
                  <>
                    <div style={{ width:'16px', height:'16px', border:'2px solid rgba(7,16,10,0.3)', borderTop:'2px solid #07100A', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
                    Sending...
                  </>
                ) : (
                  <>{c.send} <span style={{ fontSize:'16px' }}>→</span></>
                )}
              </button>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </form>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER + EXTRA INFO ── */}
      <section style={{ padding:'0 48px 80px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr', gap:'24px' }}>

          {/* Map placeholder */}
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'16px', overflow:'hidden', minHeight:'280px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'12px', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--hero-grid) 1px,transparent 1px),linear-gradient(90deg,var(--hero-grid) 1px,transparent 1px)', backgroundSize:'32px 32px', opacity:0.5 }}/>
            <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
              <div style={{ fontSize:'40px', marginBottom:'12px' }}>📍</div>
              <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'22px', fontWeight:700, color:'var(--text-primary)', marginBottom:'6px' }}>Banjul, The Gambia</div>
              <div style={{ fontSize:'13px', color:'var(--text-muted)', marginBottom:'16px' }}>West Africa</div>
              <a href="https://maps.google.com/?q=Banjul,Gambia" target="_blank" rel="noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'var(--gold)', color:'#07100A', padding:'10px 22px', borderRadius:'9px', fontWeight:700, fontSize:'13px', textDecoration:'none', fontFamily:'Outfit,sans-serif' }}
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Quick info */}
          <div style={{ display:'grid', gap:'14px' }}>
            {[
              { icon:'⏰', title:'Business Hours', val:'Mon – Fri: 8:00 – 18:00\nSat: 9:00 – 14:00' },
              { icon:'⚡', title:'Response Time', val:'Within 24 hours' },
              { icon:'🌍', title:'Languages', val:'English · French · Spanish' },
            ].map((item,i) => (
              <div key={i} style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'14px', padding:'20px 22px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                  <span style={{ fontSize:'20px' }}>{item.icon}</span>
                  <span style={{ fontSize:'12px', fontWeight:600, textTransform:'uppercase', letterSpacing:'1.5px', color:'var(--text-muted)' }}>{item.title}</span>
                </div>
                <div style={{ fontSize:'13.5px', color:'var(--text-primary)', fontWeight:400, lineHeight:1.65, whiteSpace:'pre-line' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}