import { Scenario, UserChoice, BehaviourMetrics, InformationProfile } from '../types';
import { SCENARIOS } from '../data/scenarios';

export function calculateMetrics(
  choices: UserChoice[],
  scenariosList: Scenario[] = SCENARIOS
): BehaviourMetrics {
  const total = choices.length;
  if (total === 0) {
    return {
      trustCount: 0,
      verifyCount: 0,
      rejectCount: 0,
      fastTrust: 0,
      verificationHabit: 0,
      emotionInfluence: 0,
      socialProofInfluence: 0,
      aiTrust: 0,
      sourceChecking: 0,
      accuracyScore: 0,
    };
  }

  let trustCount = 0;
  let verifyCount = 0;
  let rejectCount = 0;

  let emotionTrustMatches = 0;
  let totalHighEmotion = 0;

  let socialProofTrustMatches = 0;
  let totalHighSocialProof = 0;

  let aiTrustMatches = 0;
  let totalAIGenerated = 0;

  let correctCount = 0;
  let sourceCheckPoints = 0;

  choices.forEach((choice) => {
    const scenario = scenariosList.find((s) => s.id === choice.scenarioId);
    if (!scenario) return;

    if (choice.action === 'TRUST') trustCount++;
    if (choice.action === 'VERIFY') verifyCount++;
    if (choice.action === 'REJECT') rejectCount++;

    if (choice.action === scenario.correctStatus) {
      correctCount++;
    }

    // Emotion influence tracking
    if (scenario.emotionLevel === 'high' || scenario.sensationalismLevel === 'high') {
      totalHighEmotion++;
      if (choice.action === 'TRUST') {
        emotionTrustMatches++;
      }
    }

    // Social proof influence tracking
    if (scenario.socialProof === 'high' || scenario.socialProof === 'massive') {
      totalHighSocialProof++;
      if (choice.action === 'TRUST') {
        socialProofTrustMatches++;
      }
    }

    // AI trust tracking
    if (scenario.aiGenerated) {
      totalAIGenerated++;
      if (choice.action === 'TRUST') {
        aiTrustMatches++;
      }
    }

    // Source checking points
    if (scenario.sourceStrength === 'suspicious' || scenario.sourceStrength === 'unclear') {
      if (choice.action === 'VERIFY' || choice.action === 'REJECT') {
        sourceCheckPoints += 1;
      }
    } else if (scenario.sourceStrength === 'verified') {
      if (choice.action === 'TRUST' || choice.action === 'VERIFY') {
        sourceCheckPoints += 1;
      }
    }
  });

  const fastTrustPct = Math.round((trustCount / total) * 100);
  const verificationHabitPct = Math.round((verifyCount / total) * 100);
  const emotionInfluencePct = totalHighEmotion > 0 ? Math.round((emotionTrustMatches / totalHighEmotion) * 100) : 0;
  const socialProofInfluencePct = totalHighSocialProof > 0 ? Math.round((socialProofTrustMatches / totalHighSocialProof) * 100) : 0;
  const aiTrustPct = totalAIGenerated > 0 ? Math.round((aiTrustMatches / totalAIGenerated) * 100) : 0;
  const sourceCheckingPct = Math.min(100, Math.round((sourceCheckPoints / total) * 100));
  const accuracyPct = Math.round((correctCount / total) * 100);

  return {
    trustCount,
    verifyCount,
    rejectCount,
    fastTrust: fastTrustPct,
    verificationHabit: verificationHabitPct,
    emotionInfluence: emotionInfluencePct,
    socialProofInfluence: socialProofInfluencePct,
    aiTrust: aiTrustPct,
    sourceChecking: sourceCheckingPct,
    accuracyScore: accuracyPct,
  };
}

