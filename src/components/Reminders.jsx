import { useState } from 'react'
import { useStore } from '../store/useStore'
import Toggle from './Toggle'
import Collapsible from './Collapsible'

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function ReminderRow({ reminder }) {
  const { updateReminder } = useStore()
  const [saved, setSaved] = useState(false)

  const toggleDay = (i) => {
    const days = reminder.days.includes(i)
      ? reminder.days.filter(d => d !== i)
      : [...reminder.days, i].sort()
    updateReminder(reminder.id, { days })
  }

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const dayLabel = reminder.days.map(d => DAYS[d]).join(', ')
  const sub = `${reminder.time} · ${dayLabel}`

  return (
    <div className="py-3 border-b border-[rgba(91,84,232,0.08)] last:border-0">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-ink">{reminder.label}</div>
          <div className="text-[11px] text-ink-3 font-mono mt-0.5">{sub}</div>
        </div>
        <Toggle on={reminder.on} onChange={on => updateReminder(reminder.id, { on })} />
      </div>
      <div className="flex items-center gap-2 mt-2.5 flex-wrap">
        <span className="text-[11px] text-ink-3 font-mono">Time</span>
        <input
          type="time"
          value={reminder.time}
          onChange={e => updateReminder(reminder.id, { time: e.target.value })}
          className="text-xs px-2 py-1 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono"
        />
        {reminder.id === 'evening' && (
          <select
            value={reminder.duration || 120}
            onChange={e => updateReminder(reminder.id, { duration: Number(e.target.value) })}
            className="text-xs px-2 py-1 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono"
          >
            <option value={60}>1 hr</option>
            <option value={90}>1.5 hr</option>
            <option value={120}>2 hr</option>
            <option value={150}>2.5 hr</option>
            <option value={180}>3 hr</option>
          </select>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {DAYS.map((d, i) => (
          <button
            key={i}
            onClick={() => toggleDay(i)}
            className={`day-pill ${reminder.days.includes(i) ? 'active' : ''}`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <button onClick={save}
          className="text-xs px-3.5 py-1.5 border border-[rgba(91,84,232,0.12)] rounded-lg bg-surface-3 text-ink-3 font-mono active:bg-surface-4">
          Save
        </button>
        {saved && <span className="text-xs text-green-600 font-mono ml-2">Saved ✓</span>}
      </div>
    </div>
  )
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function Reminders() {
  const {
    reminders, startDate, targetDate, setStartDate, setTargetDate,
    pauseActive, pauseFrom, pauseUntil, setPauseFrom, setPauseUntil,
    togglePause, resumeNow,
  } = useStore()

  return (
    <div className="pb-4">
      {/* Preparation schedule */}
      <Collapsible title="Preparation schedule" badge="" defaultOpen={false}>
        <DateRow label="Start date" sub="Roadmap begins from this date">
          <input type="date" value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="text-xs px-2 py-1.5 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono" />
        </DateRow>
        <DateRow label="Target date" sub={`~90 days · ends ${fmtDate(targetDate)}`}>
          <input type="date" value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            className="text-xs px-2 py-1.5 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono" />
        </DateRow>
      </Collapsible>

      {/* Pause preparation */}
      <Collapsible title="Pause preparation" badge="" defaultOpen={false}>
        <DateRow label="Pause from" sub="Notifications stop">
          <input type="date" value={pauseFrom}
            onChange={e => setPauseFrom(e.target.value)}
            className="text-xs px-2 py-1.5 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono" />
        </DateRow>
        <DateRow label="Resume on" sub="Auto-restarts on this date">
          <input type="date" value={pauseUntil}
            onChange={e => setPauseUntil(e.target.value)}
            className="text-xs px-2 py-1.5 border border-[rgba(91,84,232,0.15)] rounded-lg bg-surface-3 text-ink font-mono" />
        </DateRow>
        <DateRow
          label="Pause active"
          sub={pauseActive ? `Active → resumes ${fmtDate(pauseUntil)}` : pauseFrom ? `${fmtDate(pauseFrom)} → ${fmtDate(pauseUntil)}` : 'Set dates above to activate'}
        >
          <Toggle on={pauseActive} onChange={togglePause} />
        </DateRow>
        {pauseActive && (
          <div className="pb-3">
            <button onClick={resumeNow} className="text-xs px-3 py-1.5 border border-amber-300 rounded-lg bg-amber-50 text-amber-700 font-mono active:opacity-70">
              Resume now
            </button>
          </div>
        )}
      </Collapsible>

      {/* Daily reminders */}
      <div className="card mt-2">
        <div className="card-title">Daily reminders</div>
        {reminders.map(r => <ReminderRow key={r.id} reminder={r} />)}
      </div>
    </div>
  )
}

function DateRow({ label, sub, children }) {
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
