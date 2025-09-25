// lib/evaluation-service.ts
import { AdEvaluationEngine } from './ad-algorithms';
import DatabaseService from './database-helpers';
import type { AdData, EvaluationResult } from './database-helpers';

interface EvaluationResponse {
  success: boolean;
  evaluation?: EvaluationResult;
  error?: string;
  user?: {
    remainingUses: number;
    totalUses: number;
  };
  rateLimited?: boolean;
}

export class EvaluationService {
  
  /**
   * Main evaluation function that handles the entire process
   */
  static async evaluateAd(
    adData: AdData,
    ipAddress: string,
    userEmail?: string,
    userName?: string
  ): Promise<EvaluationResponse> {
    try {
      // Check if user can evaluate (rate limiting)
      const canEvaluate = await DatabaseService.canUserEvaluate(ipAddress, userEmail);
      
      if (!canEvaluate.canEvaluate) {
        return {
          success: false,
          error: canEvaluate.message || 'Rate limit exceeded',
          rateLimited: true
        };
      }

      // Handle user registration if needed
      let user = null;
      if (userEmail && userName) {
        user = await DatabaseService.getOrCreateUser(userEmail, userName);
      }

      // Upload media file if present
      let mediaFileUrl: string | null = null;
      if (adData.mediaFile && user) {
        mediaFileUrl = await DatabaseService.uploadMediaFile(adData.mediaFile, user.id);
      }

      // Run the algorithmic evaluation
      const algorithmResult = AdEvaluationEngine.evaluateAd(adData);

      // Analyze media file if present
      let mediaAnalysis = null;
      if (adData.mediaFile) {
        mediaAnalysis = this.analyzeMediaFile(adData);
      }

      // Combine results into comprehensive evaluation
      const evaluationResult: EvaluationResult = {
        analysis: this.formatAnalysis(algorithmResult.analysis),
        scores: {
          creativity: algorithmResult.scores.creativity,
          viability: algorithmResult.scores.viability,
          alignment: algorithmResult.scores.alignment,
          engagement: algorithmResult.scores.engagement,
          conversion: algorithmResult.scores.conversion,
          mediaQuality: mediaAnalysis?.qualityScore || 0,
          overall: Math.round((
            algorithmResult.scores.creativity +
            algorithmResult.scores.viability +
            algorithmResult.scores.alignment +
            algorithmResult.scores.engagement +
            algorithmResult.scores.conversion +
            (mediaAnalysis?.qualityScore || 0)
          ) / (mediaAnalysis ? 6 : 5))
        },
        recommendations: algorithmResult.recommendations,
        mediaAnalysis,
        timestamp: new Date().toISOString()
      };

      // Save evaluation to database
      await DatabaseService.saveEvaluation(
        ipAddress,
        userEmail || null,
        adData,
        evaluationResult,
        mediaFileUrl || undefined
      );

      // Update usage counts
      await DatabaseService.updateIPUsage(ipAddress);

      // Get updated usage stats
      const updatedCanEvaluate = await DatabaseService.canUserEvaluate(ipAddress, userEmail);
      
      return {
        success: true,
        evaluation: evaluationResult,
        user: {
          remainingUses: updatedCanEvaluate.remainingUses,
          totalUses: userEmail ? 
            (await DatabaseService.getUserStats(userEmail))?.totalEvaluations || 0 : 
            ((await DatabaseService.getIPUsage(ipAddress))?.count || 0)
        }
      };

    } catch (error) {
      console.error('Evaluation error:', error);
      return {
        success: false,
        error: 'An error occurred during evaluation. Please try again.'
      };
    }
  }

