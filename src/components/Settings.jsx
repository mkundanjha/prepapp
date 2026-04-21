import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'

const OPTIONS = ['system', 'light', 'dark']

export default function Settings() {
  const { themeMode, setThemeMode } = useStore()
  const [systemTheme, setSystemTheme] = useState('light')

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setSystemTheme(media.matches ? 'dark' : 'light')
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const activeTheme = themeMode === 'system' ? systemTheme : themeMode

  return (
    <div className="pb-4">
      <div className="card">
        <div className="card-title">Appearance</div>
        <label className="block text-sm text-ink mb-2" htmlFor="theme-mode">Theme</label>
        <select
          id="theme-mode"
          value={themeMode}
          onChange={(e) => setThemeMode(e.target.value)}
          className="w-full rounded-lg px-3 py-2.5 text-sm font-mono border border-[var(--border-soft-color)] bg-surface-3 text-ink outline-none"
        >
          {OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="mt-3 text-xs text-ink-3 leading-relaxed">
          Active theme: <span className="font-mono text-ink">{activeTheme}</span>
          {themeMode === 'system' && (
            <span className="font-mono"> · following system preference</span>
          )}
        </div>
      </div>
    </div>
  )
}
