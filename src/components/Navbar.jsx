// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../i18n/index.jsx'

const LANGS = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'es', label: 'Español',  flag: '🇪🇸' },
]

export default function Navbar() {
  const { lang, setLang, t, dark, setDark } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const langRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const navLinks = [
    { to: '/',          label: t.nav.home },
    { to: '/about',     label: t.nav.about },
    { to: '/services',  label: t.nav.services },
    { to: '/products',  label: t.nav.products },
    { to: '/logistics', label: t.nav.logistics },
  ]

  const cur = LANGS.find(l => l.code === lang)

  return (
    <header style={{ position:'sticky', top:0, zIndex:100 }}>

      {/* ── TOP BAR ── */}
      <div style={{
        background: dark
          ? 'linear-gradient(90deg,#050B15,#0a1628,#050B15)'
          : 'linear-gradient(90deg,#f0ebe0,#faf8f4,#f0ebe0)',
        borderBottom:`1px solid ${dark ? 'rgba(201,168,76,0.12)' : 'rgba(160,120,40,0.12)'}`,
        padding:'6px 0',
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'28px' }}>
            {[
              { icon:'📞', val:'+220 559 1066' },
              { icon:'📧', val:'imexholding1@gmail.com' },
              { icon:'📍', val:'Banjul, The Gambia' },
            ].map((item,i) => (
              <span key={i} style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'11.5px', color:'var(--text-muted)', fontWeight:300, letterSpacing:'0.2px' }}>
                <span style={{ fontSize:'11px' }}>{item.icon}</span>{item.val}
              </span>
            ))}
          </div>
          <span style={{ fontSize:'10.5px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--gold)', fontWeight:600, opacity:0.85 }}>
            Connecting Markets · Delivering Excellence
          </span>
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <nav style={{
        background: scrolled
          ? (dark ? 'rgba(5,11,21,0.97)' : 'rgba(250,248,244,0.97)')
          : (dark ? 'rgba(7,14,26,0.95)' : 'rgba(250,248,244,0.95)'),
        backdropFilter:'blur(32px)',
        WebkitBackdropFilter:'blur(32px)',
        borderBottom:'1px solid var(--border-gold)',
        transition:'all 0.3s ease',
        boxShadow: scrolled ? (dark ? '0 8px 48px rgba(0,0,0,0.4)' : '0 8px 48px rgba(0,0,0,0.08)') : 'none',
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px', height:'72px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* ═══ LOGO ═══ */}
          <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'14px', padding:0 }}>
            <div style={{
              width:'46px', height:'46px', borderRadius:'12px',
              background:`linear-gradient(135deg,${dark?'#0d1e35':'#f5f0e8'},${dark?'#1a3a5c':'#e8dcc8'})`,
              border:'1.5px solid var(--gold)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:`0 4px 16px ${dark?'rgba(201,168,76,0.2)':'rgba(160,120,40,0.15)'}`,
              position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(201,168,76,0.12),transparent)', borderRadius:'11px' }}/>
              <span style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'19px', fontWeight:700, color:'var(--gold)', lineHeight:1, position:'relative', zIndex:1, letterSpacing:'-0.5px' }}>iH</span>
            </div>
            <div>
              <div style={{ display:'flex', alignItems:'baseline', gap:'5px', lineHeight:1 }}>
                <span style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'21px', fontWeight:700, color:'var(--gold)', letterSpacing:'1px' }}>IMEX</span>
                <span style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'21px', fontWeight:300, color:'var(--text-primary)', letterSpacing:'1px' }}>HOLDING</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'3px' }}>
                <div style={{ width:'16px', height:'1px', background:'var(--gold)', opacity:0.5 }}/>
                <span style={{ fontSize:'8px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--text-muted)', fontWeight:400 }}>LIMITED</span>
                <div style={{ width:'16px', height:'1px', background:'var(--gold)', opacity:0.5 }}/>
              </div>
            </div>
          </button>

          {/* ═══ NAV LINKS ═══ */}
          <div style={{ display:'flex', alignItems:'center', position:'relative' }}>
            {/* Fond pill qui glisse */}
            <div style={{ display:'flex', alignItems:'center', gap:'2px', padding:'4px', background: dark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)', borderRadius:'14px', border:'1px solid var(--border)' }}>
              {navLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === '/'}
                  style={({ isActive }) => ({
                    fontSize:'13.5px', padding:'8px 18px', borderRadius:'10px',
                    textDecoration:'none', fontWeight: isActive ? 500 : 300,
                    color: isActive ? (dark?'#fff':'#0D1520') : 'var(--text-secondary)',
                    background: isActive ? (dark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.07)') : 'transparent',
                    border: isActive ? '1px solid var(--border-gold)' : '1px solid transparent',
                    transition:'all 0.22s ease', letterSpacing:'0.2px',
                    whiteSpace:'nowrap',
                  })}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => {
                    if (e.currentTarget.getAttribute('aria-current') !== 'page')
                      e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >{label}</NavLink>
              ))}
            </div>
          </div>

          {/* ═══ CONTRÔLES DROITE ═══ */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>

            {/* ── TOGGLE DARK/LIGHT ── */}
            <div
              onClick={() => setDark(!dark)}
              title={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              style={{
                width:'56px', height:'30px', borderRadius:'15px', cursor:'pointer',
                background: dark
                  ? 'linear-gradient(90deg,#1a2d50,#0d1e35)'
                  : 'linear-gradient(90deg,#b8cfe8,#d4e8f8)',
                border:`1.5px solid ${dark?'rgba(201,168,76,0.35)':'rgba(100,150,200,0.4)'}`,
                position:'relative', transition:'all 0.35s ease',
                boxShadow: dark ? '0 2px 12px rgba(201,168,76,0.15)' : '0 2px 12px rgba(100,150,200,0.2)',
                display:'flex', alignItems:'center',
                padding:'0 3px',
              }}
            >
              {/* Étoiles (dark) */}
              {dark && <>
                <div style={{ position:'absolute', width:'3px', height:'3px', borderRadius:'50%', background:'rgba(255,255,255,0.6)', top:'6px', left:'8px' }}/>
                <div style={{ position:'absolute', width:'2px', height:'2px', borderRadius:'50%', background:'rgba(255,255,255,0.4)', top:'12px', left:'14px' }}/>
                <div style={{ position:'absolute', width:'2px', height:'2px', borderRadius:'50%', background:'rgba(255,255,255,0.5)', top:'7px', left:'18px' }}/>
              </>}
              {/* Nuages (light) */}
              {!dark && <>
                <div style={{ position:'absolute', width:'16px', height:'6px', borderRadius:'3px', background:'rgba(255,255,255,0.7)', top:'6px', right:'8px' }}/>
                <div style={{ position:'absolute', width:'10px', height:'4px', borderRadius:'2px', background:'rgba(255,255,255,0.5)', top:'14px', right:'14px' }}/>
              </>}
              {/* Thumb soleil/lune */}
              <div style={{
                width:'22px', height:'22px', borderRadius:'50%',
                background: dark
                  ? 'linear-gradient(135deg,#e8e0d0,#c8b89a)'
                  : 'linear-gradient(135deg,#ffd700,#ffb800)',
                boxShadow: dark
                  ? 'inset -3px -2px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(200,184,154,0.4)'
                  : '0 2px 12px rgba(255,180,0,0.6)',
                transition:'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                transform: dark ? 'translateX(26px)' : 'translateX(0px)',
                position:'relative', zIndex:1, flexShrink:0,
              }}/>
            </div>

            {/* ── LANG DROPDOWN ── */}
            <div style={{ position:'relative' }} ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display:'flex', alignItems:'center', gap:'8px',
                  padding:'8px 14px', borderRadius:'12px',
                  background: langOpen
                    ? (dark?'rgba(201,168,76,0.12)':'rgba(160,120,40,0.1)')
                    : (dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.04)'),
                  border:`1px solid ${langOpen ? 'var(--gold)' : 'var(--border-gold)'}`,
                  cursor:'pointer', transition:'all 0.2s ease',
                  fontFamily:'Outfit,sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.background=dark?'rgba(201,168,76,0.1)':'rgba(160,120,40,0.08)' }}
                onMouseLeave={e => { if (!langOpen) { e.currentTarget.style.borderColor='var(--border-gold)'; e.currentTarget.style.background=dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.04)' }}}
              >
                <span style={{ fontSize:'18px', lineHeight:1 }}>{cur.flag}</span>
                <span style={{ fontSize:'12px', fontWeight:600, color:'var(--gold)', letterSpacing:'1px', textTransform:'uppercase' }}>{cur.code}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                  style={{ transition:'transform 0.25s', transform:langOpen?'rotate(180deg)':'none' }}>
                  <path d="M1 1l4 4 4-4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Menu déroulant */}
              {langOpen && (
                <div style={{
                  position:'absolute', right:0, top:'calc(100% + 12px)',
                  width:'180px', borderRadius:'16px', overflow:'hidden',
                  background: dark?'#0C1525':'#ffffff',
                  border:'1px solid var(--border-gold)',
                  boxShadow: dark?'0 24px 64px rgba(0,0,0,0.5)':'0 24px 64px rgba(0,0,0,0.12)',
                  zIndex:200, animation:'fadeDown 0.18s ease',
                }}>
                  <style>{`@keyframes fadeDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
                  {/* Petite flèche */}
                  <div style={{ position:'absolute', top:'-7px', right:'24px', width:'13px', height:'13px', background:dark?'#0C1525':'#ffffff', border:'1px solid var(--border-gold)', borderBottom:'none', borderRight:'none', transform:'rotate(45deg)' }}/>

                  <div style={{ padding:'8px' }}>
                    {LANGS.map((l) => (
                      <button key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        style={{
                          width:'100%', display:'flex', alignItems:'center', gap:'12px',
                          padding:'11px 14px', borderRadius:'10px',
                          background: lang===l.code ? (dark?'rgba(201,168,76,0.14)':'rgba(160,120,40,0.1)') : 'transparent',
                          color: lang===l.code ? 'var(--gold)' : 'var(--text-secondary)',
                          border:'none', cursor:'pointer',
                          fontFamily:'Outfit,sans-serif', fontSize:'14px',
                          fontWeight: lang===l.code ? 600 : 300,
                          textAlign:'left', transition:'background 0.15s',
                          marginBottom:'2px',
                        }}
                        onMouseEnter={e => { if (lang!==l.code) e.currentTarget.style.background=dark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.05)' }}
                        onMouseLeave={e => { if (lang!==l.code) e.currentTarget.style.background='transparent' }}
                      >
                        <span style={{ fontSize:'22px', lineHeight:1 }}>{l.flag}</span>
                        <div>
                          <div style={{ lineHeight:1.2 }}>{l.label}</div>
                          <div style={{ fontSize:'10px', opacity:0.45, letterSpacing:'1px', marginTop:'1px' }}>{l.code.toUpperCase()}</div>
                        </div>
                        {lang===l.code && (
                          <div style={{ marginLeft:'auto', width:'20px', height:'20px', borderRadius:'50%', background:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                            <span style={{ fontSize:'11px', color:dark?'#070E1A':'#fff', fontWeight:800 }}>✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── BOUTON CONTACT ── */}
            <button
              onClick={() => navigate('/contact')}
              style={{
                position:'relative', overflow:'hidden',
                display:'flex', alignItems:'center', gap:'8px',
                background:'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)',
                backgroundSize:'200% 100%',
                color:'#07100A',
                padding:'10px 24px', borderRadius:'12px',
                fontWeight:700, fontSize:'13.5px',
                border:'none', cursor:'pointer',
                fontFamily:'Outfit,sans-serif', letterSpacing:'0.3px',
                transition:'all 0.3s ease',
                boxShadow:'0 4px 20px rgba(201,168,76,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundPosition='100% 0'
                e.currentTarget.style.transform='translateY(-2px)'
                e.currentTarget.style.boxShadow='0 8px 32px rgba(201,168,76,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundPosition='0% 0'
                e.currentTarget.style.transform='none'
                e.currentTarget.style.boxShadow='0 4px 20px rgba(201,168,76,0.3)'
              }}
            >
              {t.nav.contact}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="#07100A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>
        </div>

        {/* ═══ MOBILE MENU ═══ */}
        <div style={{
          maxHeight: mobileOpen ? '480px' : '0',
          overflow:'hidden', transition:'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          borderTop: mobileOpen ? '1px solid var(--border-gold)' : 'none',
          display:'none',
        }}>
          <div style={{ padding:'16px 24px 28px', display:'flex', flexDirection:'column', gap:'4px' }}>
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding:'13px 18px', borderRadius:'10px', textDecoration:'none',
                  fontSize:'15px', fontWeight: isActive?500:300,
                  color: isActive?'var(--gold)':'var(--text-secondary)',
                  background: isActive?'var(--gold-bg)':'transparent',
                  border: isActive?'1px solid var(--border-gold)':'1px solid transparent',
                  transition:'all 0.2s',
                })}
              >{label}</NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}