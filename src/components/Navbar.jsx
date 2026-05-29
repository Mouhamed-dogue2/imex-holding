// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../i18n/index.jsx'

const LANGS = [
  { code:'en', label:'English',  flag:'🇬🇧' },
  { code:'fr', label:'Français', flag:'🇫🇷' },
  { code:'es', label:'Español',  flag:'🇪🇸' },
]

export default function Navbar() {
  const { lang, setLang, t, dark, setDark } = useTranslation()
  const [scrolled,   setScrolled]   = useState(false)
  const [langOpen,   setLangOpen]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const langRef  = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = e => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const navLinks = [
    { to:'/',          label:t.nav.home },
    { to:'/about',     label:t.nav.about },
    { to:'/services',  label:t.nav.services },
    { to:'/products',  label:t.nav.products },
    { to:'/logistics', label:t.nav.logistics },
  ]
  const cur = LANGS.find(l => l.code === lang) || LANGS[0]

  return (
    <header style={{ position:'sticky', top:0, zIndex:100 }}>

      {/* TOP BAR */}
      <div style={{
        background: dark
          ? 'linear-gradient(90deg,#020509,#030812,#020509)'
          : 'linear-gradient(90deg,#E4EEFF,#EEF4FF,#E4EEFF)',
        borderBottom:`1px solid var(--border)`,
        padding:'5px 0',
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:'24px' }}>
            {[{icon:'📞',val:'+220 559 1066'},{icon:'✉️',val:'imexholding1@gmail.com'},{icon:'📍',val:'Banjul, The Gambia'}].map((item,i) => (
              <span key={i} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11.5px', color:'var(--text-muted)', fontWeight:300 }}>
                <span>{item.icon}</span><span>{item.val}</span>
              </span>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:'10.5px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>
              Connecting Markets · Delivering Excellence
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav style={{
        background:'var(--nav-bg)',
        backdropFilter:'blur(32px)',
        WebkitBackdropFilter:'blur(32px)',
        borderBottom:`1px solid var(--border-accent)`,
        boxShadow: scrolled ? (dark?'0 4px 40px rgba(0,0,0,0.7)':'0 4px 32px rgba(74,158,255,0.12)') : 'none',
        transition:'box-shadow 0.3s',
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px', height:'72px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px' }}>

          {/* LOGO */}
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, flexShrink:0 }}>
            <div style={{
              height:'52px', padding:'5px 12px',
              background:'rgba(255,255,255,0.97)',
              borderRadius:'12px',
              display:'flex', alignItems:'center',
              boxShadow: dark
                ? '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,158,255,0.20)'
                : '0 4px 16px rgba(74,158,255,0.15)',
              transition:'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow=dark?'0 8px 32px rgba(74,158,255,0.35)':'0 8px 24px rgba(74,158,255,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=dark?'0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,158,255,0.20)':'0 4px 16px rgba(74,158,255,0.15)' }}
            >
              <img src="/images/logo.png" alt="IMEX HOLDING LIMITED" style={{ height:'40px', width:'auto', objectFit:'contain', display:'block' }}/>
            </div>
          </button>

          {/* NAV LINKS */}
          <div className="desktop-nav" style={{
            display:'flex', alignItems:'center', gap:'2px', padding:'5px',
            background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(74,158,255,0.04)',
            borderRadius:'16px', border:`1px solid var(--border)`,
          }}>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to==='/'}
                style={({ isActive }) => ({
                  fontSize:'13.5px', padding:'8px 18px', borderRadius:'11px',
                  textDecoration:'none', letterSpacing:'0.2px', whiteSpace:'nowrap',
                  fontWeight: isActive ? 500 : 300,
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  background: isActive ? 'var(--gradient-btn)' : 'transparent',
                  border: isActive ? 'none' : '1px solid transparent',
                  boxShadow: isActive ? 'var(--shadow-accent)' : 'none',
                  transition:'all 0.25s ease',
                })}
                onMouseEnter={e => {
                  if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'var(--accent-bg)'
                  }
                }}
                onMouseLeave={e => {
                  if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >{label}</NavLink>
            ))}
          </div>

          {/* RIGHT */}
          <div className="desktop-right" style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>

            {/* TOGGLE */}
            <div onClick={() => setDark(!dark)} title={dark?'Light mode':'Dark mode'}
              style={{
                width:'62px', height:'34px', borderRadius:'17px', cursor:'pointer',
                background: dark
                  ? 'linear-gradient(135deg,#0a1628,#1a2d4a)'
                  : 'linear-gradient(135deg,#C8E0FF,#E8F5FF)',
                border:`1.5px solid ${dark?'rgba(74,158,255,0.4)':'rgba(74,158,255,0.35)'}`,
                position:'relative', transition:'all 0.4s ease',
                display:'flex', alignItems:'center', padding:'0 5px', flexShrink:0,
                boxShadow: dark?'0 2px 16px rgba(74,158,255,0.18), inset 0 1px 0 rgba(255,255,255,0.05)':'0 2px 12px rgba(74,158,255,0.15)',
              }}
            >
              {dark && [
                {w:3,h:3,t:7,l:9,o:0.7},
                {w:2,h:2,t:15,l:17,o:0.45},
                {w:2,h:2,t:8,l:22,o:0.55},
              ].map((s,i) => (
                <div key={i} style={{ position:'absolute', width:s.w, height:s.h, borderRadius:'50%', background:`rgba(255,255,255,${s.o})`, top:s.t, left:s.l }}/>
              ))}
              {!dark && <>
                <div style={{ position:'absolute', width:'22px', height:'8px', borderRadius:'4px', background:'rgba(255,255,255,0.85)', top:'5px', right:'6px' }}/>
                <div style={{ position:'absolute', width:'14px', height:'5px', borderRadius:'3px', background:'rgba(255,255,255,0.65)', top:'17px', right:'10px' }}/>
              </>}
              <div style={{
                width:'26px', height:'26px', borderRadius:'50%', flexShrink:0, zIndex:1,
                background: dark
                  ? 'radial-gradient(circle at 35% 35%,#E8DFC8,#A89060)'
                  : 'radial-gradient(circle at 35% 35%,#FFE860,#FFB800)',
                boxShadow: dark
                  ? 'inset -4px -3px 0 rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.5)'
                  : '0 2px 16px rgba(255,180,0,0.8), 0 0 0 3px rgba(255,220,0,0.2)',
                transition:'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                transform: dark ? 'translateX(28px)' : 'translateX(0px)',
              }}/>
            </div>

            {/* LANG */}
            <div style={{ position:'relative' }} ref={langRef}>
              <button onClick={() => setLangOpen(!langOpen)}
                style={{
                  display:'flex', alignItems:'center', gap:'7px', padding:'8px 14px', borderRadius:'12px',
                  background: langOpen ? 'var(--accent-bg)' : 'var(--bg-card)',
                  border:`1.5px solid ${langOpen ? 'var(--accent)' : 'var(--border-accent)'}`,
                  cursor:'pointer', transition:'all 0.2s', fontFamily:'Outfit,sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-bg)' }}
                onMouseLeave={e => { if (!langOpen) { e.currentTarget.style.borderColor='var(--border-accent)'; e.currentTarget.style.background='var(--bg-card)' }}}
              >
                <span style={{ fontSize:'18px', lineHeight:1 }}>{cur.flag}</span>
                <span style={{ fontSize:'12px', fontWeight:700, color:'var(--accent)', letterSpacing:'1px', textTransform:'uppercase' }}>{cur.code}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                  style={{ transition:'transform 0.25s', transform:langOpen?'rotate(180deg)':'none' }}>
                  <path d="M1 1l4 4 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {langOpen && (
                <div style={{
                  position:'absolute', right:0, top:'calc(100% + 12px)', width:'190px', borderRadius:'16px',
                  background: dark?'#060D1A':'#ffffff',
                  border:`1.5px solid var(--border-accent)`,
                  boxShadow: dark?'0 24px 64px rgba(0,0,0,0.7)':'0 16px 48px rgba(74,158,255,0.18)',
                  zIndex:200, animation:'fadeDown 0.18s ease', overflow:'hidden',
                }}>
                  <div style={{ position:'absolute', top:'-7px', right:'20px', width:'12px', height:'12px', background:dark?'#060D1A':'#ffffff', border:`1.5px solid var(--border-accent)`, borderBottom:'none', borderRight:'none', transform:'rotate(45deg)' }}/>
                  <div style={{ padding:'8px' }}>
                    {LANGS.map(l => (
                      <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false) }}
                        style={{
                          width:'100%', display:'flex', alignItems:'center', gap:'12px', padding:'11px 14px', borderRadius:'10px', border:'none', cursor:'pointer',
                          background: lang===l.code ? 'var(--accent-bg)' : 'transparent',
                          color: lang===l.code ? 'var(--accent)' : 'var(--text-secondary)',
                          fontFamily:'Outfit,sans-serif', fontSize:'14px', fontWeight:lang===l.code?600:300, textAlign:'left', transition:'background 0.15s', marginBottom:'2px',
                        }}
                        onMouseEnter={e => { if (lang!==l.code) e.currentTarget.style.background=dark?'rgba(255,255,255,0.05)':'rgba(74,158,255,0.06)' }}
                        onMouseLeave={e => { if (lang!==l.code) e.currentTarget.style.background='transparent' }}
                      >
                        <span style={{ fontSize:'22px', lineHeight:1 }}>{l.flag}</span>
                        <div>
                          <div style={{ lineHeight:1.3, color:lang===l.code?'var(--accent)':'var(--text-primary)' }}>{l.label}</div>
                          <div style={{ fontSize:'10px', color:'var(--text-muted)', letterSpacing:'1px' }}>{l.code.toUpperCase()}</div>
                        </div>
                        {lang===l.code && (
                          <div style={{ marginLeft:'auto', width:'20px', height:'20px', borderRadius:'50%', background:'var(--gradient-btn)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            <span style={{ fontSize:'11px', color:'#fff', fontWeight:800 }}>✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CONTACT BTN */}
            <button onClick={() => navigate('/contact')}
              style={{
                display:'flex', alignItems:'center', gap:'8px',
                background:'var(--gradient-btn)', backgroundSize:'200% 200%',
                color:'#ffffff', padding:'10px 24px', borderRadius:'12px',
                fontWeight:600, fontSize:'13.5px', border:'none', cursor:'pointer',
                fontFamily:'Outfit,sans-serif', letterSpacing:'0.3px',
                transition:'all 0.3s ease', flexShrink:0,
                boxShadow:'var(--shadow-accent)',
                animation:'gradMove 3s ease infinite',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(74,158,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-accent)' }}
            >
              {t.nav.contact}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* MOBILE */}
          <div className="mobile-cta" style={{ display:'none', alignItems:'center', gap:'8px' }}>
            <button onClick={() => navigate('/contact')}
              style={{ background:'var(--gradient-btn)', color:'#fff', padding:'9px 16px', borderRadius:'9px', fontWeight:600, fontSize:'13px', border:'none', cursor:'pointer', fontFamily:'Outfit,sans-serif' }}
            >{t.nav.contact}</button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background:'var(--accent-bg)', border:`1.5px solid var(--border-accent)`, borderRadius:'9px', cursor:'pointer', padding:'9px 10px', display:'flex', flexDirection:'column', gap:'4px', alignItems:'center' }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{ display:'block', width:'20px', height:'1.5px', background:'var(--accent)', borderRadius:'2px', transition:'all 0.3s',
                  transform:mobileOpen?(i===0?'translateY(5.5px) rotate(45deg)':i===2?'translateY(-5.5px) rotate(-45deg)':'none'):'none',
                  opacity:mobileOpen&&i===1?0:1 }}/>
              ))}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div style={{ maxHeight:mobileOpen?'520px':'0', overflow:'hidden', transition:'max-height 0.4s cubic-bezier(0.4,0,0.2,1)', borderTop:mobileOpen?`1px solid var(--border-accent)`:'none' }}>
          <div style={{ padding:'16px 20px 24px', display:'flex', flexDirection:'column', gap:'4px' }}>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to==='/'} onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding:'13px 16px', borderRadius:'10px', textDecoration:'none', fontSize:'15px',
                  fontWeight:isActive?500:300,
                  color:isActive?'#fff':'var(--text-secondary)',
                  background:isActive?'var(--gradient-btn)':'transparent',
                  border:isActive?'none':'1px solid transparent',
                })}
              >{label}</NavLink>
            ))}
            <div style={{ display:'flex', gap:'8px', marginTop:'12px', paddingTop:'14px', borderTop:`1px solid var(--border)`, flexWrap:'wrap', alignItems:'center' }}>
              {LANGS.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 12px', borderRadius:'8px', border:`1px solid ${lang===l.code?'var(--accent)':'var(--border)'}`, background:lang===l.code?'var(--accent-bg)':'transparent', color:lang===l.code?'var(--accent)':'var(--text-secondary)', fontFamily:'Outfit,sans-serif', fontSize:'12.5px', fontWeight:lang===l.code?600:300, cursor:'pointer' }}
                ><span style={{ fontSize:'15px' }}>{l.flag}</span>{l.code.toUpperCase()}</button>
              ))}
              <div onClick={() => setDark(!dark)}
                style={{ width:'52px', height:'28px', borderRadius:'14px', cursor:'pointer', background:dark?'linear-gradient(135deg,#0a1628,#1a2d4a)':'linear-gradient(135deg,#C8E0FF,#E8F5FF)', border:`1.5px solid var(--border-accent)`, position:'relative', display:'flex', alignItems:'center', padding:'0 3px' }}
              >
                <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:dark?'radial-gradient(circle at 35% 35%,#E8DFC8,#A89060)':'radial-gradient(circle at 35% 35%,#FFE860,#FFB800)', transition:'transform 0.4s cubic-bezier(0.4,0,0.2,1)', transform:dark?'translateX(24px)':'translateX(0px)', boxShadow:dark?'inset -3px -2px 0 rgba(0,0,0,0.35)':'0 2px 10px rgba(255,180,0,0.7)', flexShrink:0, zIndex:1 }}/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}