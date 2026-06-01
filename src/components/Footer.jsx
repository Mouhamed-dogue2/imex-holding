import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../i18n/index.jsx'

export default function Footer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (!t?.footer) return null
  const f = t.footer

  return (
    <footer style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', padding:'60px 48px 28px' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'48px' }}>

          {/* ── BRAND ── */}
          <div>
            <button
              onClick={() => navigate('/')}
              style={{ background:'none', border:'none', cursor:'pointer', padding:0, marginBottom:'20px', display:'block' }}
            >
              <div
                style={{
                  height:'58px',
                  padding:'7px 16px',
                  background:'#FFFFFF',
                  borderRadius:'10px',
                  display:'inline-flex',
                  alignItems:'center',
                  justifyContent:'center',
                  minWidth:'160px',
                  boxShadow:'0 2px 16px rgba(0,0,0,0.14)',
                  transition:'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.22)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.14)'
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="IMEX HOLDING LIMITED"
                  style={{
                    height:'44px',
                    width:'auto',
                    objectFit:'contain',
                    display:'block',
                    maxWidth:'180px',
                  }}
                />
              </div>
            </button>

            <p style={{ fontSize:'13.5px', color:'var(--text-muted)', lineHeight:1.85, maxWidth:'260px', fontWeight:300, marginBottom:'16px' }}>
              {f.desc}
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'28px', height:'1px', background:'var(--accent)' }}/>
              <span style={{ fontSize:'10.5px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>
                {f.tagline}
              </span>
            </div>
          </div>

          {/* ── COLUMNS ── */}
          {[
            { title:f.company,     items:f.links1,  routes:['/about','/about','/about','/about'] },
            { title:f.servicesCol, items:f.links2,  routes:['/services','/services','/services','/logistics'] },
            { title:f.contactCol,  items:['+220 559 1066','+220 796 5656','imexholding1@gmail.com','Banjul, The Gambia'], routes:['#','#','#','#'] },
          ].map((col,ci) => (
            <div key={ci}>
              <h4 style={{
                fontSize:'10.5px', letterSpacing:'2.5px',
                textTransform:'uppercase', color:'var(--text-muted)',
                marginBottom:'18px', fontWeight:500,
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle:'none' }}>
                {col.items.map((item,ii) => (
                  <li key={ii} style={{ marginBottom:'11px' }}>
                    <button
                      onClick={() => col.routes[ii] !== '#' && navigate(col.routes[ii])}
                      style={{
                        background:'none', border:'none',
                        cursor: col.routes[ii] !== '#' ? 'pointer' : 'default',
                        fontSize:'13.5px', color:'var(--text-muted)',
                        fontFamily:'Inter,sans-serif', fontWeight:300,
                        padding:0, textAlign:'left', transition:'color 0.2s',
                      }}
                      onMouseEnter={e => { if(col.routes[ii]!=='#') e.currentTarget.style.color='var(--text-primary)' }}
                      onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          borderTop:'1px solid var(--border)', paddingTop:'20px',
          display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:'12px',
        }}>
          <p style={{ fontSize:'12.5px', color:'var(--text-muted)' }}>
            © 2025 IMEX HOLDING LTD. {f.rights}
          </p>
          <span style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--text-muted)' }}>
            Banjul, The Gambia · West Africa
          </span>
        </div>
      </div>
    </footer>
  )
}