/**
 * Serverless Vercel Function: /api/verify-claim
 * 
 * High-performance real-time claim verification pipeline:
 * 1. Tavily web search (fast 3.5s budget, top 3-4 concise sources)
 * 2. Server-side AI synthesis (fast json_object mode, concise 280 token budget)
 * 3. Unified 8.5s request execution window with safe structured fallback
 */

export const config = {
  runtime: 'edge',
};

interface VerifyClaimPayload {
  claim?: string;
}

interface TavilySearchResult {
  title?: string;
  url?: string;
  content?: string;
  published_date?: string;
}

export default async function handler(req: Request): Promise<Response> {
  const startTime = Date.now();

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let payload: VerifyClaimPayload;
    try {
      payload = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const claim = (payload.claim || '').trim();

    if (!claim) {
      return new Response(JSON.stringify({ error: 'Claim cannot be empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (claim.length > 500) {
      return new Response(JSON.stringify({ error: 'Claim exceeds maximum allowed length (500 characters)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tavilyApiKey = process.env.TAVILY_API_KEY;
    const aiApiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    // If Tavily key is unconfigured, return clear structured status
    if (!tavilyApiKey) {
      console.warn('[verify-claim] TAVILY_API_KEY is not configured on server.');
      return new Response(
        JSON.stringify({
          verdict: 'INSUFFICIENT_EVIDENCE',
          confidence: 'LOW',
          source: 'Live web search index unconfigured.',
          date: 'N/A',
          evidence: 'Live search API is not configured on the server. Please add TAVILY_API_KEY to server environment variables.',
          context: 'Real-time search index was not accessible.',
          media: 'Not applicable — no image or video was supplied',
          consensus: 'Live consensus check requires active web search.',
          limitations: 'TAVILY_API_KEY missing from server configuration.',
          sources: [],
          isUnavailable: true,
          statusMessage: 'Live search is currently unconfigured on this deployment.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Step 1: Tavily Search with 3.5s budget
    const tavilyStart = Date.now();
    const tavilyController = new AbortController();
    const tavilyTimeoutId = setTimeout(() => tavilyController.abort(), 3500);

    let rawSources: TavilySearchResult[] = [];
    try {
      const tavilyRes = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: tavilyApiKey,
          query: claim,
          search_depth: 'basic',
          max_results: 4,
          include_answer: false,
          include_raw_content: false,
        }),
        signal: tavilyController.signal,
      });

      clearTimeout(tavilyTimeoutId);

      if (tavilyRes.ok) {
        const tavilyData = await tavilyRes.json();
        rawSources = (tavilyData.results || []).slice(0, 4);
      } else {
        console.warn(`[verify-claim] Tavily API returned status ${tavilyRes.status}`);
      }
    } catch (tavilyErr: any) {
      clearTimeout(tavilyTimeoutId);
      console.warn(`[verify-claim] Tavily fetch error (${tavilyErr?.name || 'unknown'})`);
    }

    const tavilyDuration = Date.now() - tavilyStart;

    // Sanitize and format compact sources (top 3-4, concise snippets)
    const sources = rawSources.map((item) => {
      let domain = 'web source';
      try {
        if (item.url) {
          domain = new URL(item.url).hostname.replace(/^www\./, '');
        }
      } catch {
        domain = 'web source';
      }

      return {
        title: (item.title || domain).slice(0, 100),
        url: item.url || '',
        domain,
        snippet: (item.content || '').slice(0, 160),
        publishedDate: item.published_date,
      };
    });

    // If zero sources found
    if (sources.length === 0) {
      console.log(`[verify-claim] 0 sources found in ${tavilyDuration}ms`);
      return new Response(
        JSON.stringify({
          verdict: 'INSUFFICIENT_EVIDENCE',
          confidence: 'LOW',
          source: 'No indexed sources matched this query.',
          date: 'N/A',
          evidence: 'Live search returned zero matching indexed web results for this specific wording.',
          context: 'The claim may be too recent, highly localized, or framed ambiguously.',
          media: 'Not applicable — no image or video was supplied',
          consensus: 'Insufficient public corroboration available.',
          limitations: 'Web search query yielded no verifiable citations.',
          sources: [],
          isUnavailable: false,
          statusMessage: 'No indexed sources matched this query.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // If AI key is missing, return sources with search-only status
    if (!aiApiKey) {
      console.warn('[verify-claim] AI_API_KEY is not configured on server.');
      return new Response(
        JSON.stringify({
          verdict: 'INSUFFICIENT_EVIDENCE',
          confidence: 'MEDIUM',
          source: `Retrieved ${sources.length} sources from live web index.`,
          date: 'Recent web indexed entries.',
          evidence: 'Search results retrieved successfully, but AI synthesis key is not configured on server.',
          context: 'Review the attached direct source links below.',
          media: 'Not applicable — no image or video was supplied',
          consensus: 'Manual review of the attached links is advised.',
          limitations: 'AI synthesis engine unconfigured.',
          sources,
          isUnavailable: false,
          statusMessage: 'Web search succeeded. AI synthesis engine unconfigured.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Step 2: AI Synthesis with JSON mode and remaining time budget (max 5s)
    const elapsedBeforeAi = Date.now() - startTime;
    const aiBudget = Math.max(3000, Math.min(5000, 8500 - elapsedBeforeAi));

    const sourcesSummary = sources
      .map(
        (s, idx) =>
          `[Source ${idx + 1}] (${s.domain}): ${s.title} — "${s.snippet}"`
      )
      .join('\n');

    const aiStart = Date.now();
    const aiController = new AbortController();
    const aiTimeoutId = setTimeout(() => aiController.abort(), aiBudget);

    try {
      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You are a UNESCO Media & Information Literacy (MIL) verification assistant. Evaluate the user claim strictly against the provided search sources. Keep each assessment field concise (1-2 sentences). Respond with a JSON object containing keys: verdict (SUPPORTED|CONTRADICTED|MIXED|INSUFFICIENT_EVIDENCE), confidence (HIGH|MEDIUM|LOW), source, date, evidence, context, media, consensus, limitations.',
            },
            {
              role: 'user',
              content: `Claim: "${claim}"\n\nSearch Results:\n${sourcesSummary}\n\nReturn structured MIL evaluation JSON. For media, use "Not applicable — no image or video was supplied".`,
            },
          ],
          max_tokens: 280,
          temperature: 0.1,
        }),
        signal: aiController.signal,
      });

      clearTimeout(aiTimeoutId);
      const aiDuration = Date.now() - aiStart;

      if (!aiRes.ok) {
        console.warn(`[verify-claim] OpenAI returned status ${aiRes.status} in ${aiDuration}ms`);
        throw new Error(`AI API returned status ${aiRes.status}`);
      }

      const aiData = await aiRes.json();
      const rawText = aiData.choices?.[0]?.message?.content?.trim() || '{}';
      const parsed = JSON.parse(rawText);

      // Validate verdict
      const validVerdicts = ['SUPPORTED', 'CONTRADICTED', 'MIXED', 'INSUFFICIENT_EVIDENCE'];
      const verdict = validVerdicts.includes(parsed.verdict) ? parsed.verdict : 'MIXED';

      const validConfidences = ['HIGH', 'MEDIUM', 'LOW'];
      const confidence = validConfidences.includes(parsed.confidence) ? parsed.confidence : 'MEDIUM';

      const totalTime = Date.now() - startTime;
      console.log(`[verify-claim] SUCCESS total=${totalTime}ms (tavily=${tavilyDuration}ms, ai=${aiDuration}ms) verdict=${verdict}`);

      return new Response(
        JSON.stringify({
          verdict,
          confidence,
          source: parsed.source || `Evaluated from ${sources.length} indexed domain records.`,
          date: parsed.date || 'Evaluated from indexed source timestamps.',
          evidence: parsed.evidence || 'Synthesized from retrieved search evidence.',
          context: parsed.context || 'Context evaluated against live reporting.',
          media: parsed.media || 'Not applicable — no image or video was supplied',
          consensus: parsed.consensus || 'Consensus determined across multi-source coverage.',
          limitations: parsed.limitations || 'Analysis limited to publicly indexed web sources.',
          sources,
          isUnavailable: false,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    } catch (aiErr: any) {
      clearTimeout(aiTimeoutId);
      const aiDuration = Date.now() - aiStart;
      console.warn(`[verify-claim] AI synthesis failed/timed-out (${aiErr?.name || 'error'}) in ${aiDuration}ms. Returning sources.`);

      // Fast fallback returning live sources so user still sees the evidence
      return new Response(
        JSON.stringify({
          verdict: 'INSUFFICIENT_EVIDENCE',
          confidence: 'LOW',
          source: `Retrieved ${sources.length} live web sources.`,
          date: 'Recent web entries.',
          evidence: 'Live sources retrieved successfully. Automated synthesis timed out.',
          context: 'Inspect the primary sources attached below.',
          media: 'Not applicable — no image or video was supplied',
          consensus: 'Review direct citations for multi-source confirmation.',
          limitations: 'AI synthesis timed out; primary sources provided directly.',
          sources,
          isUnavailable: false,
          statusMessage: 'Sources retrieved. Direct links available below.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (err: any) {
    console.error('[verify-claim] Top-level handler error', err);
    return new Response(
      JSON.stringify({
        error: 'Internal server error processing live claim check',
        isUnavailable: true,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