  /**
   * Format the analysis results into readable text
   */
  private static formatAnalysis(analysis: any): string {
    let formattedAnalysis = '';

    if (analysis.strengths && analysis.strengths.length > 0) {
      formattedAnalysis += '🎯 STRENGTHS:\n';
      analysis.strengths.forEach((strength: string, index: number) => {
        formattedAnalysis += `${index + 1}. ${strength}\n`;
      });
      formattedAnalysis += '\n';
    }

    if (analysis.weaknesses && analysis.weaknesses.length > 0) {
      formattedAnalysis += '⚠️ AREAS FOR IMPROVEMENT:\n';
      analysis.weaknesses.forEach((weakness: string, index: number) => {
        formattedAnalysis += `${index + 1}. ${weakness}\n`;
      });
      formattedAnalysis += '\n';
    }

    if (analysis.platformSpecific && analysis.platformSpecific.length > 0) {
      formattedAnalysis += '📱 PLATFORM INSIGHTS:\n';
      analysis.platformSpecific.forEach((insight: string, index: number) => {
        formattedAnalysis += `${index + 1}. ${insight}\n`;
      });
      formattedAnalysis += '\n';
    }

    if (analysis.audienceInsights && analysis.audienceInsights.length > 0) {
      formattedAnalysis += '👥 AUDIENCE ANALYSIS:\n';
      analysis.audienceInsights.forEach((insight: string, index: number) => {
        formattedAnalysis += `${index + 1}. ${insight}\n`;
      });
      formattedAnalysis += '\n';
    }

    if (analysis.competitorAnalysis && analysis.competitorAnalysis.length > 0) {
      formattedAnalysis += '🏆 COMPETITIVE POSITIONING:\n';
      analysis.competitorAnalysis.forEach((insight: string, index: number) => {
        formattedAnalysis += `${index + 1}. ${insight}\n`;
      });
    }

    return formattedAnalysis.trim();
  }

  /**
   * Enhanced media file analysis
   */
  private static analyzeMediaFile(adData: AdData): {
    qualityScore: number;
    recommendations: string[];
    technicalSpecs: string[];
  } {
    const recommendations: string[] = [];
    const technicalSpecs: string[] = [];
    let qualityScore = 50;

    if (!adData.mediaFile) {
      return {
        qualityScore: 0,
        recommendations: ['Upload media file for complete analysis'],
        technicalSpecs: []
      };
    }

    const fileSize = adData.mediaSize || 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;
    const platform = adData.platform;

    // Technical specifications
    technicalSpecs.push(`File size: ${(fileSize / (1024 * 1024)).toFixed(2)} MB`);
    if (resolution) technicalSpecs.push(`Resolution: ${resolution}`);
    if (duration) technicalSpecs.push(`Duration: ${duration.toFixed(1)} seconds`);
    technicalSpecs.push(`Media type: ${adData.mediaType}`);

    // Platform-specific analysis
    switch (platform) {
      case 'instagram':
        qualityScore += this.analyzeInstagramMedia(adData, recommendations);
        break;
      case 'tiktok':
        qualityScore += this.analyzeTikTokMedia(adData, recommendations);
        break;
      case 'facebook':
        qualityScore += this.analyzeFacebookMedia(adData, recommendations);
        break;
      case 'youtube':
        qualityScore += this.analyzeYouTubeMedia(adData, recommendations);
        break;
      case 'linkedin':
        qualityScore += this.analyzeLinkedInMedia(adData, recommendations);
        break;
      case 'twitter':
        qualityScore += this.analyzeTwitterMedia(adData, recommendations);
        break;
      default:
        qualityScore += this.analyzeGenericMedia(adData, recommendations);
    }

    // File size analysis
    if (adData.mediaType === 'image') {
      if (fileSize > 10 * 1024 * 1024) { // 10MB
        recommendations.push('Image file size is too large - compress to under 10MB for faster loading');
        qualityScore -= 15;
      } else if (fileSize < 100 * 1024) { // 100KB
        recommendations.push('Image file size might be too small - ensure sufficient quality for display');
        qualityScore -= 8;
      } else {
        qualityScore += 12;
      }
    } else if (adData.mediaType === 'video') {
      if (fileSize > 500 * 1024 * 1024) { // 500MB
        recommendations.push('Video file size is very large - consider compression for better platform compatibility');
        qualityScore -= 20;
      } else if (fileSize > 100 * 1024 * 1024) { // 100MB
        recommendations.push('Video file size is large - may impact loading times on mobile devices');
        qualityScore -= 10;
      } else if (fileSize < 1 * 1024 * 1024) { // 1MB
        recommendations.push('Video file size seems small - ensure adequate quality for professional presentation');
        qualityScore -= 5;
      } else {
        qualityScore += 10;
      }
    }

    // Quality recommendations based on score
    if (qualityScore >= 80) {
      recommendations.unshift('Excellent media quality - well optimized for the platform');
    } else if (qualityScore >= 60) {
      recommendations.unshift('Good media quality - minor optimizations could improve performance');
    } else {
      recommendations.unshift('Media quality needs improvement - several optimization opportunities identified');
    }

    return {
      qualityScore: Math.max(0, Math.min(100, qualityScore)),
      recommendations,
      technicalSpecs
    };
  }

