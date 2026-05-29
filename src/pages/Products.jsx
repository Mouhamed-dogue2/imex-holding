// src/pages/Products.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

const SL = ({ children }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
    <div style={{ width:'28px', height:'1px', background:'var(--gold)' }}/>
    <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{children}</span>
  </div>
)

const TAG_C = {
  Premium:    { bg:'rgba(201,168,76,0.12)',  border:'rgba(201,168,76,0.3)',  color:'var(--gold)' },
  Food:       { bg:'rgba(52,211,153,0.1)',   border:'rgba(52,211,153,0.25)', color:'#34d399' },
  Precious:   { bg:'rgba(251,191,36,0.1)',   border:'rgba(251,191,36,0.25)', color:'#fbbf24' },
  Industrial: { bg:'rgba(148,163,184,0.1)',  border:'rgba(148,163,184,0.2)', color:'#94a3b8' },
}

const PROD_DETAILS = [
  { origin:'Afrique de l\'Ouest', season:'Avril – Juillet', quality:'Grade A / Grade B', volume:'Conteneurs FCL 20\'/40\'', icon:'🥜', bg:'rgba(201,168,76,0.06)' },
  { origin:'Asie & Afrique',       season:'Toute l\'année',  quality:'Long grain / Parboiled', volume:'Sacs de 50kg, Big Bags', icon:'🌾', bg:'rgba(52,211,153,0.06)' },
  { origin:'Malaisie, Sénégal',    season:'Toute l\'année',  quality:'Raffiné / Brut',         volume:'Bidons 1L–20L, IBC', icon:'🌻', bg:'rgba(251,191,36,0.06)' },
  { origin:'Afrique de l\'Ouest', season:'Toute l\'année',  quality:'999.9 / 22K / 18K',      volume:'Sur demande spécifique', icon:'🪙', bg:'rgba(255,215,0,0.06)' },
  { origin:'Afrique Centrale',     season:'Toute l\'année',  quality:'Gem / Industrial',       volume:'Sur demande spécifique', icon:'💎', bg:'rgba(147,197,253,0.06)' },
  { origin:'International',        season:'Toute l\'année',  quality:'Variable selon produit', volume:'Sur devis', icon:'🏭', bg:'rgba(148,163,184,0.06)' },
]

