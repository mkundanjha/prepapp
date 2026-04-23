import { useStore } from '../store/useStore'

function calcStreak(history) {
  if (!history.length) return 0
  let streak = 0
  const d = new Date()
  for (let i = 0; i < 30; i++) {
    const dateStr = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i)
      .toISOString().split('T')[0]
    if (history.some(h => h.date === dateStr)) streak++
    else break
  }
  return streak
}

const SLOTS = [
  {
    color: 'bg-accent',
    title: 'DSA — Two pointers',
    sub: 'Neetcode week 2',
    dur: '1 hr',
    problems: [
      { n: '125', name: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/' },
      { n: '15',  name: '3Sum',             url: 'https://leetcode.com/problems/3sum/' },
      { n: '11',  name: 'Container w/ Water', url: 'https://leetcode.com/problems/container-with-most-water/' },
    ],
  },
  {
    color: 'bg-teal-500',
    title: 'System design — Caching',
    sub: 'DDIA ch.5 · LRU, CDN',
    dur: '30 min',
    problems: [],
  },
  {
    color: 'bg-amber-500',
    title: 'Go — Goroutines & channels',
    sub: 'WaitGroups, select, done pattern',
    dur: '30 min',
    problems: [],
  },
]

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function Today() {
  const { checks, toggleCheck, targetDate, quizHistory } = useStore()
  const done = checks.filter(Boolean).length
  const pct = Math.round((done / 3) * 100)
  const daysLeft = Math.max(0, Math.round((new Date(targetDate) - new Date()) / 86400000))
  const streak = calcStreak(quizHistory)

  const todayStr = new Date().toISOString().split('T')[0]
  const yestStr = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const twoDayStr = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0]

  const todayQuiz = quizHistory.find(h => h.date === todayStr)
  const yestQuiz = quizHistory.find(h => h.date === yestStr)
  const twoDayQuiz = quizHistory.find(h => h.date === twoDayStr)

  return (
    <div className="pb-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { val: streak, lbl: 'streak 🔥' },
          { val: quizHistory.length, lbl: 'quizzes' },
          { val: daysLeft, lbl: 'days left' },
        ].map(({ val, lbl }) => (
          <div key={lbl} className="bg-surface-3 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold font-mono text-ink">{val}</div>
            <div className="text-[10px] text-ink-3 font-mono mt-0.5">{lbl}</div>
          </div>
        ))}
      </div>

      {/* Quiz progress */}
      <div className="card mb-3">
        <div className="card-title">Quiz progress</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { lbl: 'Today', result: todayQuiz },
            { lbl: 'Yesterday', result: yestQuiz },
            { lbl: '2 days ago', result: twoDayQuiz },
          ].map(({ lbl, result }) => (
            <div key={lbl} className="bg-surface-3 rounded-xl p-3 text-center">
              <div className={`text-xl font-bold font-mono ${result ? 'text-accent' : 'text-ink-3'}`}>
                {result ? `${result.score}/${result.total}` : '—'}
              </div>
              <div className="text-[10px] text-ink-3 font-mono mt-0.5">{lbl}</div>
              {result && (
                <div className="text-[10px] text-ink-3 mt-0.5">
                  {Math.round((result.score / result.total) * 100)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Today's sessions */}
      <div className="card">
        <div className="card-title">Today's sessions</div>
        {SLOTS.map((slot, i) => (
          <div key={i} className="flex items-start gap-3 py-3 border-b border-[rgba(91,84,232,0.08)] last:border-0 last:pb-0">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${slot.color}`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-ink">{slot.title}</div>
              <div className="text-xs text-ink-3 mt-0.5">{slot.sub}</div>
              {slot.problems.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {slot.problems.map(p => (
                    <a key={p.n} href={p.url} target="_blank" rel="noreferrer"
                      className="text-[11px] px-2 py-0.5 rounded-md bg-accent-pale text-accent border border-[rgba(91,84,232,0.15)] font-mono active:opacity-70">
                      {p.n}. {p.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-[11px] text-ink-3 font-mono">{slot.dur}</span>
              <button
                onClick={() => toggleCheck(i)}
                className={`check-btn ${checks[i] ? 'checked' : ''}`}
              >
                ✓
              </button>
            </div>
          </div>
        ))}

        {/* Progress bar */}
        <div className="mt-3">
          <div className="w-full h-1 bg-surface-3 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between mt-1.5 text-[11px] text-ink-3 font-mono">
            <span>{done} / 3 done</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>

      {/* Week grid */}
      <div className="card">
        <div className="card-title">This week</div>
        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {WEEK_DAYS.map((d, i) => (
            <div key={i} className="text-center text-[10px] text-ink-3 font-mono pb-1">{d}</div>
          ))}
          {[1, 2, 3, 4, 5, 6, 7].map(d => {
            const isDone    = d <= 3
            const isToday   = d === 4
            const isFuture  = d >= 5
            let cls = 'bg-surface border-[var(--border-soft-color)] text-ink-3'
            if (isDone)   cls = 'bg-accent-pale border-[rgba(91,84,232,0.20)] text-accent'
            if (isToday)  cls = 'bg-surface border-accent text-accent font-bold'
            if (isFuture) cls = 'bg-surface border-[var(--border-soft-color)] text-ink-3 opacity-30'
            return (
              <div key={d} className={`aspect-square rounded-lg border flex items-center justify-center text-[11px] font-mono ${cls}`}>
                {d}
              </div>
            )
          })}
        </div>
        <div className="text-[11px] text-ink-3 font-mono">Week 1 of 12 · Month 1 — DSA foundations</div>
      </div>
    </div>
  )
}
