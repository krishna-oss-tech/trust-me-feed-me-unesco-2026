export type ActionType = 'TRUST' | 'VERIFY' | 'REJECT';

export type PlatformType = 
  | 'AI Assistant' 
  | 'Social Media' 
  | 'News Outlet' 
  | 'Influencer Channel' 
  | 'Viral Forum';

export interface VerificationDetails {
  source: string;
  date: string;
  evidence: string;
  context: string;
  media: string;
  consensus: string;
}

export interface ScenarioContent {
  headline?: string;
  body: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'chart' | 'quote' | 'code';
  mediaCaption?: string;
  stats?: {
    likes?: string;
    shares?: string;
    comments?: string;
    views?: string;
  };
}

export interface Scenario {
  id: string;
  category: 
    | 'ai_answer'
    | 'ai_hallucination'
    | 'outdated_info'
    | 'misleading_headline'
    | 'clickbait'
    | 'influencer_claim'
    | 'viral_post'
    | 'misleading_statistic'
    | 'image_out_of_context'
    | 'emotional_manipulation'
    | 'fake_consensus'
    | 'source_credibility'
    | 'confirmation_bias'
    | 'selective_info'
    | 'mixed_ai_social';
  categoryLabel: string;
  platform: PlatformType;
  author: {
    name: string;
    handle?: string;
    avatar?: string;
    verified?: boolean;
    badge?: string;
  };
  timestamp: string;
  content: ScenarioContent;
  correctStatus: ActionType;
  emotionLevel: 'low' | 'medium' | 'high';
  sensationalismLevel: 'low' | 'medium' | 'high';
  sourceStrength: 'verified' | 'unclear' | 'anonymous' | 'suspicious';
  aiGenerated: boolean;
  outdated: boolean;
  socialProof: 'none' | 'moderate' | 'high' | 'massive';
  explanation: string;
  verification: VerificationDetails;
  askReason?: boolean;
}

export interface UserChoice {
  scenarioId: string;
  action: ActionType;
  reason?: string;
  timestamp: number;
}

export interface BehaviourMetrics {
  trustCount: number;
  verifyCount: number;
  rejectCount: number;
  fastTrust: number;            // 0 - 100
  verificationHabit: number;    // 0 - 100
  emotionInfluence: number;     // 0 - 100
  socialProofInfluence: number; // 0 - 100
  aiTrust: number;              // 0 - 100
  sourceChecking: number;       // 0 - 100
  accuracyScore: number;        // 0 - 100 educational indicator
}

export interface InformationProfile {
  metrics: BehaviourMetrics;
  archetypeTitle: string;
  archetypeSubtitle: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  recommendations: string[];
}

export interface FeedItem {
  id: string;
  platform: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  timestamp: string;
  headline?: string;
  content: string;
  mediaUrl?: string;
  stats: {
    likes: string;
    shares: string;
    comments: string;
  };
  tags: string[];
  triggerTrait: 'emotion' | 'socialProof' | 'ai' | 'verification' | 'balanced';
  explanation: string;
}

export interface AIServiceResponse {
  trustworthinessAnalysis: string;
  verificationAdvice: string;
  milRecommendation: string;
  source: 'ai' | 'fallback';
}