  // Platform-specific media analysis methods
  private static analyzeInstagramMedia(adData: AdData, recommendations: string[]): number {
    let score = 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    if (adData.mediaType === 'image') {
      if (resolution.includes('1080x1080') || resolution.includes('1080x1350')) {
        score += 25;
        recommendations.push('Perfect Instagram image dimensions - optimized for feed display');
      } else if (resolution.includes('1080')) {
        score += 15;
        recommendations.push('Good Instagram image resolution - consider square (1080x1080) for better engagement');
      } else {
        recommendations.push('Use 1080x1080 (square) or 1080x1350 (portrait) for optimal Instagram display');
        score -= 10;
      }
    } else if (adData.mediaType === 'video') {
      if (duration >= 3 && duration <= 60) {
        score += 20;
        recommendations.push('Ideal Instagram video duration - perfect for feed and story engagement');
      } else if (duration > 60 && duration <= 90) {
        score += 10;
        recommendations.push('Good Instagram video length - consider shortening to under 60 seconds for better performance');
      } else if (duration > 90) {
        recommendations.push('Instagram videos perform best under 60 seconds - consider creating shorter version');
        score -= 15;
      } else {
        recommendations.push('Instagram videos should be at least 3 seconds long for proper display');
        score -= 10;
      }

      if (resolution.includes('1080x1920') || resolution.includes('9:16')) {
        score += 15;
        recommendations.push('Perfect Instagram Story dimensions - excellent for vertical viewing');
      } else if (resolution.includes('1080x1080')) {
        score += 10;
        recommendations.push('Good square format for Instagram feed - consider 9:16 for Stories');
      }
    }

    return score;
  }

  private static analyzeTikTokMedia(adData: AdData, recommendations: string[]): number {
    let score = 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    if (adData.mediaType === 'video') {
      if (duration >= 9 && duration <= 15) {
        score += 30;
        recommendations.push('Perfect TikTok duration - optimal for algorithm and engagement');
      } else if (duration > 15 && duration <= 60) {
        score += 20;
        recommendations.push('Good TikTok video length - shorter videos (9-15s) often perform better');
      } else if (duration > 60) {
        recommendations.push('TikTok videos over 60 seconds have lower completion rates - consider shorter format');
        score -= 15;
      } else {
        recommendations.push('TikTok videos should be at least 9 seconds for optimal algorithm performance');
        score -= 10;
      }

      if (resolution.includes('1080x1920') || resolution.includes('9:16')) {
        score += 20;
        recommendations.push('Perfect TikTok vertical format - optimized for mobile viewing');
      } else {
        recommendations.push('Use vertical 9:16 aspect ratio (1080x1920) for TikTok optimization');
        score -= 15;
      }
    } else {
      recommendations.push('TikTok is primarily a video platform - image ads have limited effectiveness');
      score -= 20;
    }

    return score;
  }

  private static analyzeFacebookMedia(adData: AdData, recommendations: string[]): number {
    let score = 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    if (adData.mediaType === 'video') {
      if (duration >= 15 && duration <= 240) {
        score += 20;
        recommendations.push('Excellent Facebook video duration - ideal for audience retention');
      } else if (duration < 15) {
        recommendations.push('Facebook videos perform better when at least 15 seconds long');
        score -= 8;
      } else {
        recommendations.push('Facebook videos over 4 minutes may lose audience attention - consider shorter format');
        score -= 12;
      }

      if (resolution.includes('1920x1080') || resolution.includes('16:9')) {
        score += 15;
        recommendations.push('Perfect Facebook video format - optimized for desktop and mobile');
      } else if (resolution.includes('1080x1080')) {
        score += 10;
        recommendations.push('Good square format for Facebook - works well across devices');
      }
    } else if (adData.mediaType === 'image') {
      if (resolution.includes('1200x630') || resolution.includes('1.91:1')) {
        score += 20;
        recommendations.push('Ideal Facebook image dimensions - perfect for link posts and ads');
      } else if (resolution.includes('1080x1080')) {
        score += 15;
        recommendations.push('Great square format for Facebook - excellent engagement potential');
      } else {
        recommendations.push('Use 1200x630 (landscape) or 1080x1080 (square) for optimal Facebook display');
        score -= 10;
      }
    }

    return score;
  }

