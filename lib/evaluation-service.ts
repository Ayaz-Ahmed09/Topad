// lib/evaluation-service.ts - Main evaluation service
import { AdEvaluationEngine } from './ad-algorithms';
import { UserService } from './user-service';

export class EvaluationService {
  
  static async evaluateAd(adData: any, userEmail: string, userName: string, isOwner: boolean = false) {
    try {
      // Get or create user
      const user = await UserService.getOrCreateUser(userEmail, userName);
      
      // Check if user can use the tool
      const usageCheck = await UserService.canUseEvaluationTool(user.id, isOwner);
      
      if (!usageCheck.canUse) {
        return {
          success: false,
          error: usageCheck.message,
          needsUpgrade: true,
          remainingUses: usageCheck.remainingUses
        };
      }
      
      // Run the algorithmic evaluation
      const algorithmResult = AdEvaluationEngine.evaluateAd(adData);
      
      // Prepare the result
      const evaluationResult = {
        scores: algorithmResult.scores,
        analysis: this.formatAnalysis(algorithmResult.analysis, algorithmResult.recommendations),
        recommendations: algorithmResult.recommendations,
        timestamp: new Date().toISOString(),
        algorithm_version: '1.0',
        metadata: {
          platform: adData.platform,
          industry: adData.industry,
          country: adData.country,
          evaluation_type: 'algorithmic'
        }
      };
      
      // Save to localStorage
      const savedEvaluation = await UserService.recordEvaluationUsage(
        user.id, 
        adData, 
        evaluationResult
      );
      
      // Get updated usage info
      const updatedUsage = await UserService.canUseEvaluationTool(user.id, isOwner);
      
      return {
        success: true,
        evaluation: evaluationResult,
        user: {
          remainingUses: updatedUsage.remainingUses,
          totalUses: user.toolUses + 1
        }
      };
      
    } catch (error) {
      console.error('Evaluation service error:', error);
      return {
        success: false,
        error: 'Failed to complete evaluation. Please try again.',
        technical_error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  private static formatAnalysis(analysis: any, recommendations: string[]): string {
    let formatted = "## PROFESSIONAL AD EVALUATION ANALYSIS\n\n";
    
    // Strengths
    if (analysis.strengths.length > 0) {
      formatted += "### ✅ STRENGTHS\n";
      analysis.strengths.forEach((strength: string, index: number) => {
        formatted += `${index + 1}. ${strength}\n`;
      });
      formatted += "\n";
    }
    
    // Weaknesses
    if (analysis.weaknesses.length > 0) {
      formatted += "### ⚠️ AREAS FOR IMPROVEMENT\n";
      analysis.weaknesses.forEach((weakness: string, index: number) => {
        formatted += `${index + 1}. ${weakness}\n`;
      });
      formatted += "\n";
    }
    
    // Platform-specific insights
    if (analysis.platformSpecific.length > 0) {
      formatted += "### 📱 PLATFORM-SPECIFIC INSIGHTS\n";
      analysis.platformSpecific.forEach((insight: string, index: number) => {
        formatted += `${index + 1}. ${insight}\n`;
      });
      formatted += "\n";
    }
    
    // Audience insights
    if (analysis.audienceInsights.length > 0) {
      formatted += "### 👥 AUDIENCE INSIGHTS\n";
      analysis.audienceInsights.forEach((insight: string, index: number) => {
        formatted += `${index + 1}. ${insight}\n`;
      });
      formatted += "\n";
    }
    
    // Recommendations
    if (recommendations.length > 0) {
      formatted += "### 💡 PRIORITY RECOMMENDATIONS\n";
      recommendations.forEach((rec: string, index: number) => {
        formatted += `${index + 1}. ${rec}\n`;
      });
      formatted += "\n";
    }
    
    formatted += "---\n*This analysis was generated using TopAd Digital's proprietary algorithmic evaluation system, analyzing 50+ factors including platform optimization, audience alignment, industry benchmarks, and conversion potential.*";
    
    return formatted;
  }
}