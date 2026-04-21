import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

const CIRC = 414.69
const SEGS = [
  { label: 'DSA',           dur: 60,  color: '#5B54E8' },
  { label: 'System Design', dur: 30,  color: '#0d9488' },
  { label: 'Go',            dur: 30,  color: '#d97706' },
  { label: 'Full Session',  dur: 120, color: '#5B54E8' },
]

function fmtT(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export default function Session() {
  const { addSessionLog, sessionLog, reminders, updateReminder } = useStore()
  const [activeSeg, setActiveSeg]   = useState(-1)
  const [state, setState]           = useState('idle')   // idle | running | paused | done
  const [elapsed, setElapsed]       = useState(0)
  const [paused, setPaused]         = useState(0)
  const [maxPause, setMaxPause]     = useState(300)
  const [fullDur, setFullDur]       = useState(120)
  const mainRef  = useRef(null)
  const pauseRef = useRef(null)

  const seg = activeSeg >= 0 ? { ...SEGS[activeSeg], dur: activeSeg === 3 ? fullDur : SEGS[activeSeg].dur } : null
  const totalSecs = seg ? seg.dur * 60 : 0
  const pct = totalSecs > 0 ? Math.min(elapsed / totalSecs, 1) : 0
  const offset = CIRC * (1 - pct)

  useEffect(() => () => { clearInterval(mainRef.current); clearInterval(pauseRef.current) }, [])

  const select = (i) => {
    if (state === 'running' || state === 'paused') return
    setActiveSeg(i); setElapsed(0); setPaused(0); setState('idle')
  }

  const start = () => {
    if (activeSeg < 0) return
    setState('running'); setElapsed(0); setPaused(0)
    mainRef.current = setInterval(() => {
      setElapsed(e => {
        if (e + 1 >= totalSecs) { clearInterval(mainRef.current); setState('done'); return totalSecs }
        return e + 1
      })
    }, 1000)
  }

  const pause = () => {
    clearInterval(mainRef.current); setState('paused'); setPaused(0)
    pauseRef.current = setInterval(() => setPaused(p => p + 1), 1000)
  }

  const resume = () => {
    clearInterval(pauseRef.current); setState('running')
    mainRef.current = setInterval(() => {
      setElapsed(e => {
        if (e + 1 >= totalSecs) { clearInterval(mainRef.current); setState('done'); return totalSecs }
        return e + 1
      })
    }, 1000)
  }

  const end = () => {
    clearInterval(mainRef.current); clearInterval(pauseRef.current)
    setState('done')
    addSessionLog(`${seg.label} · ${fmtT(elapsed)} · ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`)
  }

  const reset = () => {
    clearInterval(mainRef.current); clearInterval(pauseRef.current)
    setActiveSeg(-1); setState('idle'); setElapsed(0); setPaused(0)
  }

  const pauseOver = state === 'paused' && paused >= maxPause
  const ringColor = pauseOver ? '#dc2626' : state === 'done' ? '#16a34a' : seg?.color || '#5B54E8'

  const eveReminder = reminders.find(r => r.id === 'evening')

  return (
    <div className="pb-4">
      <div className="card">
        {/* Segment selector */}
        <div className="text-[11px] font-semibold text-ink-3 uppercase tracking-widest font-mono mb-3">
          {seg ? seg.label.toUpperCase() : 'SELECT SESSION'}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {SEGS.map((s, i) => (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={state === 'running' || state === 'paused'}
              className={`text-left px-3 py-2.5 rounded-lg border transition-colors ${activeSeg === i ? 'border-accent bg-accent-pale' : 'border-[rgba(91,84,232,0.10)] bg-surface-3'}`}
            >
              <div className={`text-xs font-semibold font-mono ${activeSeg === i ? 'text-accent' : 'text-ink'}`}>{s.label}</div>
              <div className="text-[11px] text-ink-3 font-mono mt-0.5">{i === 3 ? `${fullDur} min` : `${s.dur} min`}</div>
            </button>
          ))}
        </div>

        {/* Ring timer */}
        <div className="relative w-40 h-40 mx-auto mb-5">
          <svg className="w-40 h-40" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 160 160">
            <circle className="fill-none stroke-surface-4" cx="80" cy="80" r="66" strokeWidth="10" />
            <circle
              className="fill-none transition-all duration-500"
              cx="80" cy="80" r="66" strokeWidth="10" strokeLinecap="round"
              stroke={ringColor}
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold font-mono text-ink">{fmtT(elapsed)}</div>
            <div className="text-[11px] text-ink-3 font-mono mt-0.5">
              {state === 'idle' ? 'ready' : state === 'done' ? 'done!' : `${fmtT(Math.max(0, totalSecs - elapsed))} left`}
            </div>
          </div>
        </div>

        {/* Pause over-limit alert */}
        {pauseOver && (
          <div className="mb-3.5 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-mono">
            ⚠ Paused {fmtT(paused)} — limit is {fmtT(maxPause)}. Resume now!
          </div>
        )}
        {state === 'paused' && !pauseOver && paused > 0 && (
          <div className="mb-3.5 px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-mono">
            Paused {fmtT(paused)} / {fmtT(maxPause)}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2.5 justify-center mb-4">
          {state === 'idle' && (
            <button onClick={start} disabled={activeSeg < 0}
              className="btn-primary px-8" style={{ background: activeSeg >= 0 ? (seg?.color || '#5B54E8') : undefined }}>
              Start
            </button>
          )}
          {state === 'running' && (<>
            <button onClick={pause} className="btn-warn">Pause</button>
            <button onClick={end}   className="btn-ghost">End</button>
          </>)}
          {state === 'paused' && (<>
            <button onClick={resume} className="btn-success">Resume</button>
            <button onClick={end}    className="btn-ghost">End</button>
          </>)}
          {state === 'done' && (
            <button onClick={reset} className="btn-primary">New session</button>
          )}
        </div>

        {/* Completion message */}
        {state === 'done' && (
          <div className="px-3.5 py-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="text-sm font-semibold text-green-700 font-mono">Session complete ✓</div>
            <div className="text-xs text-green-600 mt-1">
              {elapsed >= totalSecs ? `${seg?.label} done — great work!` : `${fmtT(elapsed)} of ${seg?.dur} min completed (${Math.round(elapsed / totalSecs * 100)}%)`}
            </div>
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="card">
        <div className="card-title">Session settings</div>
        <SettRow label="Evening session time" sub={eveReminder?.time || '22:00'}>
          <input type="time" value={eveReminder?.time || '22:00'}
            onChange={e => updateReminder('evening', { time: e.target.value })}
            className="text-xs px-2 py-1.5 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono" />
        </SettRow>
        <SettRow label="Full session duration" sub={`${fullDur} min`}>
          <select value={fullDur} onChange={e => setFullDur(Number(e.target.value))}
            className="text-xs px-2 py-1.5 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono">
            <option value={60}>1 hr</option>
            <option value={90}>1.5 hr</option>
            <option value={120}>2 hr</option>
            <option value={150}>2.5 hr</option>
            <option value={180}>3 hr</option>
          </select>
        </SettRow>
        <SettRow label="Max pause time" sub="alert fires after this">
          <select value={maxPause} onChange={e => setMaxPause(Number(e.target.value))}
            className="text-xs px-2 py-1.5 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono">
            <option value={120}>2 min</option>
            <option value={300}>5 min</option>
            <option value={600}>10 min</option>
          </select>
        </SettRow>
        <SettRow label="Today's log" sub={sessionLog.slice(0, 3).join(' · ') || 'No sessions yet'} />
      </div>
    </div>
  )
}

function SettRow({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[rgba(91,84,232,0.08)] last:border-0">
      <div>
        <div className="text-sm text-ink">{label}</div>
        <div className="text-[11px] text-ink-3 font-mono mt-0.5">{sub}</div>
      </div>
      {children}
    </div>
  )
}
