import type { AIServiceResponse, Scenario } from '../types';


/**
 * AI Service Abstraction Layer
 * 
 * Provides dynamic AI insights if an API key is provided via env variables.
 * Automatically falls back to local pre-written explanations if API key is absent,
 * network is offline, or API request fails.
 */
export async function getAIScenarioAnalysis(scenario: Scenario): Promise<AIServiceResponse> {
  const apiKey = import.meta.env.VITE_AI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return getFallbackAnalysis(scenario);
  }

  try {
    // Optional API Integration Call (e.g. OpenAI / Gemini compatibility endpoint)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert Media & Information Literacy (MIL) assistant for youth. Keep explanations simple, under 70 words, neutral, and clear.'
          },
          {
            role: 'user',
            content: `Analyze this content scenario: Headline: "${scenario.content.headline || ''}", Body: "${scenario.content.body}". Why might it look trustworthy? What should be verified? Give one simple MIL tip.`
          }
        ],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`AI API returned status ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';

    return {
      trustworthinessAnalysis: text,
      verificationAdvice: `Verify credentials, publication date, and primary source corroboration.`,
      milRecommendation: `Practice the 6-point MIL check before sharing fast.`,
      source: 'ai'
    };
  } catch (error) {
    console.warn('AI API call failed or unavailable. Falling back to local offline MIL analysis engine.', error);
    return getFallbackAnalysis(scenario);
  }
}

function getFallbackAnalysis(scenario: Scenario): AIServiceResponse {
  return {
    trustworthinessAnalysis: `This ${scenario.platform} scenario uses polished formatting and ${
      scenario.socialProof !== 'none' ? 'high engagement statistics' : 'authoritative phrasing'
    } which often makes content feel immediately reliable.`,
    verificationAdvice: scenario.explanation,
    milRecommendation: `Check whether the publisher (${scenario.author.name}) is verified by independent research registries or official international monitoring databases.`,
    source: 'fallback'
  };
}
