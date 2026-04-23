import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getLeaderboard } from '../lib/db'
import Avatar from './Avatar'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setCurrentUserId(data.user?.id))
    getLeaderboard().then(data => { setRows(data); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="card">
        <div className="card-title">Leaderboard</div>
        <div className="text-sm text-ink-3 font-mono py-4 text-center">Loading...</div>
      </div>
    )
  }

  if (!rows.length) {
    return (
      <div className="card">
        <div className="card-title">Leaderboard</div>
        <div className="text-sm text-ink-3 py-4 text-center">No data yet. Complete a quiz to appear here.</div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="card-title mb-0">Leaderboard</div>
        <div className="text-[10px] text-ink-3 font-mono">streak×10 + accuracy</div>
      </div>

      <div className="space-y-1">
        {rows.map((row, i) => {
          const isMe = row.user_id === currentUserId
          return (
            <div
              key={row.user_id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isMe ? 'bg-accent-pale border border-[rgba(91,84,232,0.20)]' : 'bg-surface-3'
              }`}
            >
              {/* Rank */}
              <div className="w-6 text-center flex-shrink-0">
                {i < 3
                  ? <span className="text-base">{MEDALS[i]}</span>
                  : <span className="text-xs font-mono text-ink-3">{i + 1}</span>
                }
              </div>

              {/* Avatar */}
              <Avatar src={row.avatar_url} name={row.full_name} size="md" />

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${isMe ? 'text-accent' : 'text-ink'}`}>
                  {row.full_name || 'Anonymous'} {isMe && <span className="text-[10px] font-mono">(you)</span>}
                </div>
                <div className="text-[10px] text-ink-3 font-mono mt-0.5">
                  {row.streak}d streak · {row.avg_pct}% avg · {row.total_quizzes} quizzes
                </div>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <div className={`text-sm font-bold font-mono ${isMe ? 'text-accent' : 'text-ink'}`}>
                  {row.score}
                </div>
                <div className="text-[10px] text-ink-3 font-mono">pts</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
