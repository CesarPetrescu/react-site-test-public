import { createContext, useContext, useState, useEffect } from 'react'

const THEMES = ['dark', 'light', 'high-contrast', 'black']

const THEME_LABELS = {
  dark: 'Dark',
  light: 'Light',
  'high-contrast': 'High Contrast',
  black: 'Black',
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('uno-theme') || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('uno-theme', theme)
    } catch {}
  }, [theme])

  const cycleTheme = () => {
    setTheme(prev => {
      const i = THEMES.indexOf(prev)
      return THEMES[(i + 1) % THEMES.length]
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, THEMES, THEME_LABELS }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
