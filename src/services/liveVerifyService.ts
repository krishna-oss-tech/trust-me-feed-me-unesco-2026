import type { LiveClaimVerificationResult } from '../types';

/**
 * Live Claim Verification Service
 * 
 * Securely communicates with /api/verify-claim to perform Tavily-backed search
 * and server-side MIL synthesis.
 * Never stores or transmits API keys client-side.
 */
export async function verifyLiveClaim(claim: string): Promise<LiveClaimVerificationResult> {
  const trimmed = claim.trim();
  if (!trimmed) {
    throw new Error('Claim cannot be empty');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('/api/verify-claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claim: trimmed }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        verdict: 'INSUFFICIENT_EVIDENCE',
        confidence: 'LOW',
        source: 'Live verification endpoint returned non-200 status.',
        date: 'N/A',
        evidence: 'Unable to complete live claim verification at this time.',
        context: 'Server returned an error response.',
        media: 'Not applicable — no image or video was supplied',
        consensus: 'Unavailable.',
        limitations: 'Live check service unavailable.',
        sources: [],
        isUnavailable: true,
        statusMessage: `Service returned status ${response.status}`,
      };
    }

    const data: LiveClaimVerificationResult = await response.json();
    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    return {
      verdict: 'INSUFFICIENT_EVIDENCE',
      confidence: 'LOW',
      source: 'Network or timeout error.',
      date: 'N/A',
      evidence: 'Request timed out or local development server does not host serverless API routes.',
      context: 'Offline mode or serverless endpoint unreachable.',
      media: 'Not applicable — no image or video was supplied',
      consensus: 'Unavailable without live serverless deployment.',
      limitations: 'Local offline simulation active.',
      sources: [],
      isUnavailable: true,
      statusMessage: error?.name === 'AbortError' ? 'Request timed out' : 'Network offline or local dev',
    };
  }
}
