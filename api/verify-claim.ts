/**
 * Serverless Vercel Function: /api/verify-claim
 * 
 * Secure real-time claim verification MVP using Tavily Web Search + Server-side AI synthesis.
 * Never exposes TAVILY_API_KEY or AI_API_KEY to the browser.
 */

export const config = {
  runtime: 'edge', // Fast edge runtime for low-latency search + AI synthesis
};

interface VerifyClaimPayload {
  claim?: string;
}

interface TavilySearchResult {
  title?: string;
  url?: string;
  content?: string;
  published_date?: string;
  score?: number;
}

export default async function handler(req: Request): Promise<Response> {
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

    // If Tavily key is not configured, return clear unavailable state without crashing
    if (!tavilyApiKey) {
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

    // Step 1: Execute Tavily Web Search with 8s timeout
    const tavilyController = new AbortController();
    const tavilyTimeoutId = setTimeout(() => tavilyController.abort(), 8000);

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
          max_results: 5,
          include_answer: false,
          include_raw_content: false,
        }),
        signal: tavilyController.signal,
      });

      clearTimeout(tavilyTimeoutId);

      if (tavilyRes.ok) {
        const tavilyData = await tavilyRes.json();
        rawSources = (tavilyData.results || []).slice(0, 5);
      }
    } catch {
      clearTimeout(tavilyTimeoutId);
      // Tavily call timed out or failed
    }

    // Format sanitized source objects
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
        title: (item.title || domain).slice(0, 150),
        url: item.url || '',
        domain,
        snippet: (item.content || '').slice(0, 300),
        publishedDate: item.published_date,
      };
    });

    if (sources.length === 0) {
      return new Response(
        JSON.stringify({
          verdict: 'INSUFFICIENT_EVIDENCE',
          confidence: 'LOW',
          source: 'No authoritative public indexed sources found for this query.',
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

    // If AI key is missing, return sources with analysis unavailable state
    if (!aiApiKey) {
      return new Response(
        JSON.stringify({
          verdict: 'INSUFFICIENT_EVIDENCE',
          confidence: 'MEDIUM',
          source: `Retrieved ${sources.length} sources from live web index.`,
          date: 'Recent web indexed entries.',
          evidence: 'Search results retrieved successfully, but AI synthesis key is not configured.',
          context: 'Review the attached direct source links below.',
          media: 'Not applicable — no image or video was supplied',
          consensus: 'Manual review of the attached links is advised.',
          limitations: 'AI synthesis engine not configured.',
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

    // Step 2: Server-side AI Synthesis using OpenAI / compatible endpoint
    const sourcesSummary = sources
      .map(
        (s, idx) =>
          `[Source ${idx + 1}] Title: ${s.title} | Domain: ${s.domain} | URL: ${s.url}\nExcerpt: ${s.snippet}`
      )
      .join('\n\n');

    const aiController = new AbortController();
    const aiTimeoutId = setTimeout(() => aiController.abort(), 9000);

    try {
      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert UNESCO Media and Information Literacy (MIL) verification analyst. Reason strictly and primarily from the provided search sources. Do not invent facts or citations. If evidence contradicts the claim, choose CONTRADICTED. If evidence supports it, choose SUPPORTED. If conflicting or nuanced, choose MIXED. If sources are insufficient, choose INSUFFICIENT_EVIDENCE. Respond strictly in valid JSON matching the requested schema with no markdown formatting.',
            },
            {
              role: 'user',
              content: `Claim to evaluate: "${claim}"\n\nRetrieved Search Sources:\n${sourcesSummary}\n\nReturn strict JSON with exact keys:\n{\n  "verdict": "SUPPORTED" | "CONTRADICTED" | "MIXED" | "INSUFFICIENT_EVIDENCE",\n  "confidence": "HIGH" | "MEDIUM" | "LOW",\n  "source": "concise assessment of source reliability and publisher credibility",\n  "date": "concise assessment of timeliness and publication dates",\n  "evidence": "concise factual evidence assessment strictly from sources",\n  "context": "concise analysis of missing context or deceptive framing",\n  "media": "Not applicable — no image or video was supplied",\n  "consensus": "concise summary of scientific/institutional consensus from sources",\n  "limitations": "concise note on any evidence gaps or search limitations"\n}`,
            },
          ],
          max_tokens: 450,
          temperature: 0.2,
        }),
        signal: aiController.signal,
      });

      clearTimeout(aiTimeoutId);

      if (!aiRes.ok) {
        throw new Error(`AI API returned status ${aiRes.status}`);
      }

      const aiData = await aiRes.json();
      let rawText = (aiData.choices?.[0]?.message?.content || '').trim();

      // Clean markdown codeblocks if model wrapped output in ```json
      if (rawText.startsWith('```')) {
        rawText = rawText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
      }

      const parsed = JSON.parse(rawText);

      // Validate verdict
      const validVerdicts = ['SUPPORTED', 'CONTRADICTED', 'MIXED', 'INSUFFICIENT_EVIDENCE'];
      const verdict = validVerdicts.includes(parsed.verdict) ? parsed.verdict : 'MIXED';

      const validConfidences = ['HIGH', 'MEDIUM', 'LOW'];
      const confidence = validConfidences.includes(parsed.confidence) ? parsed.confidence : 'MEDIUM';

      return new Response(
        JSON.stringify({
          verdict,
          confidence,
          source: parsed.source || 'Assessed based on retrieved domain records.',
          date: parsed.date || 'Assessed from indexed timestamps.',
          evidence: parsed.evidence || 'Synthesized from search excerpts.',
          context: parsed.context || 'Evaluated for missing contextual details.',
          media: parsed.media || 'Not applicable — no image or video was supplied',
          consensus: parsed.consensus || 'Assessed across multi-source coverage.',
          limitations: parsed.limitations || 'Limited to open indexed public web sources.',
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
    } catch {
      clearTimeout(aiTimeoutId);
      // AI synthesis failed -> return sources + fallback summary
      return new Response(
        JSON.stringify({
          verdict: 'INSUFFICIENT_EVIDENCE',
          confidence: 'LOW',
          source: `Retrieved ${sources.length} sources from live web index.`,
          date: 'Recent web indexed entries.',
          evidence: 'Search completed successfully, but AI synthesis encountered an error.',
          context: 'Inspect the primary source URLs below.',
          media: 'Not applicable — no image or video was supplied',
          consensus: 'Review external source links directly for consensus.',
          limitations: 'AI synthesis service unavailable.',
          sources,
          isUnavailable: false,
          statusMessage: 'Search completed. AI synthesis timed out or failed.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch {
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
