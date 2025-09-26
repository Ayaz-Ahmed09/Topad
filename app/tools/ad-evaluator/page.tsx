'use client';

import { useState, useEffect, useRef } from 'react';
import { Target, Zap, BarChart3, Lightbulb, ArrowRight, CheckCircle, AlertCircle, User, Clock, Star, TrendingUp, Award, Upload, Image, Video, FileVideo, FileImage, LogIn, UserPlus, Menu, X, Eye, Shield, Cpu, Database } from 'lucide-react';
import { DisplayAd } from '@/components/AdSenseComponents';
import EvaluationService from '@/lib/evaluation-service';
import DatabaseService from '@/lib/database-helpers';
import { UserService } from '@/lib/user-service';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

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
  mediaFile?: File;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  mediaDuration?: number;
  mediaSize?: number;
  mediaResolution?: string;
}

interface EvaluationResult {
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

interface UserInfo {
  id: string;
  email: string;
  name: string;
  remainingUses: number;
  totalUses: number;
  isPremium: boolean;
}

interface UsageTracker {
  ip: string;
  count: number;
  lastUsed: string;
}

export default function AdEvaluatorPage() {
  const [adData, setAdData] = useState<AdData>({
    title: '',
    description: '',
    platform: '',
    audience: '',
    industry: '',
    budget: '',
    goals: '',
    country: '',
    adType: '',
    targetAge: '',
    targetGender: '',
    language: 'en'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);
  const [usageTracker, setUsageTracker] = useState<UsageTracker | null>(null);
  const [userIP, setUserIP] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login/Signup form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    email: '',
    name: '',
    password: ''
  });

