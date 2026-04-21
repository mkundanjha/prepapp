import { useEffect, useState } from 'react'
import Quiz      from './components/Quiz'
import Today     from './components/Today'
import Session   from './components/Session'
import Roadmap   from './components/Roadmap'
import Reminders from './components/Reminders'
import Settings  from './components/Settings'
import { useStore } from './store/useStore'

const TABS = [
  { id: 'quiz',      label: 'Quiz',      icon: '⚡' },
  { id: 'today',     label: 'Today',     icon: '◉' },
  { id: 'session',   label: 'Session',   icon: '▶' },
  { id: 'roadmap',   label: 'Roadmap',   icon: '⬡' },
  { id: 'reminders', label: 'Reminders', icon: '◎' },
  { id: 'settings',  label: 'Settings',  icon: '◌' },
]

const CONTENT = { quiz: Quiz, today: Today, session: Session, roadmap: Roadmap, reminders: Reminders, settings: Settings }

export default function App() {
  const [active, setActive] = useState('today')
  const { pauseActive, resumeNow, targetDate, themeMode } = useStore()
  const daysLeft = Math.max(0, Math.round((new Date(targetDate) - new Date()) / 86400000))

  const Content = CONTENT[active]

  useEffect(() => {
    const root = document.documentElement

    if (themeMode === 'system') {
      delete root.dataset.theme
      return
    }

    root.dataset.theme = themeMode
  }, [themeMode])

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
