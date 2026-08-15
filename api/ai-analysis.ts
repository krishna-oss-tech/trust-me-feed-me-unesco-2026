/**
 * Serverless Vercel Function: /api/ai-analysis
 * 
 * Securely handles AI Media & Information Literacy (MIL) insights on the server.
 * Uses server-side AI_API_KEY (or OPENAI_API_KEY / GEMINI_API_KEY).
 * 
 * Never exposes API keys or raw internal provider errors to the client.
 */

export const config = {
  runtime: 'edge', // Fast edge runtime for low-latency AI proxying
};

interface RequestPayload {
  headline?: string;
  body?: string;
  platform?: string;
  categoryLabel?: string;
}

export default async function handler(req: Request): Promise<Response> {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let payload: RequestPayload;
    try {
      payload = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { headline = '', body = '', platform = 'Online Media', categoryLabel = 'Information Scenario' } = payload;

    if (!body && !headline) {
      return new Response(JSON.stringify({ error: 'Missing scenario content' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Retrieve server-side secret key (never client-side VITE_ variable)
    const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Key not configured on server - signal fallback gracefully
      return new Response(
        JSON.stringify({
          error: 'AI service not configured on server',
          fallback: true,
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Set 8-second timeout for external AI provider request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert UNESCO Media & Information Literacy (MIL) assistant for youth. Explain in under 70 simple words why the scenario looks trustworthy or tricky, what to check, and give one simple MIL tip. Keep tone objective, educational, and clear.',
            },
            {
              role: 'user',
              content: `Analyze this content scenario from ${platform} [${categoryLabel}]:\nHeadline: "${headline}"\nBody: "${body}"\n\nExplain why it might appear convincing and give one specific MIL verification tip.`,
            },
          ],
          max_tokens: 160,
          temperature: 0.3,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return new Response(
          JSON.stringify({
            error: 'AI provider returned non-200 status',
            fallback: true,
          }),
          {
            status: 502,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content?.trim() || '';

      return new Response(
        JSON.stringify({
          trustworthinessAnalysis: text,
          verificationAdvice: 'Verify credentials, publication date, and primary source corroboration.',
          milRecommendation: 'Practice the 6-point MIL check before sharing fast.',
          source: 'ai',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
          },
        }
      );
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      const isTimeout = fetchErr?.name === 'AbortError';
      return new Response(
        JSON.stringify({
          error: isTimeout ? 'AI request timed out' : 'Failed to reach AI provider',
          fallback: true,
        }),
        {
          status: isTimeout ? 504 : 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        fallback: true,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
