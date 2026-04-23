import { useEffect, useState } from 'react'
import Quiz      from './components/Quiz'
import Today     from './components/Today'
import Session   from './components/Session'
import Roadmap   from './components/Roadmap'
import Reminders from './components/Reminders'
import Settings  from './components/Settings'
import Auth      from './components/Auth'
import Avatar    from './components/Avatar'
import { useStore } from './store/useStore'
import { supabase } from './lib/supabase'
import { loadQuizHistory, loadQuizLevel, upsertProfile } from './lib/db'

const TABS = [
  { id: 'quiz',      label: 'Quiz',      icon: '⚡' },
  { id: 'today',     label: 'Today',     icon: '◉' },
  { id: 'session',   label: 'Session',   icon: '▶' },
  { id: 'roadmap',   label: 'Roadmap',   icon: '⬡' },
  { id: 'reminders', label: 'Reminders', icon: '◎' },
]

const CONTENT = { quiz: Quiz, today: Today, session: Session, roadmap: Roadmap, reminders: Reminders, settings: Settings }

export default function App() {
  const [active, setActive] = useState('today')
  const [session, setSession] = useState(undefined)
  const [showSignOut, setShowSignOut] = useState(false)
  const { pauseActive, resumeNow, targetDate, themeMode, setQuizHistory, setQuizLevel } = useStore()
  const daysLeft = Math.max(0, Math.round((new Date(targetDate) - new Date()) / 86400000))

  const Content = CONTENT[active]
  const user = session?.user

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user) return
    const { id, user_metadata } = session.user
    loadQuizHistory(id).then(h => setQuizHistory(h))
    loadQuizLevel(id).then(l => setQuizLevel(l))
    upsertProfile(id, user_metadata?.full_name || user_metadata?.name, user_metadata?.avatar_url)
  }, [session?.user?.id])

  useEffect(() => {
    const root = document.documentElement

    if (themeMode === 'system') {
      delete root.dataset.theme
      return
    }

    root.dataset.theme = themeMode
  }, [themeMode])

  if (session === undefined) return null
  if (!session) return <Auth />

  return (
    <div className="flex flex-col h-full bg-surface-2 text-ink">
      {/* Header */}
      <header
        className="flex items-center justify-between px-5 bg-surface border-b border-[var(--border-soft-color)] flex-shrink-0"
        style={{ paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))', paddingBottom: '12px' }}
      >
        <h1 className="font-mono text-[17px] font-bold text-ink tracking-tight">
          <span className="text-accent">//</span> prep.go
        </h1>
        <div className="flex items-center gap-2">
          {pauseActive && (
            <button
              onClick={resumeNow}
              className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono"
            >
              ⏸ paused
            </button>
          )}
          <span className="text-[11px] font-mono text-ink-3">{daysLeft}d left</span>
          {user && (
            <div className="relative">
              <button onClick={() => setShowSignOut(s => !s)}>
                <Avatar src={user.user_metadata?.avatar_url} name={user.user_metadata?.full_name || user.email} size="sm" />
              </button>
              {showSignOut && (
                <div className="absolute right-0 top-9 bg-surface border border-[var(--border-soft-color)] rounded-xl shadow-lg overflow-hidden z-50 min-w-[160px]">
                  <div className="px-3 py-2 text-[11px] text-ink-3 font-mono border-b border-[var(--border-soft-color)] truncate">
                    {user.email}
                  </div>
                  <button
                    onClick={() => { setActive('settings'); setShowSignOut(false) }}
                    className="w-full text-left px-3 py-2.5 text-sm text-ink-2 hover:bg-surface-3 transition-colors"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => { supabase.auth.signOut(); setShowSignOut(false) }}
                    className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-surface-3 transition-colors border-t border-[var(--border-soft-color)]"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Desktop sidebar nav */}
        <aside className="hidden md:flex flex-col w-52 bg-surface border-r border-[var(--border-soft-color)] flex-shrink-0 py-3">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors text-left border-l-2 ${
                active === tab.id
                  ? 'text-accent bg-accent-pale border-accent'
                  : 'text-ink-2 border-transparent hover:bg-surface-3 hover:text-ink'
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Scrollable content */}
        <div className="flex-1 scrollable px-4 pt-4 md:px-8 md:pt-6 mobile-nav-pad">
          <div className="max-w-2xl mx-auto">
            <Content />
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-[var(--border-soft-color)] flex items-start pt-2 z-50"
        style={{ height: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
      >
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 pb-1 border-none bg-transparent cursor-pointer transition-colors ${
              active === tab.id ? 'text-accent' : 'text-ink-3'
            }`}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
