// src/pages/Contact.jsx
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from '../i18n/index.jsx'

function SectionLabel({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
      <div style={{ width:'24px', height:'1px', background:'#C9A84C' }}/>
      <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'#C9A84C', fontWeight:500 }}>{children}</span>
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const c = t.contact
  const form = useRef()
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

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
    { icon:'📞', label: c.phone,   vals: ['+220 559 1066', '+220 796 5656'] },
    { icon:'📧', label: c.email,   vals: ['imexholding1@gmail.com'] },
    { icon:'💬', label: 'WhatsApp',vals: ['+220 559 1066'] },
    { icon:'📍', label: c.address, vals: ['Banjul, The Gambia', 'West Africa'] },
    { icon:'🌍', label: c.serve,   vals: ['Africa · Europe · Asia · Middle East'] },
  ]

  return (
    <div style={{ background:'#070E1A' }}>

      {/* PAGE HERO */}
      <section style={{ background:'#0C1525', borderBottom:'1px solid rgba(201,168,76,0.18)', padding:'72px 48px 60px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <SectionLabel>{c.label}</SectionLabel>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(36px,4vw,52px)', fontWeight:700, color:'#fff', marginTop:'12px', lineHeight:1.1 }}>{c.title}</h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.5)', marginTop:'14px', maxWidth:'520px', lineHeight:1.8, fontWeight:300 }}>{c.desc}</p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section style={{ padding:'80px 48px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'52px', alignItems:'start' }}>

          {/* INFO */}
          <div>
            <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'24px', fontWeight:700, color:'#fff', marginBottom:'28px' }}>Informations de Contact</h3>
            {contactItems.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:'16px', alignItems:'flex-start', marginBottom:'24px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'10px', border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'4px' }}>{item.label}</div>
                  {item.vals.map((v, j) => <div key={j} style={{ fontSize:'14px', color:'#fff', fontWeight:400, lineHeight:1.6 }}>{v}</div>)}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a href="https://wa.me/2205591066" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', gap:'12px', marginTop:'32px', background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.25)', borderRadius:'12px', padding:'16px 20px', textDecoration:'none', transition:'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(37,211,102,0.16)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(37,211,102,0.1)'}
            >
              <span style={{ fontSize:'24px' }}>💬</span>
              <div>
                <div style={{ fontSize:'13px', fontWeight:600, color:'#25D366' }}>WhatsApp Direct</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)' }}>Réponse rapide garantie</div>
              </div>
            </a>
          </div>

          {/* FORM */}
          <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(201,168,76,0.18)', borderRadius:'16px', padding:'40px' }}>
            <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'26px', fontWeight:700, color:'#fff', marginBottom:'28px' }}>{c.formTitle}</h3>

            {status === 'success' && (
              <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:'8px', padding:'14px 18px', marginBottom:'24px', fontSize:'14px', color:'#4ade80' }}>
                ✅ {c.successMsg}
              </div>
            )}
            {status === 'error' && (
              <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'8px', padding:'14px 18px', marginBottom:'24px', fontSize:'14px', color:'#f87171' }}>
                ❌ {c.errorMsg}
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
                <div>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>{c.name}</label>
                  <input name="user_name" type="text" placeholder={c.namePlaceholder} required style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'12px 16px', fontSize:'14px', fontFamily:'Outfit,sans-serif', color:'#fff', outline:'none' }} onFocus={e => e.target.style.borderColor='#C9A84C'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>{c.emailField}</label>
                  <input name="user_email" type="email" placeholder={c.emailPlaceholder} required style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'12px 16px', fontSize:'14px', fontFamily:'Outfit,sans-serif', color:'#fff', outline:'none' }} onFocus={e => e.target.style.borderColor='#C9A84C'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
                </div>
              </div>
              <div style={{ marginBottom:'16px' }}>
                <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>{c.subject}</label>
                <input name="subject" type="text" placeholder={c.subjectPlaceholder} style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'12px 16px', fontSize:'14px', fontFamily:'Outfit,sans-serif', color:'#fff', outline:'none' }} onFocus={e => e.target.style.borderColor='#C9A84C'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
              </div>
              <div style={{ marginBottom:'24px' }}>
                <label style={{ display:'block', fontSize:'11px', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>{c.message}</label>
                <textarea name="message" placeholder={c.messagePlaceholder} rows={5} required style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'12px 16px', fontSize:'14px', fontFamily:'Outfit,sans-serif', color:'#fff', outline:'none', resize:'vertical' }} onFocus={e => e.target.style.borderColor='#C9A84C'} onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
              </div>
              <button type="submit" disabled={loading} style={{ width:'100%', background: loading ? 'rgba(201,168,76,0.5)' : '#C9A84C', color:'#070E1A', padding:'14px', borderRadius:'8px', fontWeight:700, fontSize:'15px', border:'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'Outfit,sans-serif', letterSpacing:'0.3px', transition:'all 0.2s' }}>
                {loading ? '⏳ Envoi en cours...' : c.send}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  )
}