export function generateInformationProfile(metrics: BehaviourMetrics): InformationProfile {
  const { fastTrust, verificationHabit, emotionInfluence, socialProofInfluence, aiTrust, sourceChecking } = metrics;

  let archetypeTitle = 'Analytical Verifier';
  let archetypeSubtitle = 'Methodical, source-conscious, and evidence-driven evaluator.';
  let description = 'Your choices in this simulation reflected a strong habit of pausing to verify content before accepting or sharing. You naturally check timestamps, credentials, and corroborating evidence.';
  
  const strengths: string[] = [];
  const growthAreas: string[] = [];
  const recommendations: string[] = [];

  // Determine dominant profile archetypes safely
  if (verificationHabit >= 50) {
    archetypeTitle = 'Systematic Verification Champion';
    archetypeSubtitle = 'High pause-and-reflect habit before taking action.';
    description = 'Your choices in this experience demonstrated an active commitment to cross-checking sources, recognizing missing context, and double-checking sensational hooks.';
    strengths.push('Consistent habit of using verification tools before sharing');
    strengths.push('Resilience against high-engagement viral pressure');
    growthAreas.push('Remember that well-sourced information can be trusted without excessive cynicism');
    recommendations.push('Keep practicing the 6-point MIL check across emerging synthetic media formats.');
    recommendations.push('Share your verification routine with friends and online communities.');
  } else if (emotionInfluence >= 50 || socialProofInfluence >= 50) {
    archetypeTitle = 'Engagement-Sensitive Reader';
    archetypeSubtitle = 'Highly responsive to emotional resonance and viral momentum.';
    description = 'Your choices in this experience showed a tendency to trust content that presents strong community engagement, high like counts, or vivid emotional framing.';
    strengths.push('Quick empathy and strong engagement with online narratives');
    strengths.push('Awareness of community conversations and trending topics');
    growthAreas.push('High like counts can be inflated by automated bot networks or astroturfing');
    recommendations.push('Your next MIL skill to practice: Social Proof Audit. Ask if popularity equals evidence.');
    recommendations.push('Pause for 5 seconds when a post triggers immediate shock or outrage.');
  } else if (aiTrust >= 60) {
    archetypeTitle = 'AI-Optimistic Navigator';
    archetypeSubtitle = 'Receptive to synthetic summaries and algorithmic responses.';
    description = 'Your choices in this experience showed high openness to AI-generated answers and automated summaries.';
    strengths.push('Comfortable navigating AI interface paradigms');
    strengths.push('Efficient consumption of synthesized knowledge summaries');
    growthAreas.push('AI models can generate confident hallucinations with phantom citations');
    recommendations.push('Your next MIL skill to practice: AI Source Spotting. Verify primary links cited by AI models.');
    recommendations.push('Test synthetic claims against peer-reviewed or official open databases.');
  } else if (fastTrust >= 55) {
    archetypeTitle = 'Rapid Information Streamer';
    archetypeSubtitle = 'Prefers quick decision-making in fast-paced feeds.';
    description = 'Your choices in this experience leaned toward quick trust decisions to process information rapidly.';
    strengths.push('Fast information processing speed in dense feed environments');
    strengths.push('High responsiveness to clean, professional design presentation');
    growthAreas.push('Slick presentation and professional logos can hide unverified domains');
    recommendations.push('Your next MIL skill to practice: Domain & Credential Inspection.');
    recommendations.push('Try the 10-second reverse image search habit for striking visuals.');
  } else {
    archetypeTitle = 'Balanced Information Navigator';
    archetypeSubtitle = 'Nuanced approach combining trust, verification, and critical evaluation.';
    description = 'Your choices in this simulation showed a balanced distribution across trusting valid reports, verifying ambiguous claims, and rejecting clear misinformation.';
    strengths.push('Flexible evaluation strategy depending on content category');
    strengths.push('Balanced perspective avoiding both blind belief and total cynicism');
    growthAreas.push('Emerging generative AI voice and deepfake media require constant calibration');
    recommendations.push('Continue refining your verification check for synthetic audio and video.');
    recommendations.push('Explore UNESCO Media & Information Literacy resources to deepen your MIL mastery.');
  }

  // Ensure default fallbacks if empty
  if (strengths.length < 2) {
    strengths.push('Evaluates content contextually rather than making blanket judgments');
    strengths.push('Recognizes modern digital platform content types');
  }
  if (growthAreas.length < 1) {
    growthAreas.push('Stay vigilant as generative AI techniques make synthetic media harder to detect visually');
  }
  if (recommendations.length < 2) {
    recommendations.push('Practice applying the 6-point MIL check: Source, Date, Evidence, Context, Media, Consensus.');
    recommendations.push('Remember: What you trust shapes what your feed displays next.');
  }

  return {
    metrics,
    archetypeTitle,
    archetypeSubtitle,
    description,
    strengths,
    growthAreas,
    recommendations,
  };
}
