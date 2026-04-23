import { supabase } from './supabase'

export async function saveQuizResult(userId, score, total) {
  const date = new Date().toISOString().split('T')[0]
  await supabase.from('quiz_results').insert({ user_id: userId, date, score, total })
}

export async function loadQuizHistory(userId) {
  const { data } = await supabase
    .from('quiz_results')
    .select('date, score, total')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30)
  return data || []
}

export async function upsertProfile(userId, fullName, avatarUrl) {
  await supabase
    .from('profiles')
    .upsert({ id: userId, full_name: fullName, avatar_url: avatarUrl, updated_at: new Date().toISOString() }, { onConflict: 'id' })
}

export async function getLeaderboard() {
  const { data } = await supabase.rpc('get_leaderboard')
  return data || []
}

export async function saveQuizLevel(userId, level) {
  await supabase
    .from('quiz_preferences')
    .upsert({ user_id: userId, quiz_level: level }, { onConflict: 'user_id' })
}

export async function loadQuizLevel(userId) {
  const { data } = await supabase
    .from('quiz_preferences')
    .select('quiz_level')
    .eq('user_id', userId)
    .single()
  return data?.quiz_level || 'mixed'
}
