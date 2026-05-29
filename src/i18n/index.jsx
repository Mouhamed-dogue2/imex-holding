import { createContext, useContext, useState, useEffect } from 'react'
import en from './en'

export const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <LangContext.Provider value={{ t: en, dark, setDark }}>
      {children}
    </LangContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LangContext)
}