export default function Products() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  if (!t?.products) return null
  const p = t.products

  return (
    <div style={{ background:'var(--bg-primary)', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border-gold)', padding:'80px 48px 72px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(var(--hero-grid) 1px,transparent 1px),linear-gradient(90deg,var(--hero-grid) 1px,transparent 1px)', backgroundSize:'48px 48px' }}/>
        <div style={{ position:'absolute', left:0, bottom:0, width:'350px', height:'350px', background:'radial-gradient(circle,var(--gold-bg) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <SL>{p.label}</SL>
          <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'clamp(40px,5vw,62px)', fontWeight:700, color:'var(--text-primary)', lineHeight:1.08, maxWidth:'600px' }}>{p.title}</h1>
          <p style={{ fontSize:'16px', color:'var(--text-secondary)', marginTop:'18px', maxWidth:'560px', lineHeight:1.85, fontWeight:300 }}>{p.sub}</p>
          <div style={{ display:'flex', gap:'16px', marginTop:'32px', flexWrap:'wrap' }}>
            {['Premium','Food','Precious','Industrial'].map(tag => {
              const tc = TAG_C[tag]
              return (
                <span key={tag} style={{ background:tc.bg, border:`1px solid ${tc.border}`, color:tc.color, fontSize:'12px', padding:'6px 16px', borderRadius:'20px', fontWeight:500 }}>{tag}</span>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section style={{ padding:'80px 48px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px' }}>
          {p.items.map((item, i) => {
            const det = PROD_DETAILS[i]
            const tc = TAG_C[item.tag] || TAG_C.Industrial
            const isSel = selected === i
            return (
              <div key={i}
                onClick={() => setSelected(isSel ? null : i)}
                style={{
                  background: isSel ? det.bg : 'var(--bg-secondary)',
                  border:`1px solid ${isSel ? 'var(--border-gold)' : 'var(--border)'}`,
                  borderRadius:'18px', cursor:'pointer', transition:'all 0.3s',
                  overflow:'hidden', transform: isSel ? 'translateY(-4px)' : 'none',
                  boxShadow: isSel ? '0 20px 48px rgba(0,0,0,0.2)' : 'none',
                }}
                onMouseEnter={e => { if (!isSel) { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.transform='translateY(-4px)' }}}
                onMouseLeave={e => { if (!isSel) { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none' }}}
              >
                {/* Card header */}
                <div style={{ padding:'28px 28px 0' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                    <div style={{ width:'60px', height:'60px', borderRadius:'14px', background: isSel ? 'rgba(255,255,255,0.1)' : 'var(--gold-bg)', border:'1px solid var(--border-gold)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>
                      {det.icon}
                    </div>
                    <span style={{ background:tc.bg, border:`1px solid ${tc.border}`, color:tc.color, fontSize:'11px', padding:'5px 14px', borderRadius:'20px', fontWeight:500 }}>{item.tag}</span>
                  </div>
                  <div style={{ fontSize:'11px', letterSpacing:'2px', color:'var(--text-muted)', marginBottom:'8px', textTransform:'uppercase' }}>
                    {String(i+1).padStart(2,'0')} — {item.cat}
                  </div>
                  <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'26px', fontWeight:700, color:'var(--text-primary)', marginBottom:'10px' }}>{item.title}</h3>
                  <p style={{ fontSize:'13.5px', color:'var(--text-secondary)', lineHeight:1.75, fontWeight:300 }}>{item.desc}</p>
                </div>

                {/* Details panel */}
                <div style={{ maxHeight: isSel ? '300px' : '0', overflow:'hidden', transition:'max-height 0.4s ease' }}>
                  <div style={{ padding:'20px 28px 28px' }}>
                    <div style={{ borderTop:'1px solid var(--border)', paddingTop:'18px', display:'grid', gap:'10px' }}>
                      {[
                        { label:'Origine', val:det.origin },
                        { label:'Saisonnalité', val:det.season },
                        { label:'Qualité', val:det.quality },
                        { label:'Conditionnement', val:det.volume },
                      ].map((row,j) => (
                        <div key={j} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                          <span style={{ fontSize:'12px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1px' }}>{row.label}</span>
                          <span style={{ fontSize:'13px', color:'var(--text-primary)', fontWeight:500 }}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={e => { e.stopPropagation(); navigate('/contact') }}
                      style={{ marginTop:'16px', width:'100%', background:'var(--gold)', color:'#070E1A', padding:'11px', borderRadius:'8px', fontWeight:700, fontSize:'13.5px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif' }}>
                      Demander un Devis →
                    </button>
                  </div>
                </div>

                {/* Bottom indicator */}
                <div style={{ padding:'12px 28px', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'12px', color:'var(--text-muted)' }}>{isSel ? 'Réduire' : 'Voir les détails'}</span>
                  <span style={{ color:'var(--gold)', fontSize:'14px', transition:'transform 0.3s', transform: isSel ? 'rotate(180deg)' : 'none' }}>↓</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── QUALITÉ & STANDARDS ── */}
      <section style={{ padding:'0 48px 80px', background:'var(--bg-primary)' }}>
        <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
          <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-gold)', borderRadius:'20px', padding:'56px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'64px', alignItems:'center' }}>
            <div>
              <SL>Nos Standards</SL>
              <h2 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'38px', fontWeight:700, color:'var(--text-primary)', marginBottom:'18px', lineHeight:1.2 }}>Qualité & Conformité Internationale</h2>
              <p style={{ fontSize:'15px', color:'var(--text-secondary)', lineHeight:1.85, fontWeight:300, marginBottom:'28px' }}>
                Chaque produit que nous commercialisons est soumis à des contrôles qualité rigoureux. Nous travaillons exclusivement avec des fournisseurs certifiés et des partenaires de confiance dans le monde entier.
              </p>
              <div style={{ display:'grid', gap:'12px' }}>
                {[
                  '✓  Fournisseurs vérifiés et certifiés',
                  '✓  Contrôle qualité à chaque étape',
                  '✓  Documentation et traçabilité complètes',
                  '✓  Conformité aux normes internationales',
                  '✓  Assurance qualité en transit',
                ].map((q,i) => (
                  <div key={i} style={{ fontSize:'14px', color:'var(--text-secondary)', fontWeight:300, padding:'10px 16px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'8px' }}>{q}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'22px', fontWeight:700, color:'var(--text-primary)', marginBottom:'20px' }}>Disponibilité des Produits</h3>
              {p.items.map((item,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 0', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <span style={{ fontSize:'18px' }}>{PROD_DETAILS[i].icon}</span>
                    <span style={{ fontSize:'14px', color:'var(--text-primary)', fontWeight:400 }}>{item.title}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#34d399' }}/>
                    <span style={{ fontSize:'12px', color:'#34d399', fontWeight:500 }}>Disponible</span>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('/contact')}
                style={{ marginTop:'24px', width:'100%', background:'var(--gold)', color:'#070E1A', padding:'13px', borderRadius:'9px', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif', transition:'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--gold-light)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--gold)'}
              >
                Faire une Demande de Produit →
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}