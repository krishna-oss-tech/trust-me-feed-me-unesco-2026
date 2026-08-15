import { UserChoice, BehaviourMetrics } from '../types';

/**
 * Supabase Anonymous Client & Persistence Service
 * 
 * Supports anonymous educational metrics storage without requiring personal data (no email, no password).
 * Automatically checks for environment variables and degrades gracefully to local storage if not configured or offline.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface AnonymousSessionPayload {
  sessionId: string;
  isDemoMode: boolean;
  metrics: BehaviourMetrics;
  choices: UserChoice[];
  completedAt: string;
}

export async function saveAnonymousSessionToSupabase(payload: AnonymousSessionPayload): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Supabase credentials not configured - fallback silently to localStorage (expected in local/demo mode)
    return false;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        session_id: payload.sessionId,
        is_demo: payload.isDemoMode,
        fast_trust: payload.metrics.fastTrust,
        verification_habit: payload.metrics.verificationHabit,
        emotion_influence: payload.metrics.emotionInfluence,
        social_proof_influence: payload.metrics.socialProofInfluence,
        ai_trust: payload.metrics.aiTrust,
        source_checking: payload.metrics.sourceChecking,
        accuracy_score: payload.metrics.accuracyScore,
        responses: payload.choices,
        completed_at: payload.completedAt
      })
    });

    return response.ok;
  } catch (err) {
    console.warn('Anonymous Supabase sync skipped or failed (offline/sandbox)', err);
    return false;
  }
}
