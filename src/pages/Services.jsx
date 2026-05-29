// src/pages/Services.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

const SL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--gold)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{children}</span>
  </div>
)

const SERVICES_EXTRA = [
  {
    details: ['Sourcing fournisseurs certifiés', 'Négociation & contrôle qualité', 'Documentation export complète', 'Couverture 50+ pays'],
    stat: '50+', statLabel: 'Pays couverts',
  },
  {
    details: ['Produits alimentaires & industriels', 'Sourcing direct producteurs', 'Prix compétitifs garantis', 'Livraison flexible'],
    stat: '100+', statLabel: 'Produits référencés',
  },
  {
    details: ['Représentation exclusive & non-exclusive', 'Distribution locale & régionale', 'Développement de marché', 'Partenariats stratégiques'],
    stat: '10+', statLabel: 'Marques représentées',
  },
  {
    details: ['Envois urgents door-to-door', 'Couverture mondiale', 'Tracking temps réel', 'Dédouanement inclus'],
    stat: '48h', statLabel: 'Délai express',
  },
  {
    details: ['FCL & LCL disponibles', 'Ports Afrique de l\'Ouest & monde', 'Tarifs compétitifs', 'Suivi en temps réel'],
    stat: '20+', statLabel: 'Ports desservis',
  },
  {
    details: ['Entrepôts sécurisés', 'Gestion inventaire digitale', 'Conditions optimales', 'Accès 24h/24'],
    stat: '5000m²', statLabel: 'Surface de stockage',
  },
  {
    details: ['Classification HS codes', 'Optimisation droits de douane', 'Dossiers complets', 'Conformité internationale'],
    stat: '100%', statLabel: 'Taux de conformité',
  },
  {
    details: ['Procurement stratégique', 'Coordination logistique', 'Contrôle des stocks', 'Livraison last-mile'],
    stat: '360°', statLabel: 'Couverture complète',
  },
]

