// lib/ad-algorithms.ts - Core evaluation algorithms

interface AdData {
  title: string;
  description: string;
  platform: string;
  audience: string;
  industry: string;
  budget: string;
  goals: string;
  country: string;
  adType: string;
  targetAge: string;
  targetGender: string;
  language: string;
}

interface EvaluationScores {
  creativity: number;
  viability: number;
  alignment: number;
  engagement: number;
  conversion: number;
  overall: number;
}

interface DetailedAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  platformSpecific: string[];
  audienceInsights: string[];
  competitorAnalysis: string[];
}

// Platform-specific data and requirements
const PLATFORM_DATA = {
  facebook: {
    titleLimit: 125,
    descLimit: 125,
    optimalTitleLength: [25, 50],
    optimalDescLength: [50, 90],
    topIndustries: ['retail', 'food-beverage', 'education', 'real-estate'],
    bestAdTypes: ['carousel', 'video', 'image'],
    ctrBenchmark: { high: 2.5, avg: 1.6, low: 0.8 },
    costMultiplier: 1.0,
    audienceFactors: ['interests', 'behavior', 'demographics']
  },
  instagram: {
    titleLimit: 125,
    descLimit: 2200,
    optimalTitleLength: [15, 40],
    optimalDescLength: [100, 300],
    topIndustries: ['fashion', 'fitness', 'food-beverage', 'travel'],
    bestAdTypes: ['story', 'reel', 'carousel'],
    ctrBenchmark: { high: 3.2, avg: 2.1, low: 1.2 },
    costMultiplier: 1.2,
    audienceFactors: ['visual_appeal', 'hashtags', 'influencer_potential']
  },
  'google-ads': {
    titleLimit: 90,
    descLimit: 180,
    optimalTitleLength: [25, 60],
    optimalDescLength: [80, 150],
    topIndustries: ['technology', 'finance', 'healthcare', 'legal'],
    bestAdTypes: ['search', 'display', 'shopping'],
    ctrBenchmark: { high: 4.5, avg: 2.8, low: 1.5 },
    costMultiplier: 1.5,
    audienceFactors: ['keywords', 'intent', 'location']
  },
  linkedin: {
    titleLimit: 150,
    descLimit: 600,
    optimalTitleLength: [50, 100],
    optimalDescLength: [150, 400],
    topIndustries: ['technology', 'finance', 'consulting', 'education'],
    bestAdTypes: ['sponsored_content', 'message', 'dynamic'],
    ctrBenchmark: { high: 2.0, avg: 1.2, low: 0.6 },
    costMultiplier: 2.0,
    audienceFactors: ['job_title', 'industry', 'company_size']
  },
  tiktok: {
    titleLimit: 100,
    descLimit: 2200,
    optimalTitleLength: [10, 30],
    optimalDescLength: [50, 150],
    topIndustries: ['fashion', 'entertainment', 'fitness', 'food-beverage'],
    bestAdTypes: ['video', 'spark', 'collection'],
    ctrBenchmark: { high: 4.0, avg: 2.5, low: 1.3 },
    costMultiplier: 0.8,
    audienceFactors: ['trending', 'music', 'hashtag_challenge']
  },
  twitter: {
    titleLimit: 280,
    descLimit: 280,
    optimalTitleLength: [50, 120],
    optimalDescLength: [100, 200],
    topIndustries: ['technology', 'media', 'politics', 'entertainment'],
    bestAdTypes: ['promoted_tweet', 'video', 'carousel'],
    ctrBenchmark: { high: 2.8, avg: 1.8, low: 0.9 },
    costMultiplier: 1.1,
    audienceFactors: ['hashtags', 'trending_topics', 'real_time']
  },
  youtube: {
    titleLimit: 100,
    descLimit: 5000,
    optimalTitleLength: [40, 70],
    optimalDescLength: [200, 1000],
    topIndustries: ['entertainment', 'education', 'technology', 'fitness'],
    bestAdTypes: ['video', 'bumper', 'discovery'],
    ctrBenchmark: { high: 3.5, avg: 2.2, low: 1.1 },
    costMultiplier: 1.3,
    audienceFactors: ['video_content', 'watch_time', 'engagement']
  },
  pinterest: {
    titleLimit: 100,
    descLimit: 500,
    optimalTitleLength: [20, 60],
    optimalDescLength: [100, 300],
    topIndustries: ['fashion', 'home', 'food-beverage', 'diy'],
    bestAdTypes: ['standard', 'video', 'carousel'],
    ctrBenchmark: { high: 2.0, avg: 1.3, low: 0.7 },
    costMultiplier: 0.9,
    audienceFactors: ['visual_appeal', 'seasonal', 'diy_potential']
  }
};

