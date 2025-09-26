// lib/user-service.ts - User management with Supabase
import { supabase } from './supabase';
import DatabaseService from './database-helpers';

export const PRICING_PLANS = {
  free: { name: 'Free', evaluations: 50, price: 0, description: '50 evaluations per day' },
  premium: { name: 'Premium', evaluations: 999, price: 0, description: 'Unlimited evaluations' }
};

export interface User {
  id: string;
  email: string;
  name: string;
  is_premium: boolean;
  total_evaluations: number;
  last_evaluation: string | null;
  created_at: string;
}

export class UserService {
  
  // Create or get user
  static async getOrCreateUser(email: string, name: string, passwordHash?: string): Promise<User | null> {
    try {
      // First check if user already exists
      const existingUser = await DatabaseService.getUser(email);
      
      if (existingUser) {
        return existingUser;
      }
      
      // Create new user
      const newUser = await DatabaseService.createUser(email, name, passwordHash);
      return newUser;
    } catch (error) {
      console.error('Error in getOrCreateUser:', error);
      return null;
    }
  }
  
  // Check if user can use the tool
  static async canUseEvaluationTool(email: string, isOwner: boolean = false): Promise<{
    canUse: boolean;
    remainingUses: number;
    planType: string;
    message: string;
  }> {
    if (isOwner) {
      return {
        canUse: true,
        remainingUses: 999999,
        planType: 'owner',
        message: 'Owner access - unlimited evaluations'
      };
    }
    
    try {
      const stats = await DatabaseService.getUserStats(email);
      const remainingUses = stats?.remainingFreeUses || 0;
      
      return {
        canUse: remainingUses > 0,
        remainingUses,
        planType: 'free',
        message: remainingUses > 0 
          ? `${remainingUses} evaluations remaining today`
          : 'Daily limit of 50 evaluations reached. Try again tomorrow.'
      };
    } catch (error) {
      console.error('Error checking tool usage:', error);
      return {
        canUse: false,
        remainingUses: 0,
        planType: 'free',
        message: 'Unable to check usage limits. Please try again.'
      };
    }
  }
  
  // Record tool usage
  static async recordEvaluationUsage(email: string, adData: any, evaluationResult: any) {
    try {
      return await DatabaseService.saveUserEvaluation(email, adData, evaluationResult);
    } catch (error) {
      console.error('Error recording evaluation usage:', error);
      return null;
    }
  }
  
  // Get user's evaluation history
  static async getUserEvaluations(email: string, limit: number = 10) {
    try {
      const { data, error } = await supabase
        .from('user_evaluations')
        .select('*')
        .eq('email', email.toLowerCase())
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching user evaluations:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserEvaluations:', error);
      return [];
    }
  }
  
  // Get user statistics
  static async getUserStats(email: string) {
    try {
      return await DatabaseService.getUserStats(email);
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  }

  // Simple password hashing (for demo - use proper hashing in production)
  static async hashPassword(password: string): Promise<string> {
    // Simple hash for demo - use bcrypt or similar in production
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Verify password
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const hashedInput = await this.hashPassword(password);
    return hashedInput === hash;
  }
}