  useEffect(() => {
    // Get user IP and check usage
    initializeUser();
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('adToolUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserInfo(user);
        loadUserStatsFromDatabase(user.email);
      } catch (error) {
        localStorage.removeItem('adToolUser');
      }
    }
  }, []);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const initializeUser = async () => {
    try {
      // Get user IP
      const ip = await DatabaseService.getUserIP();
      setUserIP(ip);

      // Check/create IP usage record
      let usage = await DatabaseService.getIPUsage(ip);
      
      if (!usage) {
        usage = await DatabaseService.createIPTracker(ip);
      }
      
      if (usage) {
        // Check if it's a new day and reset count
        const today = new Date().toDateString();
        const lastUsedDate = new Date(usage.lastUsed).toDateString();
        
        if (today !== lastUsedDate) {
          // Reset daily count
          usage = await DatabaseService.updateIPUsage(ip);
        }
        
        setUsageTracker(usage);
      }
    } catch (error) {
      console.error('Failed to initialize user:', error);
      // Set default values if initialization fails
      setUsageTracker({ ip: 'unknown', count: 0, lastUsed: new Date().toISOString() });
    }
  };

  const loadUserStatsFromDatabase = async (email: string) => {
    try {
      const stats = await DatabaseService.getUserStats(email);
      setUserStats(stats);
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdData(prev => ({ ...prev, [name]: value }));
  };

  // Auto-cleanup function for temporary files
  const cleanupTempFile = (url: string) => {
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error cleaning up temp file:', error);
      }
    }, 100);
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Maximum 10MB allowed.');
      return;
    }

    const fileType = file.type.startsWith('image/') ? 'image' : 'video';
    
    // Validate file type matches ad type
    if (adData.adType === 'image' && !file.type.startsWith('image/')) {
      setError('Please upload an image file for image ad type.');
      return;
    }
    
    if (adData.adType === 'video' && !file.type.startsWith('video/')) {
      setError('Please upload a video file for video ad type.');
      return;
    }

    setError(null); // Clear any previous errors
    
    // Create temporary URL for analysis (auto-cleanup after use)
    const tempUrl = URL.createObjectURL(file);
    
    setAdData(prev => ({
      ...prev,
      mediaFile: file,
      mediaType: fileType,
      mediaSize: file.size,
      mediaUrl: tempUrl
    }));

    // For video files, try to get duration and resolution
    if (fileType === 'video') {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        setAdData(prev => ({
          ...prev,
          mediaDuration: video.duration,
          mediaResolution: `${video.videoWidth}x${video.videoHeight}`
        }));
        cleanupTempFile(video.src);
      };
      video.onerror = () => cleanupTempFile(video.src);
      video.src = tempUrl;
    } else if (fileType === 'image') {
      const img = new Image();
      img.onload = () => {
        setAdData(prev => ({
          ...prev,
          mediaResolution: `${img.width}x${img.height}`
        }));
        cleanupTempFile(img.src);
      };
      img.onerror = () => cleanupTempFile(img.src);
      img.src = tempUrl;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        handleFileUpload(file);
      } else {
        setError('Please upload an image or video file');
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Hash password
      const passwordHash = await UserService.hashPassword(signupData.password);
      
      // Create user
      const newUser = await UserService.getOrCreateUser(
        signupData.email, 
        signupData.name, 
        passwordHash
      );

      if (!newUser) {
        setError('Failed to create account. Email might already exist.');
        return;
      }

      const user: UserInfo = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        remainingUses: 50,
        totalUses: 0,
        isPremium: newUser.is_premium
      };
      
      setUserInfo(user);
      localStorage.setItem('adToolUser', JSON.stringify(user));
      setShowSignupForm(false);
      setSignupData({ email: '', name: '', password: '' });
      await loadUserStatsFromDatabase(user.email);
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const existingUser = await DatabaseService.getUser(loginData.email);

      if (!existingUser) {
        setError('User not found. Please check your email or sign up.');
        return;
      }

      // Verify password
      const isValidPassword = await UserService.verifyPassword(
        loginData.password, 
        existingUser.password_hash || ''
      );

      if (!isValidPassword) {
        setError('Invalid password. Please try again.');
        return;
      }

      const user: UserInfo = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        remainingUses: existingUser.is_premium ? 999 : 50,
        totalUses: existingUser.total_evaluations || 0,
        isPremium: existingUser.is_premium || false
      };
      
      setUserInfo(user);
      localStorage.setItem('adToolUser', JSON.stringify(user));
      setShowLoginForm(false);
      setLoginData({ email: '', password: '' });
      await loadUserStatsFromDatabase(user.email);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUserInfo(null);
    setUserStats(null);
    localStorage.removeItem('adToolUser');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check usage limits
    const canEvaluate = await DatabaseService.canUserEvaluate(userIP, userInfo?.email);
    
    if (!canEvaluate.canEvaluate) {
      if (!userInfo) {
        setShowSignupForm(true);
      }
      setError(canEvaluate.message || 'Usage limit reached');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the EvaluationService for complete evaluation
      const evaluationResponse = await EvaluationService.getComprehensiveEvaluation(
        adData,
        userIP,
        userInfo?.email,
        userInfo?.name
      );

      if (!evaluationResponse.success) {
        if (evaluationResponse.rateLimited) {
          setShowSignupForm(true);
        }
        setError(evaluationResponse.error || 'Evaluation failed');
        return;
      }

      // Set the result
      if (evaluationResponse.evaluation) {
        setResult(evaluationResponse.evaluation);
      }

      // Update usage tracking
      if (userInfo) {
        await loadUserStatsFromDatabase(userInfo.email);
      } else {
        await DatabaseService.updateIPUsage(userIP);
        const updatedUsage = await DatabaseService.getIPUsage(userIP);
        setUsageTracker(updatedUsage);
      }

      // Cleanup media file URL after successful evaluation
      if (adData.mediaUrl) {
        cleanupTempFile(adData.mediaUrl);
      }
      
    } catch (err) {
      setError('Failed to evaluate ad. Please try again.');
      console.error('Evaluation error:', err);
      
      // Cleanup on error too
      if (adData.mediaUrl) {
        cleanupTempFile(adData.mediaUrl);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  // Check if form is valid for submission
  const isFormValid = adData.title.trim() && 
                     adData.description.trim() && 
                     adData.platform && 
                     adData.audience.trim() && 
                     adData.industry && 
                     adData.goals && 
                     adData.country && 
                     adData.adType && 
                     adData.targetAge &&
                     // Check media file requirement for image/video ads
                     ((adData.adType === 'image' || adData.adType === 'video') ? adData.mediaFile : true);

  const remainingFreeUses = userInfo ? 
    (userInfo.isPremium ? 999 : Math.max(0, 50 - (userStats?.todayEvaluationCount || 0))) : 
    Math.max(0, 3 - (usageTracker?.count || 0));
  
  const canEvaluate = remainingFreeUses > 0;

  return (
    <div className="min-h-screen bg-theme-gradient">
      {/* Custom Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-orange-500/30 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Ad Evaluator</span>
                <div className="text-xs text-orange-400">Professional Analysis</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {userInfo ? (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{userInfo.name}</p>
                    <p className="text-xs text-orange-400">{remainingFreeUses} evaluations left today</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="text-right text-sm">
                    <p className="text-orange-400 font-medium">Free User</p>
                    <p className="text-gray-400">{remainingFreeUses}/3 evaluations left</p>
                  </div>
                  <button
                    onClick={() => setShowLoginForm(true)}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => setShowSignupForm(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              {userInfo ? (
                <div className="space-y-3">
                  <div className="px-4">
                    <p className="text-sm font-medium text-white">{userInfo.name}</p>
                    <p className="text-xs text-orange-400">{remainingFreeUses} evaluations left today</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="px-4 mb-3">
                    <p className="text-sm text-orange-400 font-medium">Free User</p>
                    <p className="text-xs text-gray-400">{remainingFreeUses}/3 evaluations left</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowLoginForm(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowSignupForm(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 bg-orange-500 text-white rounded-lg transition-colors flex items-center space-x-2 mx-4"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up for 50 Daily Evaluations</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center schema-card ring-1 ring-white/80 rounded-full px-6 py-3 mb-8">
              <Target className="mr-2 text-orange-500" size={20} />
              <span className="text-white font-semibold">Advanced Algorithmic Analysis</span>
              <Star className="ml-2 text-orange-400" size={16} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-heading-readable mb-8">
              Professional <span className="text-warm">Ad Evaluator</span>
            </h1>
            <p className="text-xl md:text-2xl text-readable max-w-4xl mx-auto leading-relaxed mb-8">
              Get comprehensive ad analysis using advanced algorithms that evaluate creativity, platform optimization, 
              audience alignment, and conversion potential. Upload media files for complete evaluation including 
              technical specifications and platform-specific recommendations.
            </p>
            
            {/* Key Features */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="small-card text-center p-4">
                <Cpu className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-accent-readable">50+ Data Points</div>
                <div className="text-xs text-readable">Comprehensive Analysis</div>
              </div>
              <div className="small-card text-center p-4">
                <Database className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-accent-readable">Industry Benchmarks</div>
                <div className="text-xs text-readable">Real Performance Data</div>
              </div>
              <div className="small-card text-center p-4">
                <Eye className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-accent-readable">Media Analysis</div>
                <div className="text-xs text-readable">Image & Video Support</div>
              </div>
              <div className="small-card text-center p-4">
                <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-accent-readable">Privacy First</div>
                <div className="text-xs text-readable">No Data Storage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisplayAd />

      {/* Signup Modal */}
      {showSignupForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="schema-card rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <UserPlus className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent-readable mb-2">
                Create Free Account
              </h3>
              <p className="text-readable">
                Get 50 professional ad evaluations daily - completely free!
              </p>
            </div>
            
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-accent-readable">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-accent-readable">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={signupData.name}
                  onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-accent-readable">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Create password"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSignupForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-800/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 font-semibold disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setShowSignupForm(false);
                  setShowLoginForm(true);
                }}
                className="text-sm text-orange-400 hover:text-orange-300"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="schema-card rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <LogIn className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent-readable mb-2">
                Welcome Back
              </h3>
              <p className="text-readable">
                Login to access your evaluation history
              </p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-accent-readable">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-accent-readable">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLoginForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-800/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 font-semibold disabled:opacity-50"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setShowLoginForm(false);
                  setShowSignupForm(true);
                }}
                className="text-sm text-orange-400 hover:text-orange-300"
              >
                Don't have an account? Sign up for free
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Evaluation Form */}
              <div>
                <div className="schema-card rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-accent-readable mb-6">
                    Professional Ad Analysis
                  </h2>
                  <p className="text-readable mb-8">
                    Our advanced algorithms analyze over 50 factors including platform optimization, 
                    audience alignment, industry benchmarks, and conversion potential. Upload media 
                    files for comprehensive technical analysis.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-accent-readable mb-2">
                          Ad Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={adData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                          placeholder="Your compelling ad headline"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="platform" className="block text-sm font-medium text-accent-readable mb-2">
                          Target Platform *
                        </label>
                        <select
                          id="platform"
                          name="platform"
                          value={adData.platform}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select platform</option>
                          <option value="facebook">Facebook</option>
                          <option value="instagram">Instagram</option>
                          <option value="google-ads">Google Ads</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">Twitter/X</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube</option>
                          <option value="pinterest">Pinterest</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-accent-readable mb-2">
                        Ad Description/Copy *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={adData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Your complete ad copy including call-to-action"
                      />
                    </div>
                    
                    {/* Advanced Targeting */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-accent-readable mb-2">
                          Target Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={adData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select country</option>
                          <option value="US">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="IN">India</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="targetAge" className="block text-sm font-medium text-accent-readable mb-2">
                          Target Age *
                        </label>
                        <select
                          id="targetAge"
                          name="targetAge"
                          value={adData.targetAge}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select age range</option>
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                          <option value="45-54">45-54</option>
                          <option value="55-64">55-64</option>
                          <option value="65+">65+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="targetGender" className="block text-sm font-medium text-accent-readable mb-2">
                          Target Gender
                        </label>
                        <select
                          id="targetGender"
                          name="targetGender"
                          value={adData.targetGender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">All genders</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="non-binary">Non-binary</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Industry & Campaign Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-accent-readable mb-2">
                          Industry *
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={adData.industry}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="retail">Retail</option>
                          <option value="education">Education</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="food-beverage">Food & Beverage</option>
                          <option value="travel">Travel & Tourism</option>
                          <option value="fitness">Fitness & Health</option>
                          <option value="fashion">Fashion & Beauty</option>
                          <option value="automotive">Automotive</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="adType" className="block text-sm font-medium text-accent-readable mb-2">
                          Ad Type *
                        </label>
                        <select
                          id="adType"
                          name="adType"
                          value={adData.adType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select ad type</option>
                          <option value="image">Single Image</option>
                          <option value="video">Video Ad</option>
                          <option value="carousel">Carousel</option>
                          <option value="collection">Collection</option>
                          <option value="story">Story Ad</option>
                          <option value="search">Search Ad</option>
                          <option value="display">Display Ad</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-accent-readable mb-2">
                          Campaign Budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={adData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-1000">Under $1,000</option>
                          <option value="1000-5000">$1,000 - $5,000</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000-25000">$10,000 - $25,000</option>
                          <option value="25000-plus">$25,000+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="goals" className="block text-sm font-medium text-accent-readable mb-2">
                          Campaign Goals *
                        </label>
                        <select
                          id="goals"
                          name="goals"
                          value={adData.goals}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select primary goal</option>
                          <option value="brand-awareness">Brand Awareness</option>
                          <option value="lead-generation">Lead Generation</option>
                          <option value="sales">Sales/Conversions</option>
                          <option value="traffic">Website Traffic</option>
                          <option value="engagement">Engagement</option>
                          <option value="app-installs">App Installs</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="audience" className="block text-sm font-medium text-accent-readable mb-2">
                        Target Audience Description *
                      </label>
                      <input
                        type="text"
                        id="audience"
                        name="audience"
                        value={adData.audience}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        placeholder="e.g., Working professionals aged 25-35 interested in productivity tools"
                      />
                    </div>

                    {/* Media Upload Section */}
                    {(adData.adType === 'image' || adData.adType === 'video') && (
                      <div>
                        <label className="block text-sm font-medium text-accent-readable mb-2">
                          Upload {adData.adType === 'image' ? 'Image' : 'Video'} File *
                        </label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                            isDragOver 
                              ? 'border-orange-500 bg-orange-500/10' 
                              : 'border-orange-500/30 hover:border-orange-500/50'
                          }`}
                          onDrop={handleDrop}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragOver(true);
                          }}
                          onDragLeave={() => setIsDragOver(false)}
                        >
                          {adData.mediaFile ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-center">
                                {adData.mediaType === 'image' ? (
                                  <FileImage className="w-12 h-12 text-green-400" />
                                ) : (
                                  <FileVideo className="w-12 h-12 text-green-400" />
                                )}
                              </div>
                              <div>
                                <p className="text-green-400 font-medium">{adData.mediaFile.name}</p>
                                <p className="text-sm text-gray-400">
                                  {(adData.mediaFile.size / (1024 * 1024)).toFixed(2)} MB
                                  {adData.mediaResolution && ` • ${adData.mediaResolution}`}
                                  {adData.mediaDuration && ` • ${adData.mediaDuration.toFixed(1)}s`}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  if (adData.mediaUrl) cleanupTempFile(adData.mediaUrl);
                                  setAdData(prev => ({ 
                                    ...prev, 
                                    mediaFile: undefined, 
                                    mediaUrl: undefined,
                                    mediaType: undefined,
                                    mediaDuration: undefined,
                                    mediaSize: undefined,
                                    mediaResolution: undefined
                                  }));
                                }}
                                className="text-sm text-orange-400 hover:text-orange-300"
                              >
                                Remove file
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="flex items-center justify-center">
                                <Upload className="w-12 h-12 text-orange-400" />
                              </div>
                              <div>
                                <p className="text-accent-readable font-medium">
                                  Drop your {adData.adType} file here or click to browse
                                </p>
                                <p className="text-sm text-readable">
                                  Maximum 10MB • {adData.adType === 'image' ? 'JPG, PNG, GIF' : 'MP4, MOV, AVI'}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                              >
                                Choose File
                              </button>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept={adData.adType === 'image' ? 'image/*' : 'video/*'}
                                onChange={handleFileInputChange}
                                className="hidden"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isLoading || !isFormValid || !canEvaluate}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Analyzing Your Ad...
                        </>
                      ) : !canEvaluate ? (
                        <>
                          {userInfo ? 'Daily Limit Reached' : 'Sign Up for More Evaluations'}
                          <UserPlus className="ml-2 h-5 w-5" />
                        </>
                      ) : (
                        <>
                          Evaluate Ad ({remainingFreeUses} left)
                          <Zap className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>

                    {!canEvaluate && !userInfo && (
                      <div className="text-center">
                        <p className="text-orange-400 mb-3">
                          You've used all 3 free evaluations. Sign up to get 50 daily evaluations!
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowSignupForm(true)}
                          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                        >
                          Get 50 Free Daily Evaluations
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Results Section */}
              <div>
                {error && (
                  <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <p className="text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    <div className="schema-card rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-accent-readable mb-6">
                        Professional Analysis Results
                      </h3>
                      
                      {/* Enhanced Scores Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        <div className="small-card text-center p-4">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.scores.creativity)}`}>
                            {result.scores.creativity}
                          </div>
                          <div className="text-sm text-readable mb-1">Creativity</div>
                          <div className={`text-xs font-medium ${getScoreColor(result.scores.creativity)}`}>
                            {getScoreLabel(result.scores.creativity)}
                          </div>
                        </div>
                        
                        <div className="small-card text-center p-4">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.scores.viability)}`}>
                            {result.scores.viability}
                          </div>
                          <div className="text-sm text-readable mb-1">Platform Fit</div>
                          <div className={`text-xs font-medium ${getScoreColor(result.scores.viability)}`}>
                            {getScoreLabel(result.scores.viability)}
                          </div>
                        </div>
                        
                        <div className="small-card text-center p-4">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.scores.alignment)}`}>
                            {result.scores.alignment}
                          </div>
                          <div className="text-sm text-readable mb-1">Alignment</div>
                          <div className={`text-xs font-medium ${getScoreColor(result.scores.alignment)}`}>
                            {getScoreLabel(result.scores.alignment)}
                          </div>
                        </div>
                        
                        <div className="small-card text-center p-4">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.scores.engagement)}`}>
                            {result.scores.engagement}
                          </div>
                          <div className="text-sm text-readable mb-1">Engagement</div>
                          <div className={`text-xs font-medium ${getScoreColor(result.scores.engagement)}`}>
                            {getScoreLabel(result.scores.engagement)}
                          </div>
                        </div>
                        
                        <div className="small-card text-center p-4">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.scores.conversion)}`}>
                            {result.scores.conversion}
                          </div>
                          <div className="text-sm text-readable mb-1">Conversion</div>
                          <div className={`text-xs font-medium ${getScoreColor(result.scores.conversion)}`}>
                            {getScoreLabel(result.scores.conversion)}
                          </div>
                        </div>
                        
                        <div className="small-card text-center p-4 bg-gradient-to-r from-orange-500/20 to-red-600/20 border-2 border-orange-500/50">
                          <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.scores.overall)}`}>
                            {result.scores.overall}
                          </div>
                          <div className="text-sm font-semibold text-orange-400 mb-1">Overall Score</div>
                          <div className={`text-xs font-medium ${getScoreColor(result.scores.overall)}`}>
                            {getScoreLabel(result.scores.overall)}
                          </div>
                        </div>
                      </div>

                      {/* Media Analysis */}
                      {result.mediaAnalysis && (
                        <div className="small-card p-6 mb-6">
                          <h4 className="text-lg font-semibold text-accent-readable mb-4 flex items-center">
                            <FileImage className="w-5 h-5 mr-2 text-orange-400" />
                            Media Quality Analysis
                          </h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <div className="text-center mb-4">
                                <div className={`text-3xl font-bold ${getScoreColor(result.mediaAnalysis.qualityScore)}`}>
                                  {result.mediaAnalysis.qualityScore}
                                </div>
                                <div className="text-sm text-readable">Media Quality Score</div>
                              </div>
                              <div className="space-y-2">
                                <h5 className="font-medium text-accent-readable">Technical Specifications:</h5>
                                {result.mediaAnalysis.technicalSpecs.map((spec, index) => (
                                  <p key={index} className="text-sm text-readable">• {spec}</p>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-accent-readable mb-3">Media Recommendations:</h5>
                              <div className="space-y-2">
                                {result.mediaAnalysis.recommendations.map((rec, index) => (
                                  <div key={index} className="flex items-start space-x-2">
                                    <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-readable">{rec}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Detailed Analysis */}
                      <div className="small-card p-6 mb-6">
                        <h4 className="text-lg font-semibold text-accent-readable mb-4">
                          Detailed Professional Analysis
                        </h4>
                        <div className="prose prose-sm max-w-none text-readable">
                          <div className="whitespace-pre-line">{result.analysis}</div>
                        </div>
                      </div>
                      
                      {/* Recommendations */}
                      {result.recommendations && result.recommendations.length > 0 && (
                        <div className="small-card p-6">
                          <h4 className="text-lg font-semibold text-accent-readable mb-4">
                            Priority Recommendations
                          </h4>
                          <ul className="space-y-3">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </div>
                                <span className="text-readable">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-green-300 font-medium">
                            Analysis Complete - Professional Grade
                          </span>
                        </div>
                        <span className="text-sm text-green-400">
                          {new Date(result.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {!result && !isLoading && (
                  <div className="schema-card rounded-2xl p-8 text-center">
                    <Target className="h-16 w-16 text-orange-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-accent-readable mb-4">
                      Professional Ad Evaluation Ready
                    </h3>
                    <p className="text-readable mb-6">
                      Fill out the comprehensive form to get algorithmic analysis using industry benchmarks 
                      and platform-specific optimization recommendations.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-readable">50+ evaluation criteria</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-readable">Platform-specific optimization</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-readable">Industry benchmark comparison</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-readable">Media quality analysis</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Stats */}
                {userStats && (
                  <div className="schema-card rounded-2xl p-6 mt-6">
                    <h4 className="text-lg font-semibold text-accent-readable mb-4">
                      Your Usage Statistics
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-orange-400">{userStats.totalEvaluations}</div>
                        <div className="text-sm text-readable">Total Evaluations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-400">{userStats.remainingFreeUses}</div>
                        <div className="text-sm text-readable">Remaining Today</div>
                      </div>
                    </div>
                    {userStats.lastEvaluationDate && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-readable">
                          Last evaluation: {new Date(userStats.lastEvaluationDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisplayAd />

      {/* Algorithm Features */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-readable mb-4">
              Advanced Evaluation Engine
            </h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Professional-grade analysis using proprietary algorithms and industry data
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="small-card text-center p-6">
              <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Multi-Factor Analysis
              </h3>
              <p className="text-readable text-sm">
                Comprehensive evaluation of creativity, platform fit, audience alignment, engagement potential, and conversion optimization.
              </p>
            </div>
            
            <div className="small-card text-center p-6">
              <BarChart3 className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Industry Benchmarks
              </h3>
              <p className="text-readable text-sm">
                Compare your ads against real industry data and platform-specific performance metrics from successful campaigns.
              </p>
            </div>
            
            <div className="small-card text-center p-6">
              <Lightbulb className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Actionable Insights
              </h3>
              <p className="text-readable text-sm">
                Receive specific, implementable recommendations to improve your ad performance and maximize ROI.
              </p>
            </div>
            
            <div className="small-card text-center p-6">
              <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Instant Results
              </h3>
              <p className="text-readable text-sm">
                Get professional analysis in seconds with detailed scoring and optimization recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-readable mb-4">
              How Our Evaluation Works
            </h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Our proprietary algorithm analyzes your ads using the same criteria that top advertising agencies use
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-accent-readable mb-3">Input Your Ad</h3>
              <p className="text-readable">
                Provide your ad copy, target platform, audience details, and upload media files for comprehensive analysis.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-accent-readable mb-3">Algorithm Analysis</h3>
              <p className="text-readable">
                Our advanced algorithms evaluate 50+ factors including platform requirements, industry benchmarks, and conversion psychology.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-accent-readable mb-3">Get Results</h3>
              <p className="text-readable">
                Receive detailed scores, professional analysis, and specific recommendations to optimize your ad performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DisplayAd />

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="schema-card rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <Award className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-accent-readable mb-6">
              Ready to Optimize Your Ads?
            </h2>
            <p className="text-xl text-readable mb-8 max-w-2xl mx-auto">
              Join thousands of marketers who use our professional ad evaluator to improve their campaign performance and maximize ROI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!userInfo && (
                <button
                  onClick={() => setShowSignupForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  Start Free Analysis
                </button>
              )}
              <a
                href="https://wa.me/923096194974?text=Hi! I'm interested in professional ad optimization services"
                target="_blank"
                className="border-2 border-orange-500 text-orange-400 px-8 py-4 rounded-xl font-semibold hover:bg-orange-500/10 transition-all duration-300"
              >
                Get Expert Help
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}