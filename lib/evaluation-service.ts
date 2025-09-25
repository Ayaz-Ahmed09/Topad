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
      } else