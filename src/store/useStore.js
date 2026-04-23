import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const today = () => new Date().toISOString().split('T')[0]
const addDays = (date, n) => {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export const useStore = create(
  persist(
    (set, get) => ({
      // ── Today tab ──
      checks: [false, false, false],
      toggleCheck: (i) => {
        const checks = [...get().checks]
        checks[i] = !checks[i]
        set({ checks })
      },

      // ── Schedule ──
      startDate: today(),
      targetDate: addDays(today(), 90),
      setStartDate: (d) => set({ startDate: d, targetDate: addDays(d, 90) }),
      setTargetDate: (d) => set({ targetDate: d }),

      // ── Pause ──
      pauseActive: false,
      pauseFrom: '',
      pauseUntil: '',
      setPauseFrom: (d) => set({ pauseFrom: d }),
      setPauseUntil: (d) => set({ pauseUntil: d }),
      togglePause: () => set((s) => ({ pauseActive: !s.pauseActive })),
      resumeNow: () => set({ pauseActive: false, pauseUntil: today() }),

      // ── Theme ──
      themeMode: 'system',
      setThemeMode: (mode) => set({ themeMode: mode }),

      // ── Reminders ──
      reminders: [
        { id: 'quiz',    label: '5-min quiz',      time: '07:30', days: [0,1,2,3,4,5,6], on: true },
        { id: 'dsa',     label: 'DSA session',      time: '08:00', days: [0,1,2,3,4],     on: true },
        { id: 'sd',      label: 'System design',    time: '09:15', days: [0,1,2,3,4],     on: true },
        { id: 'go',      label: 'Go concepts',      time: '09:50', days: [0,1,2,3,4],     on: true },
        { id: 'evening', label: 'Evening session',  time: '22:00', days: [0,1,2,3,4,5,6], on: true, duration: 120 },
        { id: 'mock',    label: 'Weekend mock',     time: '10:00', days: [5,6],            on: true },
      ],
      updateReminder: (id, patch) =>
        set((s) => ({
          reminders: s.reminders.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        })),

      // ── Session ──
      sessionLog: [],
      addSessionLog: (entry) =>
        set((s) => ({ sessionLog: [entry, ...s.sessionLog].slice(0, 10) })),

      // ── Quiz history ──
      quizLevel: 'mixed',
      setQuizLevel: (level) => set({ quizLevel: level }),
      quizCategory: 'all',
      setQuizCategory: (cat) => set({ quizCategory: cat }),
      quizHistory: [],
      setQuizHistory: (history) => set({ quizHistory: history }),
      addQuizResult: (score, total) =>
        set((s) => ({
          quizHistory: [{ date: today(), score, total }, ...s.quizHistory].slice(0, 30),
        })),
    }),
    {
      name: 'prepapp-storage',
      partialize: (s) => ({
        checks: s.checks,
        startDate: s.startDate,
        targetDate: s.targetDate,
        pauseActive: s.pauseActive,
        pauseFrom: s.pauseFrom,
        pauseUntil: s.pauseUntil,
        themeMode: s.themeMode,
        reminders: s.reminders,
        sessionLog: s.sessionLog,
        quizLevel: s.quizLevel,
        quizCategory: s.quizCategory,
        quizHistory: s.quizHistory,
      }),
    }
  )
)
