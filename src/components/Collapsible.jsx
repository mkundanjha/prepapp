import { useState } from 'react'

export default function Collapsible({ title, badge, badgeClass = 'badge-upcoming', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mb-2.5">
      <button
        onClick={() => setOpen(!open)}
        className={`coll-header w-full text-left ${open ? 'open' : ''}`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-ink">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge && <span className={`badge ${badgeClass}`}>{badge}</span>}
          <span
            className="text-[11px] text-ink-3 transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
          >
            ▼
          </span>
        </div>
      </button>
      {open && (
        <div className="coll-body">
          <div className="px-3.5">{children}</div>
        </div>
      )}
    </div>
  )
}