export default function Services() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [active, setActive] = useState(null)
  if (!t?.services) return null
  const s = t.services

  return (
    <div style={{ background:'var(--bg-primary)', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border-gold)', padding:'80px 48px 72px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(var(--hero-grid) 1px,transparent 1px),linear-gradient(90deg,var(--hero-grid) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
        <div style={{ position:'absolute', right:0, top:0, width:'400px', height:'400px', background:'radial-gradient(circle,var(--gold-bg) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <SL>{s.label}</SL>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(40px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'600px' }}>{s.title}</h1>
          <p style={{ fontSize:'16px', color:'var(--text-secondary)', marginTop:'18px', maxWidth:'560px', lineHeight:1.85, fontWeight:300 }}>{s.sub}</p>
          <div style={{ display:'flex', gap:'32px', marginTop:'40px', paddingTop:'32px', borderTop:'1px solid var(--border)' }}>
            {[
              { val:'8', label:'Services Spécialisés' },
              { val:'50+', label:'Pays Couverts' },
              { val:'24/7', label:'Support Client' },
            ].map((st,i) => (
              <div key={i}>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'32px', fontWeight:700, color:'var(--gold)' }}>{st.val}</div>
                <div style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', marginTop:'3px' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'24px' }}>
            {s.items.map((svc, i) => {
              const ex = SERVICES_EXTRA[i]
              const isActive = active === i
              return (
                <div key={i}
                  onClick={() => setActive(isActive ? null : i)}
                  style={{
                    background: isActive ? 'var(--gold-bg)' : 'var(--bg-card)',
                    border:`1px solid ${isActive ? 'var(--border-gold)' : 'var(--border)'}`,
                    borderRadius:'16px', padding:'32px', cursor:'pointer',
                    transition:'all 0.3s', position:'relative', overflow:'hidden',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.background='var(--bg-card-hover)' }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-card)' }}}
                >
                  {/* Top accent */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,var(--gold),transparent)`, opacity: isActive ? 1 : 0, transition:'opacity 0.3s' }}/>

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'20px' }}>
                    <div style={{ display:'flex', gap:'16px', alignItems:'flex-start' }}>
                      <div style={{ width:'56px', height:'56px', borderRadius:'14px', border:'1px solid var(--border-gold)', background:'var(--gold-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', flexShrink:0 }}>
                        {svc.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize:'17px', fontWeight:600, color:'var(--text-primary)', marginBottom:'6px' }}>{svc.title}</h3>
                        <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.7, fontWeight:300 }}>{svc.desc}</p>
                      </div>
                    </div>
                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:'12px', transition:'transform 0.3s', transform: isActive ? 'rotate(45deg)' : 'none', color:'var(--gold)', fontSize:'16px' }}>+</div>
                  </div>

                  {/* Expanded */}
                  <div style={{ maxHeight: isActive ? '200px' : '0', overflow:'hidden', transition:'max-height 0.4s ease' }}>
                    <div style={{ paddingTop:'16px', borderTop:'1px solid var(--border)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'16px' }}>
                      {ex.details.map((d,j) => (
                        <div key={j} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'var(--text-secondary)', fontWeight:300 }}>
                          <span style={{ color:'var(--gold)', fontSize:'10px' }}>◆</span>{d}
                        </div>
                      ))}
                    </div>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', borderRadius:'8px', padding:'8px 16px' }}>
                      <span style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'22px', fontWeight:700, color:'var(--gold)' }}>{ex.stat}</span>
                      <span style={{ fontSize:'12px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1px' }}>{ex.statLabel}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section style={{ padding:'0 48px 80px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <SL>Notre Processus</SL>
          <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'48px' }}>Comment Nous Travaillons</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0', position:'relative' }}>
            {/* Ligne de connexion */}
            <div style={{ position:'absolute', top:'28px', left:'12.5%', right:'12.5%', height:'1px', background:'linear-gradient(90deg,var(--gold),rgba(201,168,76,0.2))', zIndex:0 }}/>
            {[
              { icon:'💬', num:'01', title:'Consultation', desc:'Analyse de vos besoins et définition de la stratégie optimale.' },
              { icon:'📋', num:'02', title:'Planification', desc:'Élaboration d\'un plan logistique complet et personnalisé.' },
              { icon:'⚡', num:'03', title:'Exécution', desc:'Mise en œuvre précise par notre équipe de spécialistes.' },
              { icon:'✅', num:'04', title:'Livraison', desc:'Livraison sécurisée avec suivi et documentation complète.' },
            ].map((step,i) => (
              <div key={i} style={{ textAlign:'center', padding:'0 20px', position:'relative', zIndex:1 }}>
                <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'var(--bg-secondary)', border:'2px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', margin:'0 auto 20px' }}>
                  {step.icon}
                </div>
                <div style={{ fontSize:'11px', letterSpacing:'2px', color:'var(--gold)', marginBottom:'8px', opacity:0.7 }}>{step.num}</div>
                <h3 style={{ fontSize:'15px', fontWeight:600, color:'var(--text-primary)', marginBottom:'10px' }}>{step.title}</h3>
                <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:1.65, fontWeight:300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS ── */}
      <section style={{ padding:'80px 48px', background:'var(--bg-secondary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>
          <div>
            <SL>Notre Avantage</SL>
            <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'40px', fontWeight:700, color:'var(--text-primary)', marginBottom:'20px', lineHeight:1.15 }}>Pourquoi Choisir IMEX HOLDING ?</h2>
            <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.85, fontWeight:300, marginBottom:'32px' }}>
              Avec plus d'une décennie d'expérience dans le commerce international et la logistique, nous offrons des solutions sur mesure qui répondent aux exigences les plus élevées du marché mondial.
            </p>
            <button onClick={() => navigate('/contact')}
              style={{ background:'var(--gold)', color:'#070E1A', padding:'13px 32px', borderRadius:'9px', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--gold-light)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.transform='none' }}
            >
              Obtenir un Devis Gratuit
            </button>
          </div>
          <div style={{ display:'grid', gap:'14px' }}>
            {[
              { icon:'🌍', title:'Réseau International', desc:'Présents sur 4 continents avec des partenaires locaux de confiance.' },
              { icon:'⚡', title:'Rapidité & Efficacité', desc:'Traitement rapide des demandes et respect strict des délais.' },
              { icon:'🔒', title:'Sécurité & Fiabilité', desc:'Vos marchandises sont protégées à chaque étape du transport.' },
              { icon:'💼', title:'Expertise Métier', desc:'Équipe spécialisée dans le commerce international depuis des années.' },
            ].map((item,i) => (
              <div key={i} style={{ display:'flex', gap:'16px', padding:'18px 20px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'12px', alignItems:'flex-start' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:'var(--gold-bg)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize:'14.5px', fontWeight:600, color:'var(--text-primary)', marginBottom:'4px' }}>{item.title}</h4>
                  <p style={{ fontSize:'13px', color:'var(--text-secondary)', fontWeight:300, lineHeight:1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}