  private static analyzeYouTubeMedia(adData: AdData, recommendations: string[]): number {
    let score = 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    if (adData.mediaType === 'video') {
      if (duration >= 30 && duration <= 300) {
        score += 25;
        recommendations.push('Excellent YouTube ad duration - optimal for pre-roll and mid-roll placement');
      } else if (duration >= 15 && duration < 30) {
        score += 15;
        recommendations.push('Good for YouTube bumper ads - consider longer format for more comprehensive messaging');
      } else if (duration > 300) {
        recommendations.push('Long YouTube ads may experience high skip rates - consider shorter versions');
        score -= 10;
      } else {
        recommendations.push('YouTube ads should be at least 15 seconds for effective messaging');
        score -= 15;
      }

      if (resolution.includes('1920x1080') || resolution.includes('16:9')) {
        score += 20;
        recommendations.push('Perfect YouTube format - HD quality optimized for platform standards');
      } else if (resolution.includes('1280x720')) {
        score += 10;
        recommendations.push('Good HD quality - consider 1920x1080 for premium appearance');
      } else {
        recommendations.push('Use 1920x1080 (16:9) resolution for optimal YouTube display quality');
        score -= 15;
      }
    } else {
      recommendations.push('YouTube is a video platform - consider creating video content for better performance');
      score -= 25;
    }

    return score;
  }

  private static analyzeLinkedInMedia(adData: AdData, recommendations: string[]): number {
    let score = 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    if (adData.mediaType === 'video') {
      if (duration >= 30 && duration <= 180) {
        score += 20;
        recommendations.push('Ideal LinkedIn video length - perfect for professional engagement');
      } else if (duration > 180) {
        recommendations.push('LinkedIn videos over 3 minutes may lose professional audience attention');
        score -= 10;
      } else {
        recommendations.push('LinkedIn videos should be at least 30 seconds for meaningful professional messaging');
        score -= 8;
      }

      if (resolution.includes('1920x1080') || resolution.includes('1080x1920')) {
        score += 15;
        recommendations.push('Excellent LinkedIn video quality - professional standard resolution');
      }
    } else if (adData.mediaType === 'image') {
      if (resolution.includes('1200x627') || resolution.includes('1.91:1')) {
        score += 20;
        recommendations.push('Perfect LinkedIn image format - optimized for professional feed display');
      } else if (resolution.includes('1080x1080')) {
        score += 15;
        recommendations.push('Good square format for LinkedIn - works well for carousel posts');
      } else {
        recommendations.push('Use 1200x627 for LinkedIn single image posts or 1080x1080 for carousel content');
        score -= 8;
      }
    }

    return score;
  }

  private static analyzeTwitterMedia(adData: AdData, recommendations: string[]): number {
    let score = 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    if (adData.mediaType === 'video') {
      if (duration >= 6 && duration <= 140) {
        score += 20;
        recommendations.push('Great Twitter video length - optimized for timeline engagement');
      } else if (duration > 140) {
        recommendations.push('Twitter videos over 140 seconds may not autoplay - consider shorter format');
        score -= 12;
      } else {
        recommendations.push('Twitter videos should be at least 6 seconds for effective messaging');
        score -= 10;
      }

      if (resolution.includes('1280x720') || resolution.includes('1920x1080')) {
        score += 15;
        recommendations.push('Excellent Twitter video quality - HD format for professional appearance');
      }
    } else if (adData.mediaType === 'image') {
      if (resolution.includes('1200x675') || resolution.includes('16:9')) {
        score += 20;
        recommendations.push('Perfect Twitter image format - optimized for timeline display');
      } else if (resolution.includes('1080x1080')) {
        score += 10;
        recommendations.push('Good square format for Twitter - consider 16:9 for better timeline presence');
      } else {
        recommendations.push('Use 1200x675 (16:9) for optimal Twitter image display');
        score -= 8;
      }
    }

    return score;
  }

