// src/pages/About.jsx
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

const SL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--gold)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{children}</span>
  </div>
)

export default function About() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (!t?.about) return null
  const a = t.about

  return (
    <div style={{ background:'var(--bg-primary)', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border-gold)', padding:'80px 48px 72px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(var(--hero-grid) 1px,transparent 1px),linear-gradient(90deg,var(--hero-grid) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
        <div style={{ position:'absolute', right:0, top:0, width:'400px', height:'400px', background:'radial-gradient(circle,var(--gold-bg) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>
          <div>
            <SL>{a.label}</SL>
            <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(40px,5vw,62px)', fontWeight:300, color:'var(--text-primary)', lineHeight:1.08 }}>
              <strong style={{ fontWeight:700 }}>{a.h1}</strong><br/>{a.h2}
            </h1>
            <p style={{ fontSize:'16px', color:'var(--text-secondary)', marginTop:'18px', lineHeight:1.85, fontWeight:300 }}>{a.desc}</p>
            <button onClick={() => navigate('/contact')}
              style={{ marginTop:'32px', background:'var(--gold)', color:'#070E1A', padding:'13px 32px', borderRadius:'9px', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--gold-light)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.transform='none' }}
            >
              Travailler avec nous
            </button>
          </div>
          {/* Stats panel */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {[
              { val:'4+', label:'Activités Clés', icon:'⚡' },
              { val:'4', label:'Continents', icon:'🌍' },
              { val:'6+', label:'Produits Phares', icon:'📦' },
              { val:'100%', label:'Engagement Qualité', icon:'✅' },
            ].map((st,i) => (
              <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border-gold)', borderRadius:'14px', padding:'24px 20px', textAlign:'center' }}>
                <div style={{ fontSize:'24px', marginBottom:'10px' }}>{st.icon}</div>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--gold)', lineHeight:1 }}>{st.val}</div>
                <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'6px' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUI SOMMES NOUS ── */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>
          <div>
            <SL>Notre Histoire</SL>
            <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'20px', lineHeight:1.15 }}>{a.aboutTitle}</h2>
            <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'20px' }}>{a.aboutText}</p>
            <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.9, fontWeight:300, marginBottom:'32px' }}>
              Avec un réseau solide de fournisseurs et de partenaires internationaux, nous opérons dans plusieurs secteurs stratégiques avec professionnalisme, efficacité et intégrité — connectant les marchés africains aux opportunités mondiales.
            </p>
            {/* Activités */}
            <div style={{ display:'grid', gap:'10px' }}>
              {[
                { icon:'🔄', label:'Import & Export' },
                { icon:'🛒', label:'Commerce Général' },
                { icon:'🏷️', label:'Représentation de Marques' },
                { icon:'🚛', label:'Transport & Logistique' },
              ].map((act,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'13px 18px', background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'10px' }}>
                  <span style={{ fontSize:'20px' }}>{act.icon}</span>
                  <span style={{ fontSize:'14.5px', color:'var(--text-primary)', fontWeight:400 }}>{act.label}</span>
                  <span style={{ marginLeft:'auto', color:'var(--gold)', fontSize:'12px' }}>→</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'grid', gap:'20px' }}>
            {/* Mission */}
            <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'16px', padding:'32px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>🎯</div>
                <div>
                  <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'2px' }}>{a.missionLabel}</div>
                  <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'20px', fontWeight:700, color:'var(--text-primary)' }}>{a.missionTitle}</h3>
                </div>
              </div>
              <p style={{ fontSize:'14px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300 }}>{a.missionText}</p>
            </div>

            {/* Vision */}
            <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'16px', padding:'32px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>🔭</div>
                <div>
                  <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'2px' }}>{a.visionLabel}</div>
                  <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'20px', fontWeight:700, color:'var(--text-primary)' }}>{a.visionTitle}</h3>
                </div>
              </div>
              <p style={{ fontSize:'14px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300 }}>{a.visionText}</p>
            </div>

            {/* Régions */}
            <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'16px', padding:'28px' }}>
              <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'14px' }}>{a.serveLabel}</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                {a.regions.map(r => (
                  <div key={r} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', background:'var(--bg-card)', border:'1px solid var(--border-gold)', borderRadius:'9px' }}>
                    <span style={{ width:'6px', height:'6px', background:'var(--gold)', borderRadius:'50%', flexShrink:0, display:'block' }}/>
                    <span style={{ fontSize:'13.5px', color:'var(--text-primary)', fontWeight:400 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section style={{ padding:'0 48px 80px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'56px' }}>
            <div style={{ textAlign:'center', marginBottom:'48px' }}>
              <SL>{a.valuesLabel}</SL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'14px' }}>{a.valuesTitle}</h2>
              <p style={{ fontSize:'15px', color:'var(--text-secondary)', maxWidth:'520px', margin:'0 auto', lineHeight:1.8, fontWeight:300 }}>{a.valuesText}</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
              {a.values.map((v,i) => {
                const icons = ['⭐','🤝','🔒','💡','👥','🏆']
                const descs = [
                  'Nous maintenons les plus hauts standards dans chaque opération.',
                  'Honnêteté et transparence dans toutes nos relations.',
                  'Vous pouvez compter sur nous à chaque étape.',
                  'Nous cherchons toujours à faire mieux.',
                  'Votre réussite est notre priorité absolue.',
                  'Nous visons l\'excellence dans tout ce que nous faisons.',
                ]
                return (
                  <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'14px', padding:'28px', transition:'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.background='var(--bg-card-hover)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-card)' }}
                  >
                    <div style={{ fontSize:'28px', marginBottom:'14px' }}>{icons[i]}</div>
                    <h3 style={{ fontSize:'16px', fontWeight:600, color:'var(--text-primary)', marginBottom:'8px' }}>{v}</h3>
                    <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{descs[i]}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding:'0 48px 80px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <SL>{a.whyLabel}</SL>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'40px' }}>{a.whyTitle}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
            {a.why.map((w,i) => (
              <div key={i} style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'14px', padding:'30px', transition:'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.transform='translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}
              >
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'48px', fontWeight:700, color:'var(--gold)', opacity:0.22, lineHeight:1, marginBottom:'16px' }}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <h3 style={{ fontSize:'15.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'9px' }}>{w.title}</h3>
                <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE / CTA ── */}
      <section style={{ padding:'0 48px 80px', background:'var(--bg-secondary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px' }}>
          <div style={{ background:'linear-gradient(135deg,var(--gold-bg),var(--bg-card))', border:'1px solid var(--border-gold)', borderRadius:'18px', padding:'44px' }}>
            <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.25, marginBottom:'16px' }}>
              Prêt à Connecter<br/>votre Business<br/><span style={{ color:'var(--gold)' }}>au Monde ?</span>
            </div>
            <p style={{ fontSize:'14.5px', color:'var(--text-secondary)', lineHeight:1.8, fontWeight:300, marginBottom:'28px' }}>
              Rejoignez les entreprises qui font confiance à IMEX HOLDING LTD pour leurs opérations commerciales et logistiques internationales.
            </p>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <button onClick={() => navigate('/contact')}
                style={{ background:'var(--gold)', color:'#070E1A', padding:'13px 28px', borderRadius:'9px', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--gold-light)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--gold)'}
              >Nous Contacter</button>
              <button onClick={() => navigate('/services')}
                style={{ background:'transparent', color:'var(--gold)', padding:'13px 28px', borderRadius:'9px', fontWeight:500, fontSize:'14px', border:'1px solid var(--border-gold)', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--gold-bg)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
              >Nos Services</button>
            </div>
          </div>
          <div style={{ display:'grid', gap:'14px' }}>
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'14px', padding:'24px' }}>
              <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'10px' }}>Siège Social</div>
              <div style={{ fontSize:'15px', color:'var(--text-primary)', fontWeight:500 }}>Banjul, The Gambia</div>
              <div style={{ fontSize:'13.5px', color:'var(--text-secondary)', marginTop:'4px', fontWeight:300 }}>West Africa</div>
            </div>
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'14px', padding:'24px' }}>
              <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'10px' }}>Contact Direct</div>
              <div style={{ fontSize:'15px', color:'var(--text-primary)', fontWeight:500 }}>+220 559 1066</div>
              <div style={{ fontSize:'13.5px', color:'var(--text-secondary)', marginTop:'4px', fontWeight:300 }}>imexholding1@gmail.com</div>
            </div>
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'14px', padding:'24px' }}>
              <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'10px' }}>Zones de Couverture</div>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'4px' }}>
                {a.regions.map(r => (
                  <span key={r} style={{ background:'var(--gold-bg)', border:'1px solid var(--border-gold)', color:'var(--gold)', fontSize:'12px', padding:'4px 12px', borderRadius:'20px' }}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}