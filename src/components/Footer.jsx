// src/components/Footer.jsx
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

export default function Footer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (!t?.footer) return null
  const f = t.footer

  return (
    <footer style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border-gold)', padding:'60px 48px 28px' }}>
      <div style={{ maxWidth:'1140px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'52px' }}>

          {/* Brand */}
          <div>
            <button onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:'12px', background:'none', border:'none', cursor:'pointer', marginBottom:'18px' }}>
              <div style={{ width:'42px', height:'42px', borderRadius:'9px', border:'1.5px solid var(--gold)', background:'var(--gold-bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'17px', fontWeight:700, color:'var(--gold)' }}>iH</span>
              </div>
              <div>
                <div style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'18px', fontWeight:600, color:'var(--text-primary)' }}>
                  <span style={{ color:'var(--gold)' }}>IMEX</span> HOLDING
                </div>
                <div style={{ fontSize:'8.5px', letterSpacing:'3px', color:'var(--text-muted)', textTransform:'uppercase' }}>Limited</div>
              </div>
            </button>
            <p style={{ fontSize:'13.5px', color:'var(--text-muted)', lineHeight:1.85, maxWidth:'260px', fontWeight:300 }}>{f.desc}</p>
            <div style={{ marginTop:'18px', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--gold)', fontWeight:500 }}>{f.tagline}</div>
            {/* Réseaux sociaux placeholder */}
            <div style={{ display:'flex', gap:'10px', marginTop:'20px' }}>
              {['LinkedIn','WhatsApp','Email'].map(s => (
                <button key={s} style={{ width:'36px', height:'36px', borderRadius:'8px', background:'var(--bg-card)', border:'1px solid var(--border)', color:'var(--text-muted)', fontSize:'12px', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.color='var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)' }}
                  title={s}
                >
                  {s === 'LinkedIn' ? '🔗' : s === 'WhatsApp' ? '💬' : '📧'}
                </button>
              ))}
            </div>
          </div>

          {/* Colonnes */}
          {[
            { title: f.company,     items: f.links1,  routes: ['/about','/about','/about','/about'] },
            { title: f.servicesCol, items: f.links2,  routes: ['/services','/services','/services','/logistics'] },
            { title: f.contactCol,  items: ['+220 559 1066','+220 796 5656','imexholding1@gmail.com','Banjul, The Gambia'], routes:['#','#','#','#'] },
          ].map((col, ci) => (
            <div key={ci}>
              <h4 style={{ fontSize:'11px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'18px', fontWeight:500 }}>{col.title}</h4>
              <ul style={{ listStyle:'none' }}>
                {col.items.map((item, ii) => (
                  <li key={ii} style={{ marginBottom:'11px' }}>
                    <button
                      onClick={() => col.routes[ii] !== '#' && navigate(col.routes[ii])}
                      style={{ background:'none', border:'none', cursor: col.routes[ii] !== '#' ? 'pointer' : 'default', fontSize:'13.5px', color:'var(--text-muted)', fontFamily:'Outfit,sans-serif', fontWeight:300, padding:0, textAlign:'left', transition:'color 0.2s' }}
                      onMouseEnter={e => { if (col.routes[ii] !== '#') e.currentTarget.style.color='var(--text-primary)' }}
                      onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
                    >{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop:'1px solid var(--border)', paddingTop:'22px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontSize:'12.5px', color:'var(--text-muted)' }}>© 2025 IMEX HOLDING LTD. {f.rights}</p>
          <span style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--text-muted)' }}>Banjul, The Gambia · West Africa</span>
        </div>
      </div>
    </footer>
  )
}