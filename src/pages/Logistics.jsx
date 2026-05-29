// src/pages/Logistics.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

const SL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--gold)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{children}</span>
  </div>
)

const LOG_EXTRA = [
  { color:'#f59e0b', coverage:'Gambie, Sénégal, Guinée-Bissau, Mali', capacity:'Camions 5T à 40T', delay:'24–72h',     certif:'Assurance transport incluse' },
  { color:'#3b82f6', coverage:'Europe, Asie, Amériques, Afrique',     capacity:'FCL 20\' / 40\' / 40\'HC', delay:'15–45 jours', certif:'Bill of Lading fourni' },
  { color:'#8b5cf6', coverage:'Monde entier – 200+ destinations',      capacity:'50kg à 15 tonnes',       delay:'24–96h',     certif:'Airway Bill fourni' },
  { color:'#10b981', coverage:'Banjul & région Afrique de l\'Ouest',   capacity:'Jusqu\'à 5000 m²',       delay:'Immédiat',   certif:'Inventaire digitalisé' },
  { color:'#ef4444', coverage:'Tous ports & aéroports',                capacity:'Tous types de marchandises', delay:'48–72h', certif:'Agréé autorités douanières' },
  { color:'#06b6d4', coverage:'Monde entier',                          capacity:'Tout type de cargo',     delay:'Temps réel', certif:'GPS & IoT intégré' },
]

