// lib/database-helpers.ts
import { supabase } from './supabase';

export interface AdData {
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
  mediaFile?: File;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  mediaDuration?: number;
  mediaSize?: number;
  mediaResolution?: string;
}

export interface EvaluationResult {
  analysis: string;
  scores: {
    creativity: number;
    viability: number;
    alignment: number;
    engagement: number;
    conversion: number;
    mediaQuality: number;
    overall: number;
  };
  recommendations: string[];
  mediaAnalysis?: {
    qualityScore: number;
    recommendations: string[];
    technicalSpecs: string[];
  };
  timestamp: string;
}

export interface UsageTracker {
  ip: string;
  count: number;
  lastUsed: string;
}

export interface UserStats {
  totalEvaluations: number;
  remainingFreeUses: number;
  averageScores?: {
    creativity: number;
    viability: number;
    alignment: number;
    engagement: number;
    conversion: number;
    overall: number;
  };
  lastEvaluationDate?: string;
  todayEvaluationCount: number;
}

export class DatabaseService {
  
  // IP Usage Tracking Functions
  static async getIPUsage(ipAddress: string): Promise<UsageTracker | null> {
    try {
      const { data, error } = await supabase
        .from('ip_usage_tracker')
        .select('*')
        .eq('ip_address', ipAddress)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching IP usage:', error);
        return null;
      }

      if (!data) return null;

      return {
        ip: data.ip_address,
        count: data.usage_count,
        lastUsed: data.last_used
      };
    } catch (error) {
      console.error('Error in getIPUsage:', error);
      return null;
    }
  }

  static async createIPTracker(ipAddress: string): Promise<UsageTracker | null> {
    try {
      const { data, error } = await supabase
        .from('ip_usage_tracker')
        .insert({
          ip_address: ipAddress,
          usage_count: 0,
          last_used: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating IP tracker:', error);
        return null;
      }

      return {
        ip: data.ip_address,
        count: data.usage_count,
        lastUsed: data.last_used
      };
    } catch (error) {
      console.error('Error in createIPTracker:', error);
      return null;
    }
  }

  static async updateIPUsage(ipAddress: string): Promise<UsageTracker | null> {
    try {
      // First check if we need to reset daily count
      const currentUsage = await this.getIPUsage(ipAddress);
      const now = new Date();
      const lastUsed = currentUsage ? new Date(currentUsage.lastUsed) : new Date();
      const isNewDay = now.getDate() !== lastUsed.getDate() || 
                       now.getMonth() !== lastUsed.getMonth() || 
                       now.getFullYear() !== lastUsed.getFullYear();

      const newCount = isNewDay ? 1 : (currentUsage ? currentUsage.count + 1 : 1);

      const { data, error } = await supabase
        .from('ip_usage_tracker')
        .upsert({
          ip_address: ipAddress,
          usage_count: newCount,
          last_used: now.toISOString(),
          updated_at: now.toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating IP usage:', error);
        return null;
      }

      return {
        ip: data.ip_address,
        count: data.usage_count,
        lastUsed: data.last_used
      };
    } catch (error) {
      console.error('Error in updateIPUsage:', error);
      return null;
    }
  }

  // User Management Functions
  static async createUser(email: string, name: string, passwordHash?: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          email: email.toLowerCase(),
          name: name.trim(),
          password_hash: passwordHash,
          is_premium: false,
          total_evaluations: 0,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createUser:', error);
      return null;
    }
  }

  static async getUser(email: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getUser:', error);
      return null;
    }
  }

  static async getOrCreateUser(email: string, name: string, passwordHash?: string) {
    try {
      let user = await this.getUser(email);
      
      if (!user) {
        user = await this.createUser(email, name, passwordHash);
      }

      return user;
    } catch (error) {
      console.error('Error in getOrCreateUser:', error);
      return null;
    }
  }

  // User Statistics Functions
  static async getUserStats(email: string): Promise<UserStats | null> {
    try {
      const { data: evaluations, error } = await supabase
        .from('user_evaluations')
        .select('*')
        .eq('email', email.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user stats:', error);
        return null;
      }

      const today = new Date().toDateString();
      const todayEvaluations = evaluations?.filter(eval => 
        new Date(eval.created_at).toDateString() === today
      ) || [];

      return {
        totalEvaluations: evaluations?.length || 0,
        remainingFreeUses: Math.max(0, 50 - todayEvaluations.length),
        lastEvaluationDate: evaluations?.[0]?.created_at,
        todayEvaluationCount: todayEvaluations.length
      };
    } catch (error) {
      console.error('Error in getUserStats:', error);
      return null;
    }
  }

  // Evaluation Storage Functions
  static async saveEvaluation(
    ipAddress: string,
    userEmail: string | null,
    adData: AdData,
    evaluationResult: EvaluationResult
  ) {
    try {
      const evaluationData = {
        ip_address: ipAddress,
        user_email: userEmail?.toLowerCase() || null,
        ad_data: adData,
        evaluation_result: evaluationResult,
        overall_score: evaluationResult.scores.overall,
        platform: adData.platform,
        industry: adData.industry,
        media_analyzed: !!adData.mediaFile,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('evaluations')
        .insert(evaluationData)
        .select()
        .single();

      if (error) {
        console.error('Error saving evaluation:', error);
        return null;
      }

      // If user is registered, also save to user_evaluations table
      if (userEmail) {
        await this.saveUserEvaluation(userEmail, adData, evaluationResult);
      }

      return data;
    } catch (error) {
      console.error('Error in saveEvaluation:', error);
      return null;
    }
  }

  static async saveUserEvaluation(
    email: string,
    adData: AdData,
    evaluationResult: EvaluationResult
  ) {
    try {
      // Get user name
      const user = await this.getUser(email);
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_evaluations')
        .insert({
          email: email.toLowerCase(),
          name: user.name,
          ad_data: adData,
          evaluation_result: evaluationResult,
          overall_score: evaluationResult.scores.overall,
          platform: adData.platform,
          industry: adData.industry,
          media_analyzed: !!adData.mediaFile,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving user evaluation:', error);
        return null;
      }

      // Update user's total evaluations count
      await supabase
        .from('users')
        .update({
          total_evaluations: user.total_evaluations + 1,
          last_evaluation: new Date().toISOString()
        })
        .eq('email', email.toLowerCase());

      return data;
    } catch (error) {
      console.error('Error in saveUserEvaluation:', error);
      return null;
    }
  }

  // Check if user can evaluate (for rate limiting)
  static async canUserEvaluate(ipAddress: string, userEmail?: string): Promise<{canEvaluate: boolean, remainingUses: number, message?: string}> {
    try {
      if (userEmail) {
        // Registered users have higher limits (50 per day)
        const stats = await this.getUserStats(userEmail);
        const remainingUses = stats?.remainingFreeUses || 0;
        
        return {
          canEvaluate: remainingUses > 0,
          remainingUses,
          message: remainingUses === 0 ? 'Daily limit of 50 evaluations reached. Try again tomorrow.' : undefined
        };
      } else {
        // Anonymous users limited to 3 per day
        const usage = await this.getIPUsage(ipAddress);
        
        if (!usage) {
          // Create new IP tracker
          await this.createIPTracker(ipAddress);
          return {
            canEvaluate: true,
            remainingUses: 3,
            message: undefined
          };
        }

        // Check if it's a new day
        const today = new Date().toDateString();
        const lastUsedDate = new Date(usage.lastUsed).toDateString();
        const isNewDay = today !== lastUsedDate;
        
        const usedToday = isNewDay ? 0 : usage.count;
        const remainingUses = Math.max(0, 3 - usedToday);
        
        return {
          canEvaluate: remainingUses > 0,
          remainingUses,
          message: remainingUses === 0 ? 'You have reached the free limit of 3 evaluations. Please sign up to get 50 daily evaluations.' : undefined
        };
      }
    } catch (error) {
      console.error('Error in canUserEvaluate:', error);
      return {
        canEvaluate: false,
        remainingUses: 0,
        message: 'Unable to check usage limits. Please try again.'
      };
    }
  }

  // Utility function to get user IP address
  static async getUserIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch (error) {
      console.error('Error getting user IP:', error);
      return 'unknown';
    }
  }
}

export default DatabaseService;