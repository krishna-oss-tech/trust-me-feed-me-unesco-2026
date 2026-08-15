import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 's01',
    category: 'ai_answer',
    categoryLabel: 'AI ANSWER WITH CITATIONS',
    platform: 'AI Assistant',
    author: {
      name: 'OmniAI Knowledge Hub',
      badge: 'Verified Model v4.2',
      avatar: '🤖'
    },
    timestamp: 'Just now',
    content: {
      headline: 'UNESCO World Heritage Preservation Data',
      body: 'According to UNESCO\'s 2024 official report, over 1,150 sites across 168 countries are designated as World Heritage sites. The organization allocates priority conservation funds based on periodic monitoring reports from independent cultural heritage experts.',
      stats: {
        views: '12.4k'
      }
    },
    correctStatus: 'TRUST',
    emotionLevel: 'low',
    sensationalismLevel: 'low',
    sourceStrength: 'verified',
    aiGenerated: true,
    outdated: false,
    socialProof: 'none',
    explanation: 'This AI summary relies on official UNESCO public datasets, provides factual non-sensational statistics, and attributes data directly to verifiable international monitoring bodies.',
    verification: {
      source: 'UNESCO Official World Heritage Centre Repository & 2024 State of Conservation reports.',
      date: 'Updated annually; 2024 data match current official archives.',
      evidence: 'Multiple cross-national expert panels publish open-access reports on UNESCO.org.',
      context: 'Summarizes international heritage counts accurately without exaggeration.',
      media: 'Textual data directly mirrors open UNESCO database figures.',
      consensus: 'Universal consensus among international cultural preservation organizations.'
    },
    askReason: true
  },
  {
    id: 's02',
    category: 'ai_hallucination',
    categoryLabel: 'AI SYNTHETIC RESPONSE',
    platform: 'AI Assistant',
    author: {
      name: 'Nexus Research Bot',
      badge: 'AI Assistant',
      avatar: '⚡'
    },
    timestamp: '2 mins ago',
    content: {
      headline: 'Breakthrough Study on Phone Screens',
      body: 'A 2025 study published in the *Journal of Advanced Neural Optometry* by Dr. Aris Thorne proved that looking at smartphone screens in dark rooms regenerates eye retinal cells by 14% every week through targeted blue-light photon stimulation.',
      stats: {
        views: '45.1k'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'low',
    sensationalismLevel: 'medium',
    sourceStrength: 'unclear',
    aiGenerated: true,
    outdated: false,
    socialProof: 'none',
    explanation: 'AI systems frequently generate authoritative-sounding names, scientists, and journal titles that do not exist (AI Hallucination). A quick check shows no such journal or medical findings.',
    verification: {
      source: 'Neither the "Journal of Advanced Neural Optometry" nor "Dr. Aris Thorne" exist in PubMed or PubMed Central.',
      date: 'Cited as "2025 study", but no index record exists.',
      evidence: 'Medical consensus confirms prolonged dark-room screen exposure causes digital eye strain, not retinal regeneration.',
      context: 'AI hallucinated a biological mechanism to answer a user prompt convincingly.',
      media: 'N/A',
      consensus: 'Ophthalmology medical boards globally contradict this claim.'
    },
    askReason: true
  },
  {
    id: 's03',
    category: 'outdated_info',
    categoryLabel: 'VIRAL NEWS REPOST',
    platform: 'Social Media',
    author: {
      name: 'Global Alert Network',
      handle: '@GlobalAlertsNow',
      avatar: '🌐',
      verified: true
    },
    timestamp: '15 mins ago',
    content: {
      headline: 'BREAKING: Major Volcanic Eruption Triggers Coastal Tsunami Warning!',
      body: 'URGENT: Coastal residents are urged to evacuate immediately as massive volcanic ash clouds disrupt international airspace and cause 4-meter ocean surges!',
      mediaUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      mediaCaption: 'Satellite thermal radar capture of sudden plume movement.',
      stats: {
        likes: '89.4k',
        shares: '42.1k',
        comments: '3.8k'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'unclear',
    aiGenerated: false,
    outdated: true,
    socialProof: 'high',
    explanation: 'The video clip and alert attached to this post are from an eruption in 2018. Outdated disaster footage is frequently recirculated during quiet news cycles to harvest viral clicks.',
    verification: {
      source: 'Reverse image search traces satellite photos back to January 2018.',
      date: 'Original incident occurred 8 years ago; no active tsunami advisory exists today.',
      evidence: 'Official Meteorological Agency & Pacific Tsunami Warning Center list green alert status.',
      context: 'Post omits publication year to create false real-time urgency.',
      media: 'Archival footage recycled as live news.',
      consensus: 'Disaster management authorities confirm no current emergency.'
    },
    askReason: true
  },
  {
    id: 's04',
    category: 'misleading_headline',
    categoryLabel: 'BREAKING NEWS HEADLINE',
    platform: 'News Outlet',
    author: {
      name: 'Daily Tech Insider',
      handle: '@DailyTechInsider',
      avatar: '📰'
    },
    timestamp: '1 hour ago',
    content: {
      headline: 'GLOBAL POWER GRID COLLAPSE IMMINENT AS SOLAR STORM STRIKES EARTH!',
      body: 'Astronomers detected a minor Class-M solar flare today that will cause beautiful auroras in far northern regions. Satellite communications and electrical grids continue operating with zero disruptions.',
      stats: {
        likes: '14.2k',
        shares: '8.9k',
        comments: '1.2k'
      }
    },
    correctStatus: 'REJECT',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'suspicious',
    aiGenerated: false,
    outdated: false,
    socialProof: 'moderate',
    explanation: 'The headline makes an alarming claim ("GLOBAL POWER GRID COLLAPSE IMMINENT") that is directly contradicted by the actual body text ("zero disruptions"). This is classic sensationalized clickbait.',
    verification: {
      source: 'Daily Tech Insider clickbait headline strategy.',
      date: 'Published today.',
      evidence: 'Article body itself admits no power grid failure is occurring.',
      context: 'Headline exaggerates a routine solar flare to provoke panic.',
      media: 'Stock space illustration used to induce anxiety.',
      consensus: 'NOAA Space Weather Prediction Center confirms normal operational status.'
    },
    askReason: true
  },
  {
    id: 's05',
    category: 'clickbait',
    categoryLabel: 'VIRAL BLOG POST',
    platform: 'Social Media',
    author: {
      name: 'LifeHack Central',
      handle: '@LifeHackCentral',
      avatar: '💡'
    },
    timestamp: '3 hours ago',
    content: {
      headline: 'Doctors Are SILENT About This 1 Chemical In Tap Water That Destroys Your Memory!',
      body: 'Tap water contains Dihydrogen Monoxide — a substance found in 100% of cancer cells! Big Pharma doesn\'t want you to know how to flush it out of your system today!',
      stats: {
        likes: '120.5k',
        shares: '68.2k',
        comments: '14.9k'
      }
    },
    correctStatus: 'REJECT',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'suspicious',
    aiGenerated: false,
    outdated: false,
    socialProof: 'massive',
    explanation: 'Dihydrogen Monoxide (H₂O) is simply the chemical name for water. This post uses pseudoscience tricks, fear-mongering terms ("Doctors SILENT", "Big Pharma"), and outrage to manipulate readers.',
    verification: {
      source: 'Known satire/pseudoscientific clickbait trope.',
      date: 'Timeless internet prank converted into fearmongering.',
      evidence: 'Dihydrogen Monoxide is plain water (H₂O), essential for human life.',
      context: 'Deliberately frames basic chemistry terms to sound like toxic threats.',
      media: 'N/A',
      consensus: 'Every health organization & chemist refutes this ridiculous claim.'
    },
    askReason: false
  },
  {
    id: 's06',
    category: 'influencer_claim',
    categoryLabel: 'INFLUENCER SPONSORSHIP',
    platform: 'Influencer Channel',
    author: {
      name: 'Chloe | BioHack Girl',
      handle: '@chloe_biohacks',
      avatar: '✨',
      verified: true
    },
    timestamp: '4 hours ago',
    content: {
      headline: 'How I Fixed My Brain Fog in 24 Hours',
      body: 'Guys!! Stop eating solid food for 3 days and drink this organic pine-needle extract! It completely detoxes microplastics from your brain cells. I feel 300% more focused! Link in bio code CHLOE30 for 20% off!',
      stats: {
        likes: '230.1k',
        shares: '34.5k',
        comments: '8.1k'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'medium',
    sensationalismLevel: 'high',
    sourceStrength: 'unclear',
    aiGenerated: false,
    outdated: false,
    socialProof: 'massive',
    explanation: 'Influencers frequently share anecdotal claims tied to affiliate discount codes. Medical claims regarding "flushing microplastics in 24 hours" require peer-reviewed clinical validation, not sponsored posts.',
    verification: {
      source: 'Personal influencer account monetized with affiliate sales code (CHLOE30).',
      date: 'Current viral post.',
      evidence: 'Zero clinical trials support pine-needle extract for rapid brain microplastic elimination.',
      context: 'Financial conflict of interest drives the miraculous health claim.',
      media: 'Polished aesthetic video disguising commercial sponsorship.',
      consensus: 'Medical & dietetic associations advise against extreme unverified fasts.'
    },
    askReason: true
  },
  {
    id: 's07',
    category: 'viral_post',
    categoryLabel: 'COMMUNITY SOCIAL POST',
    platform: 'Viral Forum',
    author: {
      name: 'Urban Explorer Sam',
      handle: '@sam_explores',
      avatar: '🎒'
    },
    timestamp: '5 hours ago',
    content: {
      headline: 'Eiffel Tower Permanent Shutdown Announced?',
      body: 'City authorities just announced the Eiffel Tower will be permanently closed to tourists starting next month due to structural foundation sinking! Share before they take this down!',
      mediaUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      mediaCaption: 'Photo showing maintenance scaffolding at night.',
      stats: {
        likes: '310.8k',
        shares: '154.2k',
        comments: '22.4k'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'anonymous',
    aiGenerated: false,
    outdated: false,
    socialProof: 'massive',
    explanation: 'High share counts and dramatic prompts ("Share before they take this down!") do not make a story true. Routine maintenance scaffolding was misrepresented as a permanent shutdown.',
    verification: {
      source: 'Anonymous viral social account without official municipal ties.',
      date: 'Posted today during standard repainting maintenance.',
      evidence: 'Official Paris Tourism Office & SETE (Eiffel Tower Operating Co.) publish standard operating schedules.',
      context: 'Scaffolding photo taken out of context to manufacture a viral crisis.',
      media: 'Standard maintenance lighting falsely framed as structural collapse.',
      consensus: 'French national news and tourism portals confirm normal operation.'
    },
    askReason: true
  },
  {
    id: 's08',
    category: 'misleading_statistic',
    categoryLabel: 'DATA & GRAPH VISUALIZATION',
    platform: 'News Outlet',
    author: {
      name: 'Economic Trends Watch',
      handle: '@EconTrends',
      avatar: '📊'
    },
    timestamp: '6 hours ago',
    content: {
      headline: 'STAGGERING JUMP IN YOUTH UNEMPLOYMENT RATE!',
      body: 'New data reveals youth unemployment has SKYROCKETED across the sector! Look at this dramatic spike over the past quarter!',
      mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      mediaType: 'chart',
      mediaCaption: 'Chart showing line rising sharply (Y-Axis truncated between 4.1% and 4.3%).',
      stats: {
        likes: '19.4k',
        shares: '7.1k',
        comments: '3.3k'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'medium',
    sensationalismLevel: 'high',
    sourceStrength: 'unclear',
    aiGenerated: false,
    outdated: false,
    socialProof: 'moderate',
    explanation: 'Truncating the vertical axis (making the Y-axis range 4.1% to 4.3% instead of starting at 0%) makes a tiny 0.2% fluctuation look like a catastrophic spike.',
    verification: {
      source: 'Economic data chart with manipulated axis scale.',
      date: 'Q2 quarterly report.',
      evidence: 'National Bureau of Statistics data shows unemployment shifted from 4.1% to 4.3% — a standard statistical deviation.',
      context: 'Visual scaling trick exaggerates minor variation into alarming headline.',
      media: 'Y-axis cropped to visual slope of 70 degrees.',
      consensus: 'Economists classify 0.2% shift as stable within margin of error.'
    },
    askReason: true
  },
  {
    id: 's09',
    category: 'image_out_of_context',
    categoryLabel: 'PHOTO CONTEXT CHECK',
    platform: 'Social Media',
    author: {
      name: 'Eco Watcher',
      handle: '@ecowatcher_live',
      avatar: '🌱'
    },
    timestamp: '7 hours ago',
    content: {
      headline: 'Devastating Oil Spill Coats Mediterranean Coastline Today',
      body: 'Look at the horrific damage caused by tanker negligence off the coast right now! Local marine life is completely smothered. Why is no mainstream news channel reporting this disaster?',
      mediaUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image',
      mediaCaption: 'Aerial photograph of dark coastal water pollution.',
      stats: {
        likes: '74.2k',
        shares: '38.9k',
        comments: '5.1k'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'unclear',
    aiGenerated: false,
    outdated: true,
    socialProof: 'high',
    explanation: 'Reverse image search reveals this photograph is from a pipeline breach in South America from 2010. Re-using authentic disaster photos with fake location tags is a widespread misinformation tactic.',
    verification: {
      source: 'Viral account claiming hidden conspiracy ("Why is no news reporting this?").',
      date: 'Original photo taken in 2010.',
      evidence: 'Reverse image search links image to 2010 South American industrial accident.',
      context: 'Classic "out of context" media recycling.',
      media: 'Real disaster photo falsely attached to current location and date.',
      consensus: 'Maritime safety authorities report zero oil spills in Mediterranean today.'
    },
    askReason: true
  },
  {
    id: 's10',
    category: 'emotional_manipulation',
    categoryLabel: 'OUTRAGE CHAIN POST',
    platform: 'Viral Forum',
    author: {
      name: 'Parent Rights Voice',
      handle: '@parent_rights_v',
      avatar: '📢'
    },
    timestamp: '8 hours ago',
    content: {
      headline: 'THEY ARE BANNING ALL SCHOOL LIBRARIES NEXT MONTH!',
      body: 'IF YOU CARE ABOUT YOUR CHILDREN\'S FUTURE YOU MUST REPOST THIS IMMEDIATELY! Local councils just secretly voted to close 100% of public school reading centers by December! DO NOT LET THEM SILENCE US!',
      stats: {
        likes: '142.0k',
        shares: '98.5k',
        comments: '18.3k'
      }
    },
    correctStatus: 'REJECT',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'suspicious',
    aiGenerated: false,
    outdated: false,
    socialProof: 'massive',
    explanation: 'ALL-CAPS text, high emotional distress language, and demands for immediate reposting ("REPOST THIS IMMEDIATELY") are classic signatures of emotional manipulation designed to bypass critical thinking.',
    verification: {
      source: 'Unverified advocacy group.',
      date: 'Recent post.',
      evidence: 'Public school board minutes confirm library digital catalog upgrades, NOT closures.',
      context: 'Capitalizes on parental fear to trigger viral chain sharing.',
      media: 'N/A',
      consensus: 'School board association released official public clarification refuting the rumor.'
    },
    askReason: true
  },
  {
    id: 's11',
    category: 'fake_consensus',
    categoryLabel: 'ASTROTURFING & COMMENT BOTS',
    platform: 'Social Media',
    author: {
      name: 'FutureTech Gadgets',
      handle: '@futuretech_official',
      avatar: '📱'
    },
    timestamp: '9 hours ago',
    content: {
      headline: 'Solar-Powered AI Earpiece Translates 50 Languages Instantly Without Internet!',
      body: 'Order today for $29.99! Over 50,000 students have abandoned language learning classes thanks to this revolutionary wearable device!',
      stats: {
        likes: '52.1k',
        shares: '12.4k',
        comments: '4.2k (Top 20 comments: "Ordered 3! Miracle product! Arrived in 2 hours!")'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'medium',
    sensationalismLevel: 'medium',
    sourceStrength: 'suspicious',
    aiGenerated: false,
    outdated: false,
    socialProof: 'high',
    explanation: 'Dozens of identical, overly enthusiastic comments ("Ordered 3! Miracle product!") are often generated by automated bot accounts (astroturfing) to create a false illusion of popular consensus.',
    verification: {
      source: 'Drop-shipping store using bot comment networks.',
      date: 'Active advertising campaign.',
      evidence: 'Independent consumer protection bureau warns of fraudulent gadget dropshipping.',
      context: 'Comment section filled with automated bot profiles created within the last 48 hours.',
      media: '3D rendered mockups without physical prototype testing.',
      consensus: 'Hardware review channels label product non-functional scam.'
    },
    askReason: false
  },
  {
    id: 's12',
    category: 'source_credibility',
    categoryLabel: 'SOURCE IMPERSONATION',
    platform: 'News Outlet',
    author: {
      name: 'World Health Institute Bulletin',
      handle: '@world-health-institute-news.org',
      avatar: '🏥'
    },
    timestamp: '10 hours ago',
    content: {
      headline: 'New Global Guideline Recommends Eliminating All Cooked Vegetables',
      body: 'Official advisory from our international research division states raw seed oils contain toxic vibration frequencies. All citizens should transition immediately to a 100% raw fruit diet.',
      stats: {
        likes: '38.9k',
        shares: '19.2k',
        comments: '4.1k'
      }
    },
    correctStatus: 'REJECT',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'suspicious',
    aiGenerated: false,
    outdated: false,
    socialProof: 'moderate',
    explanation: 'The name mimics the World Health Organization (WHO), but the domain (`world-health-institute-news.org`) is an unverified commercial blog. Impersonating trusted institutional brands is a common tactic to build fake authority.',
    verification: {
      source: 'Fake domain registered 3 weeks ago; no relation to WHO or National Institutes of Health.',
      date: 'Current fraudulent site.',
      evidence: 'Peer-reviewed nutritional science consistently recommends varied diets rich in vegetables.',
      context: 'Website monetized with unapproved supplement ads.',
      media: 'Stolen institutional logo modified slightly.',
      consensus: 'Global health agencies warn against fake health domain impersonators.'
    },
    askReason: true
  },
  {
    id: 's13',
    category: 'confirmation_bias',
    categoryLabel: 'TARGETED CONFIRMATION CLAIM',
    platform: 'Viral Forum',
    author: {
      name: 'Student Hack Network',
      handle: '@student_hacks_x',
      avatar: '🎓'
    },
    timestamp: '11 hours ago',
    content: {
      headline: 'Scientific Proof: Cramming 3 Hours Before Exam Yields Better Grades Than 8 Hours Sleep!',
      body: 'Finally proven! A landmark study shows high cortisol levels from last-minute panic boost memory retention by 400% compared to sleeping early! Sleep is overrated for students!',
      stats: {
        likes: '280.9k',
        shares: '112.4k',
        comments: '16.8k'
      }
    },
    correctStatus: 'REJECT',
    emotionLevel: 'medium',
    sensationalismLevel: 'high',
    sourceStrength: 'suspicious',
    aiGenerated: false,
    outdated: false,
    socialProof: 'massive',
    explanation: 'We naturally want to believe stories that justify our existing habits (cramming, staying up late). This is confirmation bias. Cognitive neuroscience confirms sleep consolidation is vital for memory formation.',
    verification: {
      source: 'Student meme network exploiting confirmation bias.',
      date: 'Exam season viral post.',
      evidence: 'Decades of sleep research (e.g. Harvard Sleep Division) prove sleep deprivation impairs recall and problem solving.',
      context: 'Taps into students\' desire to feel validated about bad study habits.',
      media: 'N/A',
      consensus: 'Universal neuroscience consensus confirms sleep is critical for learning.'
    },
    askReason: true
  },
  {
    id: 's14',
    category: 'selective_info',
    categoryLabel: 'CHERRY-PICKED REPORTING',
    platform: 'News Outlet',
    author: {
      name: 'Clean Energy Monitor',
      handle: '@CleanEnergyMonitor',
      avatar: '☀️'
    },
    timestamp: '12 hours ago',
    content: {
      headline: 'Global Solar Capacity Exceeds 1.5 Terawatts in 2024 Landmark Milestone',
      body: 'Official International Renewable Energy Agency (IRENA) data confirms solar photovoltaics added more power capacity than all fossil fuels combined last year, with installation costs dropping 85% over the past decade.',
      stats: {
        views: '35.6k',
        likes: '24.1k',
        shares: '9.8k'
      }
    },
    correctStatus: 'TRUST',
    emotionLevel: 'low',
    sensationalismLevel: 'low',
    sourceStrength: 'verified',
    aiGenerated: false,
    outdated: false,
    socialProof: 'moderate',
    explanation: 'This report cites verifiable international energy data (IRENA), presents statistics in proper context without exaggerated doom or miracles, and aligns with open public energy statistics.',
    verification: {
      source: 'IRENA (International Renewable Energy Agency) 2024 Renewable Capacity Statistics Report.',
      date: 'Published in official 2024 annual release.',
      evidence: 'Open-access energy statistics published by international intergovernmental agencies.',
      context: 'Provides comprehensive global metric with historical cost trend baseline.',
      media: 'Standard industrial data chart matching official tables.',
      consensus: 'Confirmed across IEA, BloombergNEF, and UN Energy data banks.'
    },
    askReason: false
  },
  {
    id: 's15',
    category: 'mixed_ai_social',
    categoryLabel: 'SYNTHETIC MEDIA & VIRAL CLONE',
    platform: 'Social Media',
    author: {
      name: 'Geopolitics Unfiltered',
      handle: '@geo_unfiltered',
      avatar: '🌍',
      verified: true
    },
    timestamp: '13 hours ago',
    content: {
      headline: 'Leaked Audio: Ambassador Declares Immediate Border Treaty Cancellation!',
      body: 'Listen to this high-definition voice recording of the ambassador speaking off-camera in a private meeting today! Sudden diplomatic breakdown announced!',
      mediaUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      mediaType: 'quote',
      mediaCaption: 'Audio snippet waveform with quote overlay.',
      stats: {
        likes: '410.2k',
        shares: '210.6k',
        comments: '39.1k'
      }
    },
    correctStatus: 'VERIFY',
    emotionLevel: 'high',
    sensationalismLevel: 'high',
    sourceStrength: 'suspicious',
    aiGenerated: true,
    outdated: false,
    socialProof: 'massive',
    explanation: 'AI voice cloning models can replicate any public speaker\'s voice with 3 seconds of sample audio. Unverified "leaked audio clips" on social media must be cross-checked against official state department channels before trusting.',
    verification: {
      source: 'Anonymous viral account sharing unverified audio clip.',
      date: 'Posted today during diplomatic negotiations.',
      evidence: 'Audio spectral analysis detects synthetic pitch cadence artifacts characteristic of generative voice clones.',
      context: 'Fabricated audio timed to influence ongoing international talks.',
      media: 'Generic waveform graphic hiding voice synthesis source.',
      consensus: 'Embassy and press corps confirm no treaty alterations made.'
    },
    askReason: true
  }
];

// Curated 5 scenarios for Hackathon Demo Mode
export const DEMO_SCENARIO_IDS = ['s01', 's02', 's03', 's06', 's10'];