export default function Logistics() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  if (!t?.logistics) return null
  const l = t.logistics

  return (
    <div style={{ background:'var(--bg-primary)', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border-gold)', padding:'80px 48px 72px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(var(--hero-grid) 1px,transparent 1px),linear-gradient(90deg,var(--hero-grid) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <SL>{l.label}</SL>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(40px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'640px' }}>{l.title}</h1>
          <p style={{ fontSize:'16px', color:'var(--text-secondary)', marginTop:'18px', maxWidth:'560px', lineHeight:1.85, fontWeight:300 }}>{l.sub}</p>
          {/* KPIs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginTop:'48px' }}>
            {[
              { val:'50+', label:'Pays desservis', icon:'🌍' },
              { val:'24/7', label:'Support opérationnel', icon:'📞' },
              { val:'100%', label:'Conformité douanière', icon:'✅' },
              { val:'<48h', label:'Délai de traitement', icon:'⚡' },
            ].map((kpi,i) => (
              <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border-gold)', borderRadius:'14px', padding:'22px 20px', display:'flex', alignItems:'center', gap:'14px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:'var(--gold-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>{kpi.icon}</div>
                <div>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'24px', fontWeight:700, color:'var(--gold)' }}>{kpi.val}</div>
                  <div style={{ fontSize:'11px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1px', marginTop:'2px' }}>{kpi.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODES DE TRANSPORT — Tabs ── */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <SL>Modes de Transport</SL>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'40px' }}>Nos Solutions Logistiques</h2>

          {/* Tab buttons */}
          <div style={{ display:'flex', gap:'10px', marginBottom:'36px', flexWrap:'wrap' }}>
            {l.items.map((item,i) => (
              <button key={i} onClick={() => setTab(i)}
                style={{
                  display:'flex', alignItems:'center', gap:'8px',
                  padding:'10px 20px', borderRadius:'10px', border:'1px solid',
                  borderColor: tab===i ? 'var(--gold)' : 'var(--border)',
                  background: tab===i ? 'var(--gold-bg)' : 'var(--bg-card)',
                  color: tab===i ? 'var(--gold)' : 'var(--text-secondary)',
                  fontSize:'13.5px', fontWeight: tab===i ? 600 : 300,
                  cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s',
                }}
              >
                <span>{item.icon}</span> {item.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {l.items[tab] && (() => {
            const item = l.items[tab]
            const ex = LOG_EXTRA[tab]
            return (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'start' }}>
                <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'18px', padding:'40px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'24px' }}>
                    <div style={{ width:'64px', height:'64px', borderRadius:'16px', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'28px', fontWeight:700, color:'var(--text-primary)' }}>{item.title}</h3>
                      <p style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'3px' }}>{item.desc}</p>
                    </div>
                  </div>
                  <div style={{ display:'grid', gap:'12px' }}>
                    {[
                      { label:'Couverture', val:ex.coverage },
                      { label:'Capacité', val:ex.capacity },
                      { label:'Délai moyen', val:ex.delay },
                      { label:'Certification', val:ex.certif },
                    ].map((row,j) => (
                      <div key={j} style={{ display:'flex', gap:'16px', padding:'12px 16px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'10px', alignItems:'flex-start' }}>
                        <span style={{ fontSize:'11px', textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', fontWeight:500, minWidth:'100px', marginTop:'2px' }}>{row.label}</span>
                        <span style={{ fontSize:'13.5px', color:'var(--text-primary)', fontWeight:400, flex:1 }}>{row.val}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/contact')}
                    style={{ marginTop:'24px', width:'100%', background:'var(--gold)', color:'#070E1A', padding:'13px', borderRadius:'9px', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background='var(--gold-light)'}
                    onMouseLeave={e => e.currentTarget.style.background='var(--gold)'}
                  >
                    Demander ce Service →
                  </button>
                </div>

                <div style={{ display:'grid', gap:'14px' }}>
                  <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'14px', padding:'28px' }}>
                    <h4 style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)', marginBottom:'16px', textTransform:'uppercase', letterSpacing:'1px' }}>Inclus dans ce service</h4>
                    {[
                      'Prise en charge et emballage',
                      'Documentation complète',
                      'Suivi en temps réel',
                      'Assurance transport',
                      'Support dédié',
                    ].map((f,j) => (
                      <div key={j} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 0', borderBottom: j<4 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', color:'var(--gold)', flexShrink:0 }}>✓</div>
                        <span style={{ fontSize:'13.5px', color:'var(--text-secondary)', fontWeight:300 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:'var(--gold-bg)', border:'1px solid var(--border-gold)', borderRadius:'14px', padding:'24px' }}>
                    <div style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px' }}>Délai de réponse</div>
                    <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'36px', fontWeight:700, color:'var(--text-primary)' }}>{ex.delay}</div>
                    <p style={{ fontSize:'13px', color:'var(--text-secondary)', marginTop:'6px', fontWeight:300 }}>Après réception de votre demande</p>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding:'0 48px 80px', background:'var(--bg-secondary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <SL>Processus End-to-End</SL>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'48px' }}>De l'Origine à la Destination</h2>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:'27px', top:'28px', bottom:'28px', width:'1px', background:'linear-gradient(to bottom,var(--gold),rgba(201,168,76,0.1))', zIndex:0 }}/>
            {[
              { icon:'📞', step:'01', title:'Consultation & Devis',     desc:'Analyse de vos besoins, sélection du mode de transport optimal et établissement d\'un devis détaillé sous 24h.' },
              { icon:'📋', step:'02', title:'Documentation',            desc:'Préparation de tous les documents nécessaires : factures, liste de colisage, certificats d\'origine, certificats sanitaires.' },
              { icon:'📦', step:'03', title:'Collecte & Inspection',    desc:'Enlèvement de votre cargo à la source, vérification de l\'emballage et inspection qualité avant expédition.' },
              { icon:'🚀', step:'04', title:'Expédition',               desc:'Acheminement par le mode choisi avec activation du système de tracking et notification à chaque étape clé.' },
              { icon:'🛃', step:'05', title:'Dédouanement',             desc:'Gestion complète des formalités douanières à l\'import et à l\'export pour un transit sans blocage.' },
              { icon:'✅', step:'06', title:'Livraison & Confirmation', desc:'Livraison à destination avec signature du destinataire, rapport de livraison et archivage de tous les documents.' },
            ].map((step,i) => (
              <div key={i} style={{ display:'flex', gap:'28px', marginBottom:'28px', position:'relative', zIndex:1 }}>
                <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'var(--bg-primary)', border:'2px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>
                  {step.icon}
                </div>
                <div style={{ flex:1, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px 24px', display:'flex', gap:'20px', alignItems:'flex-start' }}>
                  <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--gold)', opacity:0.25, lineHeight:1, flexShrink:0 }}>{step.step}</div>
                  <div>
                    <h3 style={{ fontSize:'15.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'6px' }}>{step.title}</h3>
                    <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', textAlign:'center', background:'linear-gradient(135deg,var(--gold-bg),rgba(79,195,247,0.04))', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'64px 52px' }}>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'38px', fontWeight:700, color:'var(--text-primary)', marginBottom:'14px' }}>Besoin d'une Solution Logistique ?</h2>
          <p style={{ fontSize:'15px', color:'var(--text-secondary)', marginBottom:'32px', fontWeight:300, lineHeight:1.8 }}>
            Notre équipe est disponible 24h/24 pour vous aider à planifier et exécuter votre logistique internationale.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/contact')}
              style={{ background:'var(--gold)', color:'#070E1A', padding:'14px 36px', borderRadius:'9px', fontWeight:700, fontSize:'14.5px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--gold-light)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.transform='none' }}
            >
              Obtenir un Devis Gratuit
            </button>
            <a href="https://wa.me/2205591066" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', gap:'10px', background:'rgba(37,211,102,0.1)', color:'#25D366', padding:'14px 28px', borderRadius:'9px', fontWeight:600, fontSize:'14px', border:'1px solid rgba(37,211,102,0.3)', cursor:'pointer', fontFamily:'Outfit,sans-serif', textDecoration:'none', transition:'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(37,211,102,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(37,211,102,0.1)'}
            >
              💬 WhatsApp Direct
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}