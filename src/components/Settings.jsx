import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { supabase } from '../lib/supabase'
import { saveQuizLevel } from '../lib/db'
import Avatar from './Avatar'

const OPTIONS = ['system', 'light', 'dark']
const LEVELS = ['junior', 'mid', 'senior', 'mixed']

export default function Settings() {
  const { themeMode, setThemeMode, quizLevel, setQuizLevel } = useStore()
  const [systemTheme, setSystemTheme] = useState('light')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setSystemTheme(media.matches ? 'dark' : 'light')
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const activeTheme = themeMode === 'system' ? systemTheme : themeMode

  return (
    <div className="pb-4">

      {/* Account */}
      {user && (
        <div className="card mb-3">
          <div className="card-title">Account</div>
          <div className="flex items-center gap-3">
            <Avatar src={user.user_metadata?.avatar_url} name={user.user_metadata?.full_name || user.email} size="lg" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-ink truncate">
                {user.user_metadata?.full_name || user.user_metadata?.name || '—'}
              </div>
              <div className="text-xs text-ink-3 font-mono truncate">{user.email}</div>
              <div className="text-[10px] text-ink-3 mt-1">
                Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience level */}
      <div className="card">
        <div className="card-title">Experience Level</div>
        <label className="block text-sm text-ink mb-2" htmlFor="quiz-level">Quiz difficulty</label>
        <select
          id="quiz-level"
          value={quizLevel}
          onChange={async (e) => {
            setQuizLevel(e.target.value)
            const { data: { user } } = await supabase.auth.getUser()
            if (user) saveQuizLevel(user.id, e.target.value)
          }}
          className="w-full rounded-lg px-3 py-2.5 text-sm font-mono border border-[var(--border-soft-color)] bg-surface-3 text-ink outline-none"
        >
          {LEVELS.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Appearance */}
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
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="mt-3 text-xs text-ink-3">
          Active: <span className="font-mono text-ink">{activeTheme}</span>
          {themeMode === 'system' && <span className="font-mono"> · following system</span>}
        </div>
      </div>

    </div>
  )
}
