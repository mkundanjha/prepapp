import { useState, useCallback, useEffect } from 'react'
import { QUESTION_BANK } from '../data/questions'
import { useStore } from '../store/useStore'

function shuffle(arr) {
  const r = [...arr]
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

function getPool(cat, level) {
  const bank = QUESTION_BANK[cat]
  if (level === 'mixed') return Object.values(bank).flat()
  return bank[level] || []
}

function pick(cat, count, level) {
  return shuffle(getPool(cat, level)).slice(0, count)
}

function buildSet(level) {
  const dsa = pick('dsa', 1, level)
  const sd  = pick('sd', 2, level)
  const go  = pick('go', 2, level)
  return shuffle([...dsa, ...sd, ...go])
}

const TAG = {
  dsa: { label: 'DSA', cls: 'quiz-tag-dsa' },
  sd: { label: 'SysDesign', cls: 'quiz-tag-sd' },
  go: { label: 'Go', cls: 'quiz-tag-go' },
}

const LEVEL_TAG = {
  junior: { label: 'Junior', cls: 'quiz-level-junior' },
  mid: { label: 'Mid', cls: 'quiz-level-mid' },
  senior: { label: 'Senior', cls: 'quiz-level-senior' },
}

const LEVEL_OPTIONS = ['junior', 'mid', 'senior', 'mixed']

export default function Quiz() {
  const { quizHistory, addQuizResult, quizLevel, setQuizLevel } = useStore()
  const [questions, setQuestions] = useState(() => buildSet(quizLevel))
  const [idx, setIdx]             = useState(0)
  const [selected, setSelected]   = useState(null)
  const [score, setScore]         = useState(0)
  const [done, setDone]           = useState(false)

  const q = questions[idx]

  useEffect(() => {
    setQuestions(buildSet(quizLevel))
    setIdx(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }, [quizLevel])

  const handleAnswer = useCallback((i) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.ans) setScore(s => s + 1)
  }, [selected, q])

  const handleNext = () => {
    if (idx + 1 >= questions.length) {
      const finalScore = score + (selected === q.ans ? 1 : 0)
      addQuizResult(finalScore, questions.length)
      setScore(finalScore)
      setDone(true)
    } else {
      setIdx(i => i + 1)
      setSelected(null)
    }
  }

  const restart = () => {
    setQuestions(buildSet(quizLevel))
    setIdx(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  const catCounts = questions.reduce((acc, q) => { acc[q.cat] = (acc[q.cat] || 0) + 1; return acc }, {})
  const catScores = done ? questions.reduce((acc, q, i) => {
    if (i < questions.length) acc[q.cat] = (acc[q.cat] || 0)
    return acc
  }, {}) : {}

  const today = new Date().toISOString().split('T')[0]
  const todayResult = quizHistory.find(h => h.date === today)
  const yesterday   = quizHistory.find(h => h.date !== today)
  const streak      = quizHistory.filter((h, i) => {
    const d = new Date(); d.setDate(d.getDate() - i)
    return h.date === d.toISOString().split('T')[0]
  }).length

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const msg = pct === 100 ? 'Perfect. Solid fundamentals.' : pct >= 80 ? 'Great — one slip. Keep it daily.' : pct >= 60 ? 'Decent — review the misses.' : "A few gaps. That's what this is for."
    return (
      <div className="pb-4">
        <div className="card text-center py-6">
          <div className="text-6xl font-bold font-mono text-accent mb-1">{score}/{questions.length}</div>
          <div className="text-sm text-ink-3 font-mono mb-4">{pct}% correct</div>
          <div className="text-sm text-ink-2 bg-surface-3 rounded-lg p-3 mb-5 leading-relaxed">{msg}</div>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {['dsa', 'sd', 'go'].map(cat => (
              <div key={cat} className="bg-surface-3 rounded-lg p-2.5 text-center">
                <div className="text-lg font-bold font-mono text-ink">
                  {questions.filter(q2 => q2.cat === cat && q2.ans === questions.indexOf(q2)).length}/{catCounts[cat] || 0}
                </div>
                <div className="text-[10px] text-ink-3 font-mono mt-0.5">{TAG[cat].label}</div>
              </div>
            ))}
          </div>
          <button onClick={restart} className="btn-ghost w-full">New set</button>
        </div>
        <QuizHistory todayResult={todayResult} yesterday={yesterday} streak={streak} />
      </div>
    )
  }

  return (
    <div className="pb-4">
      <div className="card">
        <div className="mb-4">
          <div className="card-title mb-2">Experience Level</div>
          <div className="grid grid-cols-4 gap-2">
            {LEVEL_OPTIONS.map(level => {
              const active = quizLevel === level
              return (
                <button
                  key={level}
                  onClick={() => setQuizLevel(level)}
                  className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold font-mono border transition-colors ${
                    active
                      ? 'bg-accent-pale text-accent border-[rgba(91,84,232,0.20)]'
                      : 'bg-surface-3 text-ink-3 border-[rgba(91,84,232,0.10)]'
                  }`}
                >
                  {level}
                </button>
              )
            })}
          </div>
        </div>

        {/* Progress dots + tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < idx ? 'bg-accent' : i === idx ? 'bg-accent opacity-50' : 'bg-surface-4'}`} />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold font-mono ${TAG[q.cat].cls}`}>
              {TAG[q.cat].label}
            </span>
            {quizLevel === 'mixed' && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-mono ${LEVEL_TAG[q.level].cls}`}>
                {LEVEL_TAG[q.level].label}
              </span>
            )}
          </div>
        </div>

        {/* Q number */}
        <div className="text-[11px] text-ink-3 font-mono mb-2.5">Q{idx + 1} of {questions.length}</div>

        {/* Question */}
        <div className="text-[15px] font-medium text-ink leading-relaxed mb-4">{q.q}</div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {q.opts.map((opt, i) => {
            let cls = 'quiz-option'
            if (selected !== null) {
              if (i === q.ans) cls = 'quiz-option-correct'
              else if (i === selected) cls = 'quiz-option-wrong'
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full text-left px-3.5 py-3 rounded-lg text-sm leading-snug transition-colors active:opacity-70 ${cls}`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {selected !== null && (
          <div className="mt-3 px-3.5 py-3 bg-surface-3 rounded-lg text-xs text-ink-3 leading-relaxed border-l-2 border-accent">
            <span className={selected === q.ans ? 'quiz-feedback-correct font-semibold' : 'quiz-feedback-wrong font-semibold'}>
              {selected === q.ans ? '✓ Correct. ' : '✗ Incorrect. '}
            </span>
            {q.exp}
          </div>
        )}

        {/* Next button */}
        {selected !== null && (
          <button onClick={handleNext} className="mt-3.5 w-full py-2.5 border border-accent rounded-lg bg-accent-pale text-accent text-sm font-semibold font-mono">
            {idx < questions.length - 1 ? 'Next →' : 'See results'}
          </button>
        )}
      </div>

      <QuizHistory todayResult={todayResult} yesterday={yesterday} streak={streak} />
    </div>
  )
}

function QuizHistory({ todayResult, yesterday, streak }) {
  return (
    <div className="card">
      <div className="card-title">History</div>
      <HistRow label="Today" value={todayResult ? `${todayResult.score}/${todayResult.total}` : 'not attempted'} />
      <HistRow label="Yesterday" value={yesterday ? `${yesterday.score}/${yesterday.total}` : '—'} />
      <HistRow label="Quiz streak" value={`${streak} day${streak !== 1 ? 's' : ''} 🔥`} accent />
    </div>
  )
}

function HistRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[rgba(91,84,232,0.08)] last:border-0">
      <span className="text-sm text-ink">{label}</span>
      <span className={`text-xs font-mono ${accent ? 'text-accent font-semibold' : 'text-ink-3'}`}>{value}</span>
    </div>
  )
}
