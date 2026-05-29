// src/components/Footer.jsx
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

export default function Footer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (!t?.footer) return null
  const f = t.footer

  return (
    <footer style={{ background:'var(--bg-primary)', borderTop:`1px solid var(--border-accent)`, padding:'60px 48px 28px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', width:'500px', height:'300px', background:'radial-gradient(ellipse,rgba(74,158,255,0.05) 0%,transparent 70%)', bottom:0, left:'50%', transform:'translateX(-50%)', pointerEvents:'none' }}/>
      <div style={{ maxWidth:'1140px', margin:'0 auto', position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'52px' }}>
          <div>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, marginBottom:'20px', display:'block' }}>
              <div style={{ height:'52px', padding:'5px 12px', background:'rgba(255,255,255,0.97)', borderRadius:'12px', display:'inline-flex', alignItems:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.2)', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(74,158,255,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.2)' }}
              >
                <img src="/images/logo.png" alt="IMEX HOLDING" style={{ height:'40px', width:'auto', objectFit:'contain' }}/>
              </div>
            </button>
            <p style={{ fontSize:'13.5px', color:'var(--text-muted)', lineHeight:1.85, maxWidth:'260px', fontWeight:300 }}>{f.desc}</p>
            <div style={{ marginTop:'16px', display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'32px', height:'2px', background:'var(--gradient-btn)', borderRadius:'1px' }}/>
              <span style={{ fontSize:'10.5px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>{f.tagline}</span>
            </div>
            <div style={{ display:'flex', gap:'10px', marginTop:'20px' }}>
              {[
                { label:'LinkedIn', icon:'🔗', href:'#' },
                { label:'WhatsApp', icon:'💬', href:'https://wa.me/2205591066' },
                { label:'Email', icon:'✉️', href:'mailto:imexholding1@gmail.com' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width:'38px', height:'38px', borderRadius:'10px', background:'var(--bg-card)', border:`1px solid var(--border)`, color:'var(--text-muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', textDecoration:'none', transition:'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)'; e.currentTarget.style.transform='translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-card)'; e.currentTarget.style.transform='none' }}
                  title={s.label}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {[
            { title:f.company,     items:f.links1,  routes:['/about','/about','/about','/about'] },
            { title:f.servicesCol, items:f.links2,  routes:['/services','/services','/services','/logistics'] },
            { title:f.contactCol,  items:['+220 559 1066','+220 796 5656','imexholding1@gmail.com','Banjul, The Gambia'], routes:['#','#','#','#'] },
          ].map((col,ci) => (
            <div key={ci}>
              <h4 style={{ fontSize:'11px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'20px', fontWeight:500 }}>{col.title}</h4>
              <ul style={{ listStyle:'none' }}>
                {col.items.map((item,ii) => (
                  <li key={ii} style={{ marginBottom:'12px' }}>
                    <button onClick={() => col.routes[ii]!=='#' && navigate(col.routes[ii])}
                      style={{ background:'none', border:'none', cursor:col.routes[ii]!=='#'?'pointer':'default', fontSize:'13.5px', color:'var(--text-muted)', fontFamily:'Outfit,sans-serif', fontWeight:300, padding:0, textAlign:'left', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'6px' }}
                      onMouseEnter={e => { if(col.routes[ii]!=='#') { e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.paddingLeft='6px' }}}
                      onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.paddingLeft='0' }}
                    >{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid var(--border)`, paddingTop:'22px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontSize:'12.5px', color:'var(--text-muted)' }}>© 2025 IMEX HOLDING LTD. {f.rights}</p>
          <span style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--text-muted)' }}>Banjul, The Gambia · West Africa</span>
        </div>
      </div>
    </footer>
  )
}