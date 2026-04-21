import Collapsible from './Collapsible'
import { DSA_TOPICS, SD_TOPICS, GO_TOPICS } from '../data/topics'

const BADGE = { done: 'badge-done', current: 'badge-current', upcoming: 'badge-upcoming' }
const DIFF  = { easy: 'badge-easy', med: 'badge-med', hard: 'badge-hard' }

function ProblemRow({ prob }) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-[rgba(91,84,232,0.08)] last:border-0">
      <span className="text-[11px] text-ink-3 font-mono min-w-[36px]">{prob.n}.</span>
      <span className="text-[13px] text-ink flex-1 leading-tight">{prob.name}</span>
      <span className={`badge ${DIFF[prob.diff]}`}>{prob.diff}</span>
      <div className="flex gap-1.5 flex-shrink-0">
        <a href={prob.lc} target="_blank" rel="noreferrer" className="pill-lc">LC</a>
        <a href={prob.yt} target="_blank" rel="noreferrer" className="pill-yt">▶NC</a>
      </div>
    </div>
  )
}

function TopicRow({ topic }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-[rgba(91,84,232,0.08)] last:border-0">
      <span className="text-[11px] text-ink-3 font-mono w-5">{topic.n}</span>
      <span className="text-sm text-ink flex-1">{topic.name}</span>
      <span className={`badge ${BADGE[topic.badge]}`}>{topic.week || topic.badge}</span>
    </div>
  )
}

export default function Roadmap() {
  return (
    <div className="pb-4">
      {/* Phase overview */}
      <div className="card">
        <div className="card-title">3-month plan</div>
        <div className="space-y-2">
          <div className="px-3.5 py-3 rounded-lg border border-accent bg-accent-pale">
            <div className="text-[11px] font-semibold text-accent font-mono mb-1">Month 1 — active</div>
            <div className="text-sm font-medium text-ink">DSA foundations</div>
            <div className="text-xs text-ink-3 mt-1 leading-relaxed">Arrays · Two pointers · Stack · Sliding window · Binary search · Linked lists</div>
          </div>
          <div className="px-3.5 py-3 rounded-lg border border-[rgba(91,84,232,0.10)]">
            <div className="text-[11px] font-semibold text-ink-3 font-mono mb-1">Month 2</div>
            <div className="text-sm font-medium text-ink">DSA advanced + Go deep</div>
            <div className="text-xs text-ink-3 mt-1 leading-relaxed">Trees · Graphs · Backtracking · DP · Go concurrency patterns</div>
          </div>
          <div className="px-3.5 py-3 rounded-lg border border-[rgba(91,84,232,0.10)]">
            <div className="text-[11px] font-semibold text-ink-3 font-mono mb-1">Month 3</div>
            <div className="text-sm font-medium text-ink">System design + mocks</div>
            <div className="text-xs text-ink-3 mt-1 leading-relaxed">DDIA · Classic designs · Mock interviews · Behavioural (LP)</div>
          </div>
        </div>
      </div>

      {/* DSA topics */}
      {DSA_TOPICS.map(topic => (
        <Collapsible
          key={topic.id}
          title={topic.title}
          badge={topic.badge === 'done' ? 'done' : topic.badge === 'current' ? topic.week : topic.week}
          badgeClass={BADGE[topic.badge]}
          defaultOpen={topic.defaultOpen}
        >
          {topic.problems.map(p => <ProblemRow key={p.n} prob={p} />)}
        </Collapsible>
      ))}

      {/* System design topics */}
      <Collapsible title="System design" badge="week 2" badgeClass="badge-current" defaultOpen={true}>
        {SD_TOPICS.map(t => <TopicRow key={t.n} topic={t} />)}
      </Collapsible>

      {/* Go topics */}
      <Collapsible title="Go interview topics" badge="week 1" badgeClass="badge-current" defaultOpen={true}>
        {GO_TOPICS.map(t => <TopicRow key={t.n} topic={t} />)}
      </Collapsible>
    </div>
  )
}