  private static analyzeGenericMedia(adData: AdData, recommendations: string[]): number {
    let score = 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    if (adData.mediaType === 'video') {
      if (duration >= 15 && duration <= 120) {
        score += 15;
        recommendations.push('Good video duration for most platforms - versatile length for various uses');
      } else if (duration > 120) {
        recommendations.push('Consider shorter video format for better cross-platform compatibility');
        score -= 8;
      } else {
        recommendations.push('Video should be at least 15 seconds for effective messaging');
        score -= 10;
      }

      if (resolution.includes('1920x1080') || resolution.includes('1080x1080')) {
        score += 10;
        recommendations.push('Good video quality - suitable for most digital platforms');
      }
    } else if (adData.mediaType === 'image') {
      if (resolution.includes('1080') || resolution.includes('1200')) {
        score += 15;
        recommendations.push('Good image resolution - suitable for most digital advertising platforms');
      } else {
        recommendations.push('Consider higher resolution images (1080p+) for better display quality');
        score -= 5;
      }
    }

    return score;
  }

  /**
   * Get evaluation history for a user or IP
   */
  static async getEvaluationHistory(ipAddress: string, userEmail?: string, limit: number = 10) {
    try {
      if (userEmail) {
        return await DatabaseService.getUserEvaluations(userEmail, limit);
      } else {
        return await DatabaseService.getEvaluationsByIP(ipAddress, limit);
      }
    } catch (error) {
      console.error('Error fetching evaluation history:', error);
      return [];
    }
  }

  /**
   * Get platform performance insights
   */
  static async getPlatformInsights(platform: string) {
    try {
      return await DatabaseService.getPlatformStats(platform);
    } catch (error) {
      console.error('Error fetching platform insights:', error);
      return null;
    }
  }

  /**
   * Get industry performance insights
   */
  static async getIndustryInsights(industry: string) {
    try {
      return await DatabaseService.getIndustryStats(industry);
    } catch (error) {
      console.error('Error fetching industry insights:', error);
      return null;
    }
  }

  /**
   * Validate ad data before evaluation
   */
  static validateAdData(adData: AdData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!adData.title?.trim()) {
      errors.push('Ad title is required');
    }

    if (!adData.description?.trim()) {
      errors.push('Ad description is required');
    }

    if (!adData.platform) {
      errors.push('Target platform is required');
    }

    if (!adData.industry) {
      errors.push('Industry is required');
    }

    if (!adData.goals) {
      errors.push('Campaign goals are required');
    }

    if (!adData.audience?.trim()) {
      errors.push('Target audience description is required');
    }

    if (!adData.country) {
      errors.push('Target country is required');
    }

    if (!adData.adType) {
      errors.push('Ad type is required');
    }

    if (!adData.targetAge) {
      errors.push('Target age range is required');
    }

    // Media file validation
    if ((adData.adType === 'video' || adData.adType === 'image') && !adData.mediaFile) {
      errors.push(`${adData.adType === 'video' ? 'Video' : 'Image'} file is required for this ad type`);
    }

    if (adData.mediaFile) {
      const maxSize = adData.mediaType === 'video' ? 500 * 1024 * 1024 : 10 * 1024 * 1024; // 500MB for video, 10MB for image
      if (adData.mediaFile.size > maxSize) {
        errors.push(`File size too large. Maximum ${adData.mediaType === 'video' ? '500MB' : '10MB'} allowed`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get comprehensive evaluation with additional insights
   */
  static async getComprehensiveEvaluation(
    adData: AdData,
    ipAddress: string,
    userEmail?: string,
    userName?: string
  ) {
    try {
      // Validate data first
      const validation = this.validateAdData(adData);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // Get the main evaluation
      const evaluation = await this.evaluateAd(adData, ipAddress, userEmail, userName);
      
      if (!evaluation.success) {
        return evaluation;
      }

      // Get additional insights
      const [platformInsights, industryInsights] = await Promise.all([
        this.getPlatformInsights(adData.platform),
        this.getIndustryInsights(adData.industry)
      ]);

      return {
        ...evaluation,
        platformInsights,
        industryInsights
      };
    } catch (error) {
      console.error('Error in comprehensive evaluation:', error);
      return {
        success: false,
        error: 'Failed to complete comprehensive evaluation'
      };
    }
  }
}

export default EvaluationService;