import { BehaviourMetrics, FeedItem } from '../types';
import { FEED_POOL } from '../data/feedItems';

export interface FeedSimulationResult {
  feed: FeedItem[];
  primaryPreference: string;
  summaryText: string;
  keyStats: { label: string; value: string; hint: string }[];
}

export function generateSimulatedFeed(metrics: BehaviourMetrics): FeedSimulationResult {
  const { fastTrust, verificationHabit, emotionInfluence, socialProofInfluence, aiTrust, sourceChecking } = metrics;

  // Determine scoring weights for each trait
  const weights = {
    emotion: emotionInfluence * 1.5 + (fastTrust > 50 ? 20 : 0),
    socialProof: socialProofInfluence * 1.5 + (fastTrust > 50 ? 15 : 0),
    ai: aiTrust * 1.5,
    verification: verificationHabit * 1.8 + sourceChecking * 1.0,
    balanced: 40,
  };

  // Find dominant trait
  let primaryPreference = 'Balanced & Verifiable Information';
  let summaryText = 'a balanced mix of verified sources, contextual news, and critical checks.';

  if (weights.verification > weights.emotion && weights.verification > weights.socialProof && weights.verification > weights.ai && weights.verification > 50) {
    primaryPreference = 'Source-Verified & Evidence-Based Content';
    summaryText = 'seeking verified sources, requesting context, and cross-checking evidence before accepting claims.';
  } else if (weights.emotion >= weights.socialProof && weights.emotion >= weights.ai && weights.emotion > 40) {
    primaryPreference = 'High-Emotion & Sensational Headlines';
    summaryText = 'engaging with high-sensationalism headlines, urgent outrage calls, and emotionally charged narratives.';
  } else if (weights.socialProof >= weights.ai && weights.socialProof > 40) {
    primaryPreference = 'High-Engagement & Viral Community Proof';
    summaryText = 'trusting posts with massive like counts, viral momentum, and enthusiastic comment sections.';
  } else if (weights.ai > 40) {
    primaryPreference = 'AI-Generated Summaries & Synthetic Content';
    summaryText = 'accepting AI-synthesized responses and automated knowledge digests.';
  }

  // Sort and select items from pool according to weights
  const items = [...FEED_POOL];
  
  items.sort((a, b) => {
    const scoreA = weights[a.triggerTrait] || 10;
    const scoreB = weights[b.triggerTrait] || 10;
    return scoreB - scoreA;
  });

  const keyStats = [
    {
      label: 'Verification Rate',
      value: `${verificationHabit}%`,
      hint: verificationHabit > 50 ? 'High active verification habit' : 'Opportunity to verify more often',
    },
    {
      label: 'Fast Trust Score',
      value: `${fastTrust}%`,
      hint: fastTrust > 40 ? 'Frequent quick acceptance without pause' : 'Cautious & deliberate evaluation',
    },
    {
      label: 'Emotion Influence',
      value: `${emotionInfluence}%`,
      hint: emotionInfluence > 40 ? 'Higher sensitivity to emotional framing' : 'Resilient against outrage hooks',
    },
    {
      label: 'Source Checking',
      value: `${sourceChecking}%`,
      hint: sourceChecking > 50 ? 'Strong credential & date inspection' : 'Try double-checking unverified handles',
    },
  ];

  return {
    feed: items,
    primaryPreference,
    summaryText,
    keyStats,
  };
}
