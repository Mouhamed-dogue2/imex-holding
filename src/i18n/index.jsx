/* eslint-disable react-refresh/only-export-components */
// src/i18n/index.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import fr from './fr'
import en from './en'
import es from './es'

const translations = { fr, en, es }
const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('fr')
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const t = translations[lang]
  return (
    <LangContext.Provider value={{ lang, setLang, t, dark, setDark }}>
      {children}
    </LangContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LangContext)
}