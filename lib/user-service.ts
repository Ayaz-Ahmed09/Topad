// lib/user-service.ts - User management with localStorage (no Supabase dependency)

interface User {
  id: string;
  email: string;
  name: string;
  toolUses: number;
  createdAt: string;
  lastUsed: string;
}

interface AdEvaluation {
  id: string;
  userId: string;
  adData: any;
  evaluationResult: any;
  createdAt: string;
}

export const PRICING_PLANS = {
  free: { name: 'Free', evaluations: 5, price: 0 },
  basic: { name: 'Basic', evaluations: 20, price: 25 },
  pro: { name: 'Professional', evaluations: 100, price: 75 },
  enterprise: { name: 'Enterprise', evaluations: 500, price: 200 }
};

export class UserService {
  
  // Create or get user (localStorage based)
  static async getOrCreateUser(email: string, name: string): Promise<User> {
    const users = this.getAllUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return existingUser;
    }
    
    // Create new user
    const newUser: User = {
      id: this.generateId(),
      email,
      name,
      toolUses: 0,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('adTool_users', JSON.stringify(users));
    
    return newUser;
  }
  
  // Check if user can use the tool (daily limit reset)
  static async canUseEvaluationTool(userId: string, isOwner: boolean = false): Promise<{
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
    
    const users = this.getAllUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if it's a new day (reset daily limit)
    const today = new Date().toDateString();
    const lastUsedDate = new Date(user.lastUsed).toDateString();
    
    let currentUses = user.toolUses;
    if (today !== lastUsedDate) {
      // Reset daily usage
      currentUses = 0;
      user.toolUses = 0;
      user.lastUsed = new Date().toISOString();
      this.updateUser(user);
    }
    
    const dailyLimit = 5; // 5 evaluations per day for free users
    const remainingUses = Math.max(0, dailyLimit - currentUses);
    
    return {
      canUse: remainingUses > 0,
      remainingUses,
      planType: 'free',
      message: remainingUses > 0 
        ? `${remainingUses} evaluations remaining today`
        : 'Daily limit reached. Try again tomorrow or contact us for premium access.'
    };
  }
  
  // Record tool usage
  static async recordEvaluationUsage(userId: string, adData: any, evaluationResult: any): Promise<AdEvaluation> {
    // Update user's tool usage count
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex].toolUses += 1;
    users[userIndex].lastUsed = new Date().toISOString();
    localStorage.setItem('adTool_users', JSON.stringify(users));
    
    // Save the evaluation
    const evaluation: AdEvaluation = {
      id: this.generateId(),
      userId,
      adData,
      evaluationResult,
      createdAt: new Date().toISOString()
    };
    
    const evaluations = this.getAllEvaluations();
    evaluations.push(evaluation);
    localStorage.setItem('adTool_evaluations', JSON.stringify(evaluations));
    
    return evaluation;
  }
  
  // Get user's evaluation history
  static async getUserEvaluations(userId: string, limit: number = 10): Promise<AdEvaluation[]> {
    const evaluations = this.getAllEvaluations();
    return evaluations
      .filter(e => e.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
  
  // Get user statistics
  static async getUserStats(userId: string) {
    const users = this.getAllUsers();
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const evaluations = await this.getUserEvaluations(userId, 100);
    
    // Calculate average scores from evaluations
    const avgScores = evaluations.reduce((acc, evaluation) => {
      const scores = eval.evaluationResult?.scores || {};
      acc.creativity += scores.creativity || 0;
      acc.viability += scores.viability || 0;
      acc.alignment += scores.alignment || 0;
      acc.count++;
      return acc;
    }, { creativity: 0, viability: 0, alignment: 0, count: 0 });
    
    const count = avgScores.count || 1;
    
    // Check daily remaining uses
    const today = new Date().toDateString();
    const lastUsedDate = new Date(user.lastUsed).toDateString();
    const dailyUses = today === lastUsedDate ? user.toolUses : 0;
    
    return {
      totalEvaluations: evaluations.length,
      memberSince: user.createdAt,
      averageScores: {
        creativity: Math.round(avgScores.creativity / count),
        viability: Math.round(avgScores.viability / count),
        alignment: Math.round(avgScores.alignment / count)
      },
      remainingFreeUses: Math.max(0, 5 - dailyUses),
      dailyUses
    };
  }
  
  // Helper methods
  private static getAllUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('adTool_users');
    return users ? JSON.parse(users) : [];
  }
  
  private static getAllEvaluations(): AdEvaluation[] {
    if (typeof window === 'undefined') return [];
    const evaluations = localStorage.getItem('adTool_evaluations');
    return evaluations ? JSON.parse(evaluations) : [];
  }
  
  private static updateUser(user: User): void {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('adTool_users', JSON.stringify(users));
    }
  }
  
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}