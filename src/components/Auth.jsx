import { useState } from 'react'
import { supabase } from '../lib/supabase'

const FEATURES = [
  { icon: '⚡', label: 'Daily Quizzes', desc: 'DSA, System Design, Go', color: 'bg-violet-50 text-violet-600', dark: 'dark:bg-violet-950/40 dark:text-violet-300' },
  { icon: '▶', label: 'Session Timer', desc: 'Track study sessions', color: 'bg-teal-50 text-teal-600', dark: 'dark:bg-teal-950/40 dark:text-teal-300' },
  { icon: '◉', label: 'Sync Everywhere', desc: 'All your devices', color: 'bg-blue-50 text-blue-600', dark: 'dark:bg-blue-950/40 dark:text-blue-300' },
]

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function signInWithGoogle() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-surface-2 px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, rgb(var(--accent-pale)), rgb(var(--surface-3)))' }}>
            <span className="font-mono text-2xl font-bold text-accent">//</span>
          </div>
          <h1 className="font-mono text-2xl font-bold text-ink tracking-tight">prep.go</h1>
          <p className="text-sm text-ink-3 mt-1">Your daily interview prep tracker</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2.5 mb-8">
          {FEATURES.map(({ icon, label, desc, color }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2 px-2 py-4 rounded-2xl bg-surface border border-[var(--border-soft-color)]">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color}`}>
                {icon}
              </div>
              <div>
                <div className="text-[11px] font-semibold text-ink leading-tight">{label}</div>
                <div className="text-[10px] text-ink-3 leading-tight mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sign in button */}
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-[var(--border-soft-color)] bg-surface text-ink text-sm font-semibold transition-opacity active:opacity-70 disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        {error && (
          <p className="mt-3 text-xs text-red-600 font-mono text-center">{error}</p>
        )}

        <p className="mt-5 text-center text-[11px] text-ink-3">
          Your data is stored securely and synced across devices.
        </p>
      </div>
    </div>
  )
}
