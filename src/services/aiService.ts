import type { AIServiceResponse, Scenario } from '../types';

/**
 * Client-Side AI Service Layer
 * 
 * Securely proxies AI analysis requests through our serverless endpoint (/api/ai-analysis).
 * No secret API keys are ever stored or used client-side.
 * 
 * Automatically falls back to high-quality pre-written MIL scenario explanations if:
 * - Server AI key is not configured
 * - Running offline or in local environment without serverless backend
 * - Network is unavailable or request times out
 * - Server returns an error
 */
export async function getAIScenarioAnalysis(scenario: Scenario): Promise<AIServiceResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch('/api/ai-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        headline: scenario.content.headline || '',
        body: scenario.content.body,
        platform: scenario.platform,
        categoryLabel: scenario.categoryLabel,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Server returned 4xx, 5xx, or fallback indicator -> use local MIL engine
      return getFallbackAnalysis(scenario);
    }

    const data = await response.json();

    if (data.fallback || !data.trustworthinessAnalysis) {
      return getFallbackAnalysis(scenario);
    }

    return {
      trustworthinessAnalysis: data.trustworthinessAnalysis,
      verificationAdvice: data.verificationAdvice || 'Verify credentials, publication date, and primary source corroboration.',
      milRecommendation: data.milRecommendation || 'Practice the 6-point MIL check before sharing fast.',
      source: 'ai',
    };
  } catch (error) {
    // Network offline, timeout, or local dev without serverless api -> seamless fallback
    return getFallbackAnalysis(scenario);
  }
}

/**
 * Local Pre-Written MIL Analysis Engine (Offline Fallback)
 * Ensures 100% application reliability under all network and key conditions.
 */
function getFallbackAnalysis(scenario: Scenario): AIServiceResponse {
  return {
    trustworthinessAnalysis: `This ${scenario.platform} scenario uses polished formatting and ${
      scenario.socialProof !== 'none' ? 'high engagement statistics' : 'authoritative phrasing'
    } which often makes content feel immediately reliable.`,
    verificationAdvice: scenario.explanation,
    milRecommendation: `Check whether the publisher (${scenario.author.name}) is verified by independent research registries or official international monitoring databases.`,
    source: 'fallback',
  };
}
