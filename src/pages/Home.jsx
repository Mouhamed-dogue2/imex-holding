// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

const SL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--gold)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{children}</span>
  </div>
)

const Card = ({ children, hover=true, style={} }) => {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: hov ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: `1px solid ${hov ? 'var(--border-gold)' : 'var(--border)'}`,
        borderRadius:'14px', transition:'all 0.25s',
        transform: hov ? 'translateY(-4px)' : 'none',
        ...style,
      }}
    >{children}</div>
  )
}

import { useState } from 'react'

export default function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sécurité : si t n'est pas chargé
  if (!t || !t.hero) return null

  return (
    <div style={{ background:'var(--bg-primary)' }}>

      {/* ══ HERO ══ */}
      <section style={{ minHeight:'91vh', display:'flex', alignItems:'center', padding:'80px 48px', position:'relative', overflow:'hidden' }}>
        {/* Background effects */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(var(--hero-grid) 1px,transparent 1px),linear-gradient(90deg,var(--hero-grid) 1px,transparent 1px)', backgroundSize:'64px 64px' }}/>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 60% 50% at 75% 50%,rgba(79,195,247,0.05) 0%,transparent 65%)' }}/>
        <div style={{ position:'absolute', top:'-100px', right:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'rgba(201,168,76,0.04)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:'1140px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1.15fr 0.85fr', gap:'80px', alignItems:'center', position:'relative', zIndex:1 }}>

          {/* LEFT */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px' }}>
              <div style={{ width:'36px', height:'1px', background:'var(--gold)' }}/>
              <span style={{ fontSize:'11px', letterSpacing:'3.5px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{t.hero.eyebrow}</span>
            </div>

            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(44px,5.5vw,68px)', fontWeight:300, lineHeight:1.06, color:'var(--text-primary)', marginBottom:'6px' }}>
              {t.hero.h1a} <strong style={{ fontWeight:700 }}>{t.hero.h1b}</strong>
            </h1>
            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(44px,5.5vw,68px)', fontWeight:300, lineHeight:1.06, color:'var(--text-primary)', marginBottom:'0' }}>
              <em style={{ fontStyle:'italic', color:'var(--gold)' }}>{t.hero.h1c}</em> {t.hero.h1d}
            </h1>

            <div style={{ width:'52px', height:'1px', background:'var(--border-gold)', margin:'28px 0' }}/>

            <p style={{ fontSize:'15.5px', lineHeight:1.85, color:'var(--text-secondary)', maxWidth:'460px', marginBottom:'40px', fontWeight:300 }}>
              {t.hero.desc}
            </p>

            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <button onClick={() => navigate('/services')}
                onMouseEnter={e => { e.currentTarget.style.background='var(--gold-light)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.transform='none' }}
                style={{ background:'var(--gold)', color:'#070E1A', padding:'14px 34px', borderRadius:'9px', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}>
                {t.hero.btn1}
              </button>
              <button onClick={() => navigate('/contact')}
                onMouseEnter={e => { e.currentTarget.style.background='var(--gold-bg)'; e.currentTarget.style.borderColor='var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--border-gold)' }}
                style={{ background:'transparent', color:'var(--gold)', padding:'14px 34px', borderRadius:'9px', fontWeight:500, fontSize:'14px', border:'1px solid var(--border-gold)', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}>
                {t.hero.btn2}
              </button>
            </div>

            {/* Stats */}
            <div style={{ display:'flex', gap:'44px', marginTop:'56px', paddingTop:'36px', borderTop:'1px solid var(--border)' }}>
              {[
                { val:'4+', label: t.hero.stat1 },
                { val:'4',  label: t.hero.stat2 },
                { val:'6+', label: t.hero.stat3 },
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'34px', fontWeight:700, color:'var(--text-primary)', lineHeight:1 }}>
                    {s.val.replace('+','')}<span style={{ color:'var(--gold)' }}>{s.val.includes('+') ? '+' : ''}</span>
                  </div>
                  <div style={{ fontSize:'10.5px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ display:'grid', gap:'12px' }}>
            <div style={{ background:'var(--gold-bg)', border:'1px solid var(--border-gold)', borderRadius:'13px', padding:'20px 22px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px' }}>
                <div style={{ width:'38px', height:'38px', borderRadius:'9px', background:'var(--bg-card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🌍</div>
                <span style={{ fontSize:'14px', fontWeight:500, color:'var(--text-primary)' }}>Réseau Commercial Mondial</span>
              </div>
              <p style={{ fontSize:'12px', color:'var(--text-muted)', paddingLeft:'50px' }}>Africa · Europe · Asia · Middle East</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              {[
                { icon:'🚢', t:'Fret Maritime',   b:'FCL & LCL' },
                { icon:'✈️', t:'Fret Aérien',      b:'Cargo express' },
                { icon:'⛓️', t:'Supply Chain',     b:'End-to-end' },
                { icon:'🏷️', t:'Brand Rep.',       b:'West Africa' },
              ].map((c,i) => (
                <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'12px', padding:'16px 18px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                    <span style={{ fontSize:'15px' }}>{c.icon}</span>
                    <span style={{ fontSize:'12.5px', fontWeight:500, color:'var(--text-primary)' }}>{c.t}</span>
                  </div>
                  <p style={{ fontSize:'11px', color:'var(--text-muted)', paddingLeft:'23px' }}>{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT STRIP ══ */}
      <section style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)', borderBottom:'1px solid var(--border-gold)', padding:'72px 48px' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>
          <div style={{ background:'linear-gradient(135deg,var(--bg-card),var(--gold-bg))', border:'1px solid var(--border-gold)', borderRadius:'16px', padding:'44px 40px' }}>
            <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'28px', fontWeight:600, color:'var(--text-primary)', lineHeight:1.35, marginBottom:'16px' }}>
              Building Connections.<br/><span style={{ color:'var(--gold)' }}>Delivering Excellence.</span>
            </div>
            <p style={{ fontSize:'14px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300, marginBottom:'24px' }}>
              Basée à Banjul, The Gambia — IMEX HOLDING LTD connecte les marchés d'Afrique aux marchés mondiaux.
            </p>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {['Afrique','Europe','Asie','Moyen-Orient'].map(r => (
                <span key={r} style={{ background:'var(--gold-bg)', border:'1px solid var(--border-gold)', color:'var(--gold)', fontSize:'12px', padding:'5px 14px', borderRadius:'20px' }}>{r}</span>
              ))}
            </div>
          </div>
          <div>
            <SL>{t.about?.label || 'Qui Sommes-Nous'}</SL>
            <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'36px', fontWeight:700, color:'var(--text-primary)', marginBottom:'18px', lineHeight:1.15 }}>IMEX HOLDING LTD</h2>
            <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.85, marginBottom:'20px', fontWeight:300 }}>
              {t.about?.aboutText}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {(t.about?.values || []).map(v => (
                <span key={v} style={{ background:'var(--bg-primary)', border:'1px solid var(--border-gold)', color:'var(--text-secondary)', fontSize:'12px', padding:'6px 16px', borderRadius:'20px' }}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <SL>{t.services.label}</SL>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', marginBottom:'12px' }}>{t.services.title}</h2>
          <p style={{ fontSize:'15px', color:'var(--text-secondary)', maxWidth:'520px', lineHeight:1.8, marginBottom:'52px', fontWeight:300 }}>{t.services.sub}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {t.services.items.map((svc, i) => (
              <Card key={i} style={{ padding:'28px', cursor:'pointer' }} onClick={() => navigate('/services')}>
                <div style={{ width:'52px', height:'52px', borderRadius:'13px', border:'1px solid var(--border-gold)', background:'var(--gold-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', marginBottom:'18px' }}>{svc.icon}</div>
                <h3 style={{ fontSize:'15.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'9px' }}>{svc.title}</h3>
                <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{svc.desc}</p>
              </Card>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:'40px' }}>
            <button onClick={() => navigate('/services')}
              style={{ background:'transparent', color:'var(--gold)', padding:'12px 32px', borderRadius:'9px', border:'1px solid var(--border-gold)', cursor:'pointer', fontSize:'14px', fontWeight:500, fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--gold-bg)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              Voir tous les services →
            </button>
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-secondary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <SL>{t.products.label}</SL>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', marginBottom:'12px' }}>{t.products.title}</h2>
          <p style={{ fontSize:'15px', color:'var(--text-secondary)', maxWidth:'520px', lineHeight:1.8, marginBottom:'52px', fontWeight:300 }}>{t.products.sub}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {t.products.items.map((p, i) => (
              <Card key={i} style={{ padding:'28px', cursor:'pointer' }}>
                <div style={{ fontSize:'11px', letterSpacing:'2px', color:'var(--text-muted)', marginBottom:'14px', textTransform:'uppercase' }}>
                  {String(i+1).padStart(2,'0')} — {p.cat}
                </div>
                <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'24px', fontWeight:700, color:'var(--text-primary)', marginBottom:'10px' }}>{p.title}</h3>
                <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300, marginBottom:'18px' }}>{p.desc}</p>
                <span style={{ display:'inline-block', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', color:'var(--gold)', fontSize:'11px', padding:'4px 14px', borderRadius:'20px' }}>{p.tag}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <SL>{t.about.whyLabel}</SL>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'44px', fontWeight:700, color:'var(--text-primary)', marginBottom:'52px' }}>{t.about.whyTitle}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {t.about.why.map((w, i) => (
              <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'14px', padding:'30px' }}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'50px', fontWeight:700, color:'var(--gold)', opacity:0.2, lineHeight:1, marginBottom:'16px' }}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <h3 style={{ fontSize:'15.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'9px' }}>{w.title}</h3>
                <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ padding:'80px 48px', background:'var(--bg-secondary)' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', textAlign:'center', background:'linear-gradient(135deg,var(--gold-bg),rgba(79,195,247,0.04))', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'72px 56px' }}>
          <div style={{ display:'inline-block', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'6px 18px', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'24px' }}>
            Partenariat International
          </div>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'42px', fontWeight:700, color:'var(--text-primary)', marginBottom:'16px', lineHeight:1.15 }}>{t.cta.title}</h2>
          <p style={{ fontSize:'15.5px', color:'var(--text-secondary)', marginBottom:'36px', fontWeight:300, lineHeight:1.8, maxWidth:'500px', margin:'0 auto 36px' }}>{t.cta.desc}</p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/contact')}
              onMouseEnter={e => { e.currentTarget.style.background='var(--gold-light)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.transform='none' }}
              style={{ background:'var(--gold)', color:'#070E1A', padding:'14px 36px', borderRadius:'9px', fontWeight:700, fontSize:'14.5px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}>
              {t.cta.btn1}
            </button>
            <button onClick={() => navigate('/services')}
              onMouseEnter={e => e.currentTarget.style.background='var(--gold-bg)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
              style={{ background:'transparent', color:'var(--gold)', padding:'14px 36px', borderRadius:'9px', fontWeight:500, fontSize:'14.5px', border:'1px solid var(--border-gold)', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}>
              {t.cta.btn2}
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}