// Industry-specific benchmarks and insights
const INDUSTRY_DATA = {
  technology: {
    avgCtr: 2.1,
    bestPlatforms: ['google-ads', 'linkedin', 'facebook'],
    keyTerms: ['innovative', 'efficient', 'secure', 'scalable', 'smart', 'advanced', 'cutting-edge'],
    audienceProfile: { age: [25, 45], interests: ['tech', 'innovation', 'productivity'] },
    conversionFactors: ['free_trial', 'demo', 'case_studies', 'security', 'integration']
  },
  healthcare: {
    avgCtr: 1.8,
    bestPlatforms: ['google-ads', 'facebook', 'linkedin'],
    keyTerms: ['trusted', 'certified', 'proven', 'safe', 'expert', 'professional', 'reliable'],
    audienceProfile: { age: [30, 60], interests: ['health', 'wellness', 'family'] },
    conversionFactors: ['testimonials', 'credentials', 'insurance', 'consultation', 'guarantee']
  },
  retail: {
    avgCtr: 2.3,
    bestPlatforms: ['facebook', 'instagram', 'google-ads'],
    keyTerms: ['exclusive', 'limited', 'sale', 'new', 'trending', 'popular', 'bestseller'],
    audienceProfile: { age: [18, 55], interests: ['shopping', 'fashion', 'lifestyle'] },
    conversionFactors: ['discount', 'free_shipping', 'reviews', 'return_policy', 'warranty']
  },
  finance: {
    avgCtr: 1.5,
    bestPlatforms: ['google-ads', 'linkedin', 'facebook'],
    keyTerms: ['secure', 'trusted', 'guaranteed', 'professional', 'expert', 'certified', 'regulated'],
    audienceProfile: { age: [25, 55], interests: ['investment', 'savings', 'security'] },
    conversionFactors: ['security', 'testimonials', 'credentials', 'guarantee', 'compliance']
  },
  education: {
    avgCtr: 2.0,
    bestPlatforms: ['facebook', 'google-ads', 'youtube'],
    keyTerms: ['learn', 'master', 'certified', 'expert', 'comprehensive', 'proven', 'results'],
    audienceProfile: { age: [18, 45], interests: ['learning', 'career', 'skills'] },
    conversionFactors: ['certification', 'job_placement', 'testimonials', 'curriculum', 'support']
  },
  'real-estate': {
    avgCtr: 1.9,
    bestPlatforms: ['facebook', 'google-ads', 'instagram'],
    keyTerms: ['dream', 'perfect', 'location', 'investment', 'opportunity', 'exclusive', 'luxury'],
    audienceProfile: { age: [25, 55], interests: ['property', 'investment', 'lifestyle'] },
    conversionFactors: ['location', 'price', 'financing', 'virtual_tour', 'agent_contact']
  },
  'food-beverage': {
    avgCtr: 2.4,
    bestPlatforms: ['instagram', 'facebook', 'tiktok'],
    keyTerms: ['delicious', 'fresh', 'organic', 'authentic', 'homemade', 'premium', 'artisan'],
    audienceProfile: { age: [18, 50], interests: ['food', 'cooking', 'dining'] },
    conversionFactors: ['taste', 'quality', 'delivery', 'reviews', 'ingredients']
  },
  travel: {
    avgCtr: 2.2,
    bestPlatforms: ['instagram', 'facebook', 'google-ads'],
    keyTerms: ['adventure', 'escape', 'discover', 'unforgettable', 'luxury', 'authentic', 'exclusive'],
    audienceProfile: { age: [25, 55], interests: ['travel', 'adventure', 'culture'] },
    conversionFactors: ['destination', 'price', 'reviews', 'itinerary', 'booking_ease']
  },
  fitness: {
    avgCtr: 2.1,
    bestPlatforms: ['instagram', 'facebook', 'youtube'],
    keyTerms: ['transform', 'results', 'proven', 'effective', 'strong', 'healthy', 'confident'],
    audienceProfile: { age: [18, 45], interests: ['fitness', 'health', 'wellness'] },
    conversionFactors: ['results', 'testimonials', 'program', 'support', 'guarantee']
  },
  fashion: {
    avgCtr: 2.5,
    bestPlatforms: ['instagram', 'facebook', 'pinterest'],
    keyTerms: ['stylish', 'trendy', 'exclusive', 'limited', 'designer', 'luxury', 'unique'],
    audienceProfile: { age: [16, 45], interests: ['fashion', 'style', 'trends'] },
    conversionFactors: ['style', 'quality', 'size_guide', 'returns', 'reviews']
  },
  automotive: {
    avgCtr: 1.7,
    bestPlatforms: ['google-ads', 'facebook', 'youtube'],
    keyTerms: ['reliable', 'performance', 'luxury', 'efficient', 'powerful', 'advanced', 'innovative'],
    audienceProfile: { age: [25, 60], interests: ['cars', 'technology', 'performance'] },
    conversionFactors: ['financing', 'warranty', 'test_drive', 'reviews', 'features']
  },
  entertainment: {
    avgCtr: 2.6,
    bestPlatforms: ['tiktok', 'instagram', 'youtube'],
    keyTerms: ['exciting', 'amazing', 'exclusive', 'limited', 'epic', 'incredible', 'must-see'],
    audienceProfile: { age: [13, 35], interests: ['entertainment', 'social', 'trends'] },
    conversionFactors: ['preview', 'reviews', 'social_proof', 'accessibility', 'price']
  },
  other: {
    avgCtr: 1.8,
    bestPlatforms: ['google-ads', 'facebook'],
    keyTerms: ['quality', 'professional', 'reliable', 'trusted', 'expert', 'proven'],
    audienceProfile: { age: [25, 50], interests: ['general'] },
    conversionFactors: ['quality', 'price', 'reviews', 'guarantee', 'support']
  }
};

