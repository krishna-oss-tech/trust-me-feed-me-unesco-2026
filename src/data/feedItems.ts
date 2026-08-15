import { FeedItem } from '../types';

export const FEED_POOL: FeedItem[] = [
  // EMOTION TRAIT ITEMS
  {
    id: 'f_emo_1',
    platform: 'Viral Trend',
    author: {
      name: 'Outrage Daily',
      handle: '@outragedaily_live',
      avatar: '🔥'
    },
    timestamp: '10m ago',
    headline: 'YOU WON\'T BELIEVE WHAT THEY ARE PLANNING FOR NEXT MONTH!',
    content: 'Unbelievable betrayal! Secret plans leaked showing immediate price hikes on basic groceries! Share this before it gets deleted from social platforms!',
    stats: { likes: '184.2k', shares: '92.1k', comments: '14.5k' },
    tags: ['Sensational', 'High Emotion', 'Urgent Share Prompt'],
    triggerTrait: 'emotion',
    explanation: 'Populated because your choices showed responsiveness to high-emotion and sensational framing.'
  },
  {
    id: 'f_emo_2',
    platform: 'Social Stream',
    author: {
      name: 'MindBlower Posts',
      handle: '@mindblower_now',
      avatar: '⚡'
    },
    timestamp: '25m ago',
    headline: 'Shocking Discovery inside Everyday Bottled Drinks!',
    content: 'Independent lab claims hidden magnetic nanobots found in popular sodas! Millions of viewers are panicking in the comment section right now!',
    stats: { likes: '310.5k', shares: '140.8k', comments: '28.9k' },
    tags: ['Fear Framing', 'Unverified Lab Claim', 'Viral Alarm'],
    triggerTrait: 'emotion',
    explanation: 'Appeared because your simulation choices frequently trusted high-sensationalism content.'
  },

  // SOCIAL PROOF TRAIT ITEMS
  {
    id: 'f_soc_1',
    platform: 'Trending Forum',
    author: {
      name: 'Viral Vault',
      handle: '@viralvault_official',
      avatar: '🚀',
      verified: true
    },
    timestamp: '12m ago',
    headline: '1,000,000 People Are Doing This 5-Minute Morning Reset!',
    content: 'Everyone on your feed is talking about this! Over 800,000 five-star reviews confirm it cures burnout in 48 hours! Don\'t get left behind!',
    stats: { likes: '512.9k', shares: '204.3k', comments: '31.2k' },
    tags: ['Massive Engagement', 'Bandwagon Appeal', 'Trend Hype'],
    triggerTrait: 'socialProof',
    explanation: 'Appeared because your choices leaned toward trusting posts with high social proof and massive engagement.'
  },
  {
    id: 'f_soc_2',
    platform: 'Influencer Feed',
    author: {
      name: 'Trendsetter Max',
      handle: '@max_trends',
      avatar: '🌟',
      verified: true
    },
    timestamp: '40m ago',
    headline: 'Top 10 Gadgets Breaking the Internet Right Now',
    content: 'Over 500k likes in 2 hours! Everyone in the comments says this $15 item replaced their entire laptop setups!',
    stats: { likes: '420.1k', shares: '88.4k', comments: '19.5k' },
    tags: ['Viral Proof', 'Astroturfing Comments', 'High Share Rate'],
    triggerTrait: 'socialProof',
    explanation: 'Selected due to high social proof influence metrics in your session profile.'
  },

  // AI TRAIT ITEMS
  {
    id: 'f_ai_1',
    platform: 'Synthetic Digest',
    author: {
      name: 'AI Synthesizer v5',
      handle: '@ai_daily_digest',
      avatar: '🤖'
    },
    timestamp: '5m ago',
    headline: 'Automated Multi-Source Knowledge Summary',
    content: 'AI Synthesis: Analysis of 4,000 research papers suggests customized micro-learning sessions boost skill retention by 32% compared to traditional 2-hour lectures.',
    stats: { likes: '45.1k', shares: '12.8k', comments: '2.1k' },
    tags: ['AI Summary', 'Algorithmic Digest', 'Synthetic Knowledge'],
    triggerTrait: 'ai',
    explanation: 'Populated because your profile metrics showed high trust toward AI-generated summaries and responses.'
  },
  {
    id: 'f_ai_2',
    platform: 'AI News Assistant',
    author: {
      name: 'HyperBot Science',
      handle: '@hyperbot_sci',
      avatar: '🧠'
    },
    timestamp: '18m ago',
    headline: 'AI Instant Translation of Ancient Manuscripts',
    content: 'Generative AI model decodes 2,500-year-old clay tablets in 12 seconds, revealing ancient agricultural trading logs across Mesopotamia.',
    stats: { likes: '89.0k', shares: '24.1k', comments: '4.8k' },
    tags: ['AI Breakthrough', 'Automated Curation', 'Synthetic Analysis'],
    triggerTrait: 'ai',
    explanation: 'Matched to your profile\'s high openness to AI-assisted content.'
  },

  // VERIFICATION / SOURCE CHECKING TRAIT ITEMS
  {
    id: 'f_ver_1',
    platform: 'Open Research Wire',
    author: {
      name: 'FactCheck Science Journal',
      handle: '@factcheck_sci',
      avatar: '🔬',
      verified: true
    },
    timestamp: '15m ago',
    headline: 'Context Check: Claims of Sudden Ice Sheet Surge Investigated',
    content: 'Independent satellite imagery cross-referenced by national climate institutes confirms normal seasonal melting cycles. Full open methodology and raw dataset links attached.',
    stats: { likes: '18.4k', shares: '9.2k', comments: '840' },
    tags: ['Peer-Reviewed', 'Open Data', 'Source Verified', 'Contextual'],
    triggerTrait: 'verification',
    explanation: 'Populated because your strong verification habit created a feed rich in evidence-backed, source-checked content.'
  },
  {
    id: 'f_ver_2',
    platform: 'International Fact Network',
    author: {
      name: 'Global Verifier Org',
      handle: '@global_verifier',
      avatar: '🛡️',
      verified: true
    },
    timestamp: '30m ago',
    headline: 'Debunked: Recycled 2019 Storm Video Circulating as Live Event',
    content: 'Reverse image analysis verifies viral tornado footage originated in May 2019 in Kansas. No active severe storm warnings exist in the claimed region today.',
    stats: { likes: '22.9k', shares: '14.1k', comments: '1.1k' },
    tags: ['Reverse Search Verified', 'Fact Check', 'Archival Correction'],
    triggerTrait: 'verification',
    explanation: 'Appeared because your profile prioritized source checking and verification before acceptance.'
  },

  // BALANCED TRAIT ITEMS
  {
    id: 'f_bal_1',
    platform: 'Global News Exchange',
    author: {
      name: 'UNESCO Youth Observer',
      handle: '@unesco_youth_mil',
      avatar: '🌐',
      verified: true
    },
    timestamp: '1h ago',
    headline: 'Media & Information Literacy Education Expands Worldwide',
    content: 'New interactive digital citizenship programs empower young creators to evaluate generative AI, spot algorithmic bias, and build healthy online environments.',
    stats: { likes: '34.2k', shares: '11.5k', comments: '1.4k' },
    tags: ['UNESCO MIL', 'Digital Citizenship', 'Youth Empowerment'],
    triggerTrait: 'balanced',
    explanation: 'Appeared as part of a balanced, multi-perspective information ecosystem.'
  },
  {
    id: 'f_bal_2',
    platform: 'Tech & Society Review',
    author: {
      name: 'Digital Ethics Lab',
      handle: '@digital_ethics',
      avatar: '⚖️',
      verified: true
    },
    timestamp: '2h ago',
    headline: 'How Recommendation Algorithms Shape User Perception',
    content: 'Researchers highlight how repeated user interactions with sensational content train platform algorithms to deliver increasingly polarized feeds.',
    stats: { likes: '28.7k', shares: '8.4k', comments: '950' },
    tags: ['Algorithm Literacy', 'Educational', 'Nuanced Insight'],
    triggerTrait: 'balanced',
    explanation: 'Balanced item reflecting healthy media exploration.'
  }
];
