import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from '../i18n/index.jsx'

const IconSun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navbar() {
  const { dark, setDark } = useTranslation()
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { to:'/',          label:'Home' },
    { to:'/about',     label:'About' },
    { to:'/services',  label:'Services' },
    { to:'/products',  label:'Products' },
    { to:'/logistics', label:'Logistics' },
  ]

  return (
    <header style={{ position:'sticky', top:0, zIndex:100 }}>

      {/* TOP BAR */}
      <div style={{
        background: dark ? '#020508' : '#E8EEF8',
        borderBottom: '1px solid var(--border)',
        padding: '6px 0',
      }}>
        <div style={{ maxWidth:'1240px', margin:'0 auto', padding:'0 48px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:'28px', alignItems:'center' }}>
            {['+220 559 1066', '+220 796 5656', 'imexholding1@gmail.com', 'Banjul, The Gambia'].map((v,i) => (
              <span key={i} style={{ fontSize:'11.5px', color:'var(--text-muted)', fontWeight:300, letterSpacing:'0.2px' }}>{v}</span>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:'10.5px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--accent)', fontWeight:600 }}>
              Connecting Markets · Delivering Excellence
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav style={{
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: scrolled
          ? (dark ? '0 4px 32px rgba(0,0,0,0.55)' : '0 4px 24px rgba(15,40,100,0.08)')
          : 'none',
        transition: 'box-shadow 0.3s',
      }}>
        <div style={{
          maxWidth:'1240px', margin:'0 auto', padding:'0 48px',
          height:'76px', display:'flex', alignItems:'center',
          justifyContent:'space-between', gap:'24px',
        }}>

          {/* ── LOGO ── */}
          <button
            onClick={() => navigate('/')}
            style={{ background:'none', border:'none', cursor:'pointer', padding:0, flexShrink:0 }}
          >
            <div
              style={{
                height:'58px',
                padding:'7px 16px',
                background:'#FFFFFF',
                borderRadius:'10px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                minWidth:'160px',
                boxShadow: dark
                  ? '0 2px 20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12)'
                  : '0 2px 14px rgba(15,40,100,0.14)',
                transition:'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = dark
                  ? '0 8px 32px rgba(59,130,246,0.35), 0 0 0 1px rgba(255,255,255,0.18)'
                  : '0 8px 24px rgba(29,78,216,0.20)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = dark
                  ? '0 2px 20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.12)'
                  : '0 2px 14px rgba(15,40,100,0.14)'
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

          {/* ── NAV LINKS ── */}
          <div className="desktop-nav" style={{ display:'flex', alignItems:'center', gap:'2px' }}>
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to==='/'}
                style={({ isActive }) => ({
                  position:'relative', fontSize:'13.5px', padding:'9px 18px',
                  borderRadius:'7px', textDecoration:'none', letterSpacing:'0.2px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-bg)' : 'transparent',
                  transition:'all 0.2s',
                })}
                onMouseEnter={e => {
                  if (e.currentTarget.getAttribute('aria-current') !== 'page') {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'var(--bg-card-hover)'
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

          {/* ── RIGHT ── */}
          <div className="desktop-right" style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                width:'40px', height:'40px', borderRadius:'8px',
                background:'var(--bg-card)', border:'1px solid var(--border)',
                cursor:'pointer', display:'flex', alignItems:'center',
                justifyContent:'center', color:'var(--text-muted)',
                transition:'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-bg)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              {dark ? <IconSun/> : <IconMoon/>}
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => navigate('/contact')}
              style={{
                padding:'11px 24px', borderRadius:'8px',
                background:'var(--gradient-btn)',
                color:'#fff', fontWeight:600, fontSize:'13.5px',
                border:'none', cursor:'pointer',
                fontFamily:'Inter,sans-serif', letterSpacing:'0.3px',
                transition:'all 0.25s', boxShadow:'var(--shadow-accent)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(59,130,246,0.40)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'var(--shadow-accent)'
              }}
            >
              Contact Us
            </button>
          </div>

          {/* ── MOBILE ── */}
          <div className="mobile-cta" style={{ display:'none', alignItems:'center', gap:'8px' }}>

            {/* Logo mobile — visible et lisible */}
            <div style={{
              height:'48px', padding:'5px 12px',
              background:'#FFFFFF', borderRadius:'9px',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 2px 12px rgba(0,0,0,0.20)',
              marginRight:'4px',
            }}>
              <img
                src="/images/logo.png"
                alt="IMEX HOLDING"
                style={{ height:'36px', width:'auto', objectFit:'contain', display:'block', maxWidth:'130px' }}
              />
            </div>

            <button
              onClick={() => navigate('/contact')}
              style={{
                background:'var(--gradient-btn)', color:'#fff',
                padding:'9px 16px', borderRadius:'8px',
                fontWeight:600, fontSize:'13px', border:'none', cursor:'pointer',
              }}
            >
              Contact
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background:'var(--bg-card)', border:'1px solid var(--border)',
                borderRadius:'8px', cursor:'pointer', padding:'10px',
                display:'flex', flexDirection:'column', gap:'4px', alignItems:'center',
              }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display:'block', width:'20px', height:'1.5px',
                  background:'var(--text-primary)', borderRadius:'2px', transition:'all 0.3s',
                  transform: mobileOpen
                    ? (i===0 ? 'translateY(5.5px) rotate(45deg)' : i===2 ? 'translateY(-5.5px) rotate(-45deg)' : 'none')
                    : 'none',
                  opacity: mobileOpen && i===1 ? 0 : 1,
                }}/>
              ))}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div style={{
          maxHeight: mobileOpen ? '460px' : '0',
          overflow:'hidden',
          transition:'max-height 0.4s ease',
          borderTop: mobileOpen ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{ padding:'16px 24px 24px', display:'flex', flexDirection:'column', gap:'4px' }}>
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to==='/'} onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  padding:'13px 16px', borderRadius:'8px',
                  textDecoration:'none', fontSize:'15px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-bg)' : 'transparent',
                })}
              >{label}</NavLink>
            ))}
            <button
              onClick={() => setDark(!dark)}
              style={{
                marginTop:'12px', padding:'11px 16px', borderRadius:'8px',
                background:'var(--bg-card)', border:'1px solid var(--border)',
                color:'var(--text-secondary)', cursor:'pointer',
                fontFamily:'Inter,sans-serif', fontSize:'13.5px',
                display:'flex', alignItems:'center', gap:'8px',
              }}
            >
              {dark ? <><IconSun/> Light mode</> : <><IconMoon/> Dark mode</>}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}