// Country-specific data
const COUNTRY_DATA = {
  'US': { cpcMultiplier: 1.0, competitiveness: 'high', languages: ['en'] },
  'UK': { cpcMultiplier: 0.9, competitiveness: 'high', languages: ['en'] },
  'CA': { cpcMultiplier: 0.8, competitiveness: 'medium', languages: ['en', 'fr'] },
  'AU': { cpcMultiplier: 0.85, competitiveness: 'medium', languages: ['en'] },
  'DE': { cpcMultiplier: 0.7, competitiveness: 'high', languages: ['de'] },
  'IN': { cpcMultiplier: 0.3, competitiveness: 'high', languages: ['en', 'hi'] },
  'other': { cpcMultiplier: 0.6, competitiveness: 'medium', languages: ['en'] }
};

export class AdEvaluationEngine {
  
  // Main evaluation function
  static evaluateAd(adData: AdData): { scores: EvaluationScores; analysis: DetailedAnalysis; recommendations: string[] } {
    const scores = this.calculateScores(adData);
    const analysis = this.generateAnalysis(adData, scores);
    const recommendations = this.generateRecommendations(adData, scores, analysis);
    
    return { scores, analysis, recommendations };
  }

  // Core scoring algorithms
  private static calculateScores(adData: AdData): EvaluationScores {
    const creativityScore = this.evaluateCreativity(adData);
    const viabilityScore = this.evaluatePlatformViability(adData);
    const alignmentScore = this.evaluateAudienceAlignment(adData);
    const engagementScore = this.predictEngagement(adData);
    const conversionScore = this.predictConversion(adData);
    
    const overall = Math.round((creativityScore + viabilityScore + alignmentScore + engagementScore + conversionScore) / 5);
    
    return {
      creativity: creativityScore,
      viability: viabilityScore,
      alignment: alignmentScore,
      engagement: engagementScore,
      conversion: conversionScore,
      overall
    };
  }

  // Creativity evaluation algorithm
  private static evaluateCreativity(adData: AdData): number {
    let score = 50; // Base score
    
    // Title analysis
    const titleWords = adData.title.toLowerCase().split(' ');
    const titleLength = adData.title.length;
    
    // Power words check
    const powerWords = ['exclusive', 'limited', 'new', 'free', 'guaranteed', 'proven', 'instant', 'ultimate', 'amazing', 'incredible', 'revolutionary', 'breakthrough'];
    const powerWordCount = titleWords.filter(word => powerWords.includes(word)).length;
    score += powerWordCount * 5;
    
    // Title length optimization
    const platformData = PLATFORM_DATA[adData.platform as keyof typeof PLATFORM_DATA];
    if (platformData) {
      const [minOptimal, maxOptimal] = platformData.optimalTitleLength;
      if (titleLength >= minOptimal && titleLength <= maxOptimal) {
        score += 15;
      } else if (titleLength < minOptimal) {
        score -= 8;
      } else if (titleLength > platformData.titleLimit) {
        score -= 20;
      }
    }
    
    // Description analysis
    const descLength = adData.description.length;
    const descWords = adData.description.toLowerCase().split(' ');
    
    // Call-to-action detection
    const ctaWords = ['buy', 'shop', 'get', 'try', 'download', 'subscribe', 'learn', 'discover', 'start', 'join', 'claim', 'book'];
    const hasCta = ctaWords.some(cta => adData.description.toLowerCase().includes(cta));
    if (hasCta) score += 12;
    
    // Emotional triggers
    const emotionalWords = ['amazing', 'incredible', 'transform', 'breakthrough', 'revolutionary', 'secret', 'exclusive', 'limited', 'urgent'];
    const emotionalCount = descWords.filter(word => emotionalWords.includes(word)).length;
    score += Math.min(emotionalCount * 4, 20);
    
    // Uniqueness check (simple algorithm)
    const uniqueWords = new Set(titleWords.concat(descWords));
    const uniquenessRatio = uniqueWords.size / (titleWords.length + descWords.length);
    score += Math.round(uniquenessRatio * 15);
    
    // Question marks for engagement
    const hasQuestion = adData.title.includes('?') || adData.description.includes('?');
    if (hasQuestion) score += 5;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Platform viability evaluation
  private static evaluatePlatformViability(adData: AdData): number {
    let score = 60; // Base score
    
    const platformData = PLATFORM_DATA[adData.platform as keyof typeof PLATFORM_DATA];
    const industryData = INDUSTRY_DATA[adData.industry as keyof typeof INDUSTRY_DATA];
    
    if (!platformData || !industryData) return 50;
    
    // Platform-industry match
    if (industryData.bestPlatforms.includes(adData.platform)) {
      score += 25;
    } else {
      score -= 15;
    }
    
    // Text length compliance
    if (adData.title.length <= platformData.titleLimit) score += 8;
    else score -= 15;
    
    if (adData.description.length <= platformData.descLimit) score += 8;
    else score -= 15;
    
    // Ad type platform match
    if (platformData.bestAdTypes.includes(adData.adType)) {
      score += 10;
    }
    
    // Budget adequacy for platform
    const budgetScore = this.evaluateBudgetForPlatform(adData.budget, adData.platform);
    score += budgetScore;
    
    // Country-platform compatibility
    const countryData = COUNTRY_DATA[adData.country as keyof typeof COUNTRY_DATA];
    if (countryData) {
      if (countryData.competitiveness === 'high' && adData.budget === 'under-1000') {
        score -= 20;
      } else if (countryData.competitiveness === 'medium' && adData.budget === 'under-1000') {
        score -= 8;
      }
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Audience alignment evaluation
  private static evaluateAudienceAlignment(adData: AdData): number {
    let score = 55; // Base score
    
    const industryData = INDUSTRY_DATA[adData.industry as keyof typeof INDUSTRY_DATA];
    if (!industryData) return 50;
    
    // Age targeting analysis
    const targetAge = adData.targetAge;
    const industryAgeRange = industryData.audienceProfile.age;
    
    // Age alignment check
    if (targetAge === '25-34' && industryAgeRange[0] <= 30 && industryAgeRange[1] >= 30) score += 18;
    else if (targetAge === '35-44' && industryAgeRange[0] <= 40 && industryAgeRange[1] >= 35) score += 18;
    else if (targetAge === '18-24' && industryAgeRange[0] <= 25) score += 15;
    else if (targetAge === '45-54' && industryAgeRange[1] >= 45) score += 12;
    
    // Industry keyword alignment
    const contentText = (adData.title + ' ' + adData.description).toLowerCase();
    const industryKeywords = industryData.keyTerms;
    const keywordMatches = industryKeywords.filter(keyword => contentText.includes(keyword)).length;
    score += keywordMatches * 6;
    
    // Goals alignment
    const goalAlignmentScore = this.evaluateGoalAlignment(adData.goals, adData.industry);
    score += goalAlignmentScore;
    
    // Audience description quality
    if (adData.audience.length > 20) score += 8;
    if (adData.audience.length > 50) score += 5;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Engagement prediction
  private static predictEngagement(adData: AdData): number {
    let score = 50;
    
    const platformData = PLATFORM_DATA[adData.platform as keyof typeof PLATFORM_DATA];
    if (!platformData) return 50;
    
    // Platform-specific engagement factors
    const benchmarkCtr = platformData.ctrBenchmark.avg;
    let predictedCtr = benchmarkCtr;
    
    // Adjust based on title quality
    if (adData.title.length >= platformData.optimalTitleLength[0] && 
        adData.title.length <= platformData.optimalTitleLength[1]) {
      predictedCtr *= 1.25;
    }
    
    // Adjust based on CTA presence
    const hasCta = ['buy', 'shop', 'get', 'try', 'learn', 'discover', 'start', 'join'].some(cta => 
      adData.description.toLowerCase().includes(cta)
    );
    if (hasCta) predictedCtr *= 1.2;
    
    // Emotional engagement factors
    const emotionalWords = ['love', 'hate', 'amazing', 'incredible', 'shocking', 'surprising'];
    const hasEmotional = emotionalWords.some(word => 
      (adData.title + ' ' + adData.description).toLowerCase().includes(word)
    );
    if (hasEmotional) predictedCtr *= 1.15;
    
    // Convert CTR to engagement score
    const ctrRatio = predictedCtr / benchmarkCtr;
    score = Math.round(50 + (ctrRatio - 1) * 50);
    
    // Platform-specific bonuses
    if (adData.platform === 'tiktok' && adData.adType === 'video') score += 10;
    if (adData.platform === 'instagram' && adData.adType === 'story') score += 8;
    if (adData.platform === 'linkedin' && adData.industry === 'technology') score += 12;
    
    return Math.max(0, Math.min(100, score));
  }

  // Conversion prediction
  private static predictConversion(adData: AdData): number {
    let score = 50;
    
    const industryData = INDUSTRY_DATA[adData.industry as keyof typeof INDUSTRY_DATA];
    if (!industryData) return 50;
    
    // Check for conversion factors
    const contentText = (adData.title + ' ' + adData.description).toLowerCase();
    const conversionFactors = industryData.conversionFactors;
    
    const factorsPresent = conversionFactors.filter(factor => 
      contentText.includes(factor.replace('_', ' '))
    ).length;
    
    score += factorsPresent * 12;
    
    // Goal-specific conversion potential
    if (adData.goals === 'sales' || adData.goals === 'lead-generation') {
      score += 15;
    } else if (adData.goals === 'brand-awareness') {
      score -= 5;
    } else if (adData.goals === 'traffic') {
      score += 5;
    }
    
    // Budget impact on conversion
    if (adData.budget === '25000-plus') score += 10;
    else if (adData.budget === '10000-25000') score += 8;
    else if (adData.budget === 'under-1000') score -= 8;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Helper functions
  private static evaluateBudgetForPlatform(budget: string, platform: string): number {
    const platformData = PLATFORM_DATA[platform as keyof typeof PLATFORM_DATA];
    if (!platformData) return 0;
    
    const budgetRanges = {
      'under-1000': 500,
      '1000-5000': 3000,
      '5000-10000': 7500,
      '10000-25000': 17500,
      '25000-plus': 30000
    };
    
    const budgetAmount = budgetRanges[budget as keyof typeof budgetRanges] || 0;
    const adjustedBudget = budgetAmount * platformData.costMultiplier;
    
    if (adjustedBudget >= 10000) return 20;
    if (adjustedBudget >= 5000) return 15;
    if (adjustedBudget >= 2000) return 10;
    if (adjustedBudget >= 1000) return 5;
    return -8;
  }

  private static evaluateGoalAlignment(goal: string, industry: string): number {
    const goalIndustryAlignment = {
      'brand-awareness': ['fashion', 'food-beverage', 'entertainment', 'travel'],
      'lead-generation': ['technology', 'finance', 'real-estate', 'education'],
      'sales': ['retail', 'fashion', 'travel', 'automotive'],
      'traffic': ['education', 'entertainment', 'technology'],
      'engagement': ['entertainment', 'fashion', 'food-beverage'],
      'app-installs': ['technology', 'entertainment', 'fitness']
    };
    
    const alignedIndustries = goalIndustryAlignment[goal as keyof typeof goalIndustryAlignment] || [];
    return alignedIndustries.includes(industry) ? 15 : 0;
  }

  // Generate detailed analysis
  private static generateAnalysis(adData: AdData, scores: EvaluationScores): DetailedAnalysis {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];
    const platformSpecific: string[] = [];
    const audienceInsights: string[] = [];
    const competitorAnalysis: string[] = [];

    // Analyze strengths and weaknesses based on scores
    if (scores.creativity >= 75) {
      strengths.push("Excellent creative elements with compelling and engaging messaging");
      strengths.push("Strong use of power words and emotional triggers");
    } else if (scores.creativity < 60) {
      weaknesses.push("Creative elements need significant improvement to capture attention");
      recommendations.push("Add more compelling headlines with power words like 'exclusive', 'proven', or 'guaranteed'");
      recommendations.push("Include emotional triggers and urgency elements to increase engagement");
    }

    if (scores.viability >= 80) {
      strengths.push("Excellent platform alignment and technical compliance");
      strengths.push("Optimal content length and format for the selected platform");
    } else if (scores.viability < 65) {
      weaknesses.push("Platform optimization needs attention for better performance");
      recommendations.push("Adjust content length and format to better match platform requirements");
      recommendations.push("Consider alternative platforms that may be better suited for your industry");
    }

    if (scores.alignment >= 75) {
      strengths.push("Strong audience targeting and demographic alignment");
    } else if (scores.alignment < 60) {
      weaknesses.push("Audience targeting and messaging alignment needs improvement");
      recommendations.push("Refine target audience parameters and include more specific demographic details");
      recommendations.push("Incorporate industry-specific terminology and benefits");
    }

    if (scores.engagement >= 75) {
      strengths.push("High predicted engagement rates based on platform and content analysis");
    } else if (scores.engagement < 60) {
      weaknesses.push("Low predicted engagement - content may not resonate with target audience");
      recommendations.push("Add more engaging elements like questions, calls-to-action, or interactive content");
    }

    if (scores.conversion >= 75) {
      strengths.push("Strong conversion potential with clear value proposition");
    } else if (scores.conversion < 60) {
      weaknesses.push("Conversion potential is limited - unclear value proposition");
      recommendations.push("Strengthen your value proposition and include clear benefits");
      recommendations.push("Add trust signals like testimonials, guarantees, or certifications");
    }

    // Platform-specific insights
    const platformData = PLATFORM_DATA[adData.platform as keyof typeof PLATFORM_DATA];
    if (platformData) {
      platformSpecific.push(`Optimal title length for ${adData.platform}: ${platformData.optimalTitleLength[0]}-${platformData.optimalTitleLength[1]} characters (current: ${adData.title.length})`);
      platformSpecific.push(`Average CTR benchmark for ${adData.platform}: ${platformData.ctrBenchmark.avg}%`);
      platformSpecific.push(`Recommended ad types for this platform: ${platformData.bestAdTypes.join(', ')}`);
      
      if (adData.title.length > platformData.titleLimit) {
        platformSpecific.push(`⚠️ Title exceeds platform limit of ${platformData.titleLimit} characters`);
      }
      if (adData.description.length > platformData.descLimit) {
        platformSpecific.push(`⚠️ Description exceeds platform limit of ${platformData.descLimit} characters`);
      }
    }

    // Audience insights
    const industryData = INDUSTRY_DATA[adData.industry as keyof typeof INDUSTRY_DATA];
    if (industryData) {
      audienceInsights.push(`Target age range for ${adData.industry}: ${industryData.audienceProfile.age[0]}-${industryData.audienceProfile.age[1]} years`);
      audienceInsights.push(`Key interests for this industry: ${industryData.audienceProfile.interests.join(', ')}`);
      audienceInsights.push(`Industry average CTR: ${industryData.avgCtr}%`);
    }

    // Competitor analysis
    competitorAnalysis.push("Analyze competitor ads on the same platform for messaging patterns");
    competitorAnalysis.push("Monitor competitor pricing and promotional strategies");
    competitorAnalysis.push("Study successful ads in your industry for creative inspiration");

    return { strengths, weaknesses, recommendations, platformSpecific, audienceInsights, competitorAnalysis };
  }

  private static generateRecommendations(adData: AdData, scores: EvaluationScores, analysis: DetailedAnalysis): string[] {
    const recommendations: string[] = [];
    
    // Score-based recommendations
    if (scores.creativity < 70) {
      recommendations.push("Enhance headline with power words and emotional triggers");
      recommendations.push("Add urgency or scarcity elements to create FOMO (Fear of Missing Out)");
      recommendations.push("Include numbers or statistics to make claims more credible");
    }
    
    if (scores.viability < 70) {
      recommendations.push("Optimize text length to meet platform requirements");
      recommendations.push("Consider alternative platforms better suited for your industry");
      recommendations.push("Adjust ad format to match platform best practices");
    }
    
    if (scores.alignment < 70) {
      recommendations.push("Refine audience targeting parameters for better alignment");
      recommendations.push("Include industry-specific terminology and benefits");
      recommendations.push("Research your target audience's pain points and address them directly");
    }
    
    if (scores.engagement < 70) {
      recommendations.push("Add interactive elements or questions to increase engagement");
      recommendations.push("Use more visual and descriptive language");
      recommendations.push("Include social proof elements like reviews or testimonials");
    }
    
    if (scores.conversion < 70) {
      recommendations.push("Strengthen your value proposition with clear benefits");
      recommendations.push("Add trust signals like guarantees, certifications, or testimonials");
      recommendations.push("Include a stronger, more specific call-to-action");
    }
    
    // Platform-specific recommendations
    const platformData = PLATFORM_DATA[adData.platform as keyof typeof PLATFORM_DATA];
    if (platformData) {
      if (adData.platform === 'instagram' || adData.platform === 'tiktok') {
        recommendations.push("Focus on visual storytelling and trending hashtags");
      }
      if (adData.platform === 'linkedin') {
        recommendations.push("Emphasize professional benefits and industry expertise");
      }
      if (adData.platform === 'google-ads') {
        recommendations.push("Focus on high-intent keywords and clear value propositions");
      }
    }
    
    return recommendations;
  }
}