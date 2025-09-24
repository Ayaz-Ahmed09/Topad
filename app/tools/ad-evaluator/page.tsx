'use client';

import { useState, useEffect } from 'react';
import { Target, Zap, BarChart3, Lightbulb, ArrowRight, CheckCircle, AlertCircle, User, Clock, Star, TrendingUp, Award } from 'lucide-react';
import { DisplayAd } from '@/components/AdSenseComponents';
import { evaluateAdCreativity } from '@/lib/ai';
import { UserService, PRICING_PLANS } from '@/lib/user-service';
import type { Metadata } from 'next';

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

interface EvaluationResult {
  analysis: string;
  scores: {
    creativity: number;
    viability: number;
    alignment: number;
    engagement: number;
    conversion: number;
    overall: number;
  };
  recommendations: string[];
  timestamp: string;
}

interface UserInfo {
  email: string;
  name: string;
  remainingUses: number;
  totalUses: number;
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
    language: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    name: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('adToolUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserInfo(user);
      loadUserStats(user.email);
    }
  }, []);

  const loadUserStats = async (email: string) => {
    try {
      const user = await UserService.getOrCreateUser(email, userInfo?.name || 'User');
      const stats = await UserService.getUserStats(user.id);
      setUserStats(stats);
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email && loginData.name) {
      const user = {
        email: loginData.email,
        name: loginData.name,
        remainingUses: 5,
        totalUses: 0
      };
      setUserInfo(user);
      localStorage.setItem('adToolUser', JSON.stringify(user));
      setShowLoginForm(false);
      loadUserStats(user.email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInfo) {
      setShowLoginForm(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const evaluation = await evaluateAdCreativity(adData, userInfo.email, userInfo.name);
      
      if (!evaluation.success) {
        setError(evaluation.error);
        return;
      }

      setResult(evaluation.evaluation);
      setUserInfo(prev => prev ? {
        ...prev,
        remainingUses: evaluation.user.remainingUses,
        totalUses: evaluation.user.totalUses
      } : null);
      
      // Update localStorage
      if (userInfo) {
        const updatedUser = {
          ...userInfo,
          remainingUses: evaluation.user.remainingUses,
          totalUses: evaluation.user.totalUses
        };
        localStorage.setItem('adToolUser', JSON.stringify(updatedUser));
      }
      
    } catch (err) {
      setError('Failed to evaluate ad. Please try again.');
      console.error('Evaluation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-theme-gradient">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center schema-card ring-1 ring-white/80 rounded-full px-6 py-3 mb-8">
              <Target className="mr-2 text-orange-500" size={20} />
              <span className="text-white font-semibold">Professional Ad Analysis</span>
              <Star className="ml-2 text-orange-400" size={16} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-heading-readable mb-8">
              Advanced <span className="text-warm">Ad Evaluator</span>
            </h1>
            <p className="text-xl md:text-2xl text-readable max-w-4xl mx-auto leading-relaxed">
              Get professional-grade ad analysis using our proprietary algorithms. 
              Comprehensive evaluation with industry benchmarks and actionable insights.
            </p>
          </div>
          
          {/* User Info Bar */}
          {userInfo && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="schema-card rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-accent-readable text-lg">{userInfo.name}</p>
                      <p className="text-readable">{userInfo.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <span className="font-bold text-orange-400 text-lg">
                        {userInfo.remainingUses} evaluations left today
                      </span>
                    </div>
                    <p className="text-readable">
                      Total used: {userInfo.totalUses}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <DisplayAd />

      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="schema-card rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-accent-readable mb-2">
                Start Your Free Analysis
              </h3>
              <p className="text-readable">
                Get 5 free professional ad evaluations daily. No payment required.
              </p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-accent-readable">
                  Email Address
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
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={loginData.name}
                  onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-orange-500/30 small-card text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your Name"
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
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-red-700 font-semibold"
                >
                  Start Free Analysis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evaluation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Enhanced Form */}
              <div className="schema-card rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-accent-readable mb-6">
                  Professional Ad Analysis
                </h2>
                <p className="text-readable mb-8">
                  Our algorithms analyze 50+ factors including platform optimization, 
                  audience alignment, industry benchmarks, and conversion potential.
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
                  
                  <button
                    type="submit"
                    disabled={isLoading || (!userInfo && !showLoginForm)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing Your Ad...
                      </>
                    ) : !userInfo ? (
                      <>
                        Create Free Account & Evaluate
                        <User className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        Evaluate Ad ({userInfo.remainingUses} left today)
                        <Zap className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Results Section */}
              <div>
                {error && (
                  <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <p className="text-red-200">{error}</p>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-accent-readable">
                      Professional Analysis Results
                    </h3>
                    
                    {/* Enhanced Scores Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                      
                      <div className="schema-card text-center p-4 border-2 border-orange-500">
                        <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.scores.overall)}`}>
                          {result.scores.overall}
                        </div>
                        <div className="text-sm font-semibold text-orange-400 mb-1">Overall Score</div>
                        <div className={`text-xs font-medium ${getScoreColor(result.scores.overall)}`}>
                          {getScoreLabel(result.scores.overall)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Detailed Analysis */}
                    <div className="schema-card p-6">
                      <h4 className="text-lg font-semibold text-accent-readable mb-4">
                        Detailed Professional Analysis
                      </h4>
                      <div className="prose prose-sm max-w-none text-readable">
                        <div className="whitespace-pre-line">{result.analysis}</div>
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    {result.recommendations && result.recommendations.length > 0 && (
                      <div className="schema-card p-6">
                        <h4 className="text-lg font-semibold text-accent-readable mb-4">
                          Priority Recommendations
                        </h4>
                        <ul className="space-y-3">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Lightbulb className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                              <span className="text-readable">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        <span className="text-green-200 font-medium">
                          Analysis Complete - TopAd Algorithm v1.0
                        </span>
                      </div>
                      <span className="text-sm text-green-400">
                        {new Date(result.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {!result && !isLoading && (
                  <div className="schema-card text-center p-8">
                    <Target className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-accent-readable mb-4">
                      Professional Ad Evaluation Ready
                    </h3>
                    <p className="text-readable mb-6">
                      Fill out the comprehensive form to get algorithmic analysis using industry benchmarks.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-readable">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        50+ evaluation criteria
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Platform-specific optimization
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Industry benchmark comparison
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Conversion prediction modeling
                      </div>
                    </div>
                  </div>
                )}

                {/* User Stats */}
                {userStats && (
                  <div className="schema-card p-6 mt-6">
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
                    {userStats.averageScores && (
                      <div className="mt-4 pt-4 border-t border-orange-500/30">
                        <p className="text-sm font-medium mb-2 text-accent-readable">Average Scores:</p>
                        <div className="flex justify-between text-sm text-readable">
                          <span>Creativity: {userStats.averageScores.creativity}</span>
                          <span>Viability: {userStats.averageScores.viability}</span>
                          <span>Alignment: {userStats.averageScores.alignment}</span>
                        </div>
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-heading-readable mb-6">
              Algorithmic Evaluation Engine
            </h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Professional-grade analysis using proprietary algorithms and industry data
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="schema-card text-center p-6">
              <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                50+ Data Points
              </h3>
              <p className="text-readable text-sm">
                Comprehensive analysis of creativity, platform fit, audience alignment, and conversion potential.
              </p>
            </div>
            
            <div className="schema-card text-center p-6">
              <BarChart3 className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Industry Benchmarks
              </h3>
              <p className="text-readable text-sm">
                Compare against real industry data and platform-specific performance metrics.
              </p>
            </div>
            
            <div className="schema-card text-center p-6">
              <Lightbulb className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Actionable Insights
              </h3>
              <p className="text-readable text-sm">
                Specific, implementable recommendations to improve your ad performance.
              </p>
            </div>
            
            <div className="schema-card text-center p-6">
              <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Instant Results
              </h3>
              <p className="text-readable text-sm">
                Get professional analysis in seconds, no waiting for AI processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-heading-readable mb-6">
                Why Choose Our Ad Evaluator?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="schema-card p-8 text-center">
                <Award className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Professional Grade Analysis
                </h3>
                <p className="text-readable">
                  Get the same level of analysis that professional agencies use, 
                  with detailed scoring across multiple performance dimensions.
                </p>
              </div>
              
              <div className="schema-card p-8 text-center">
                <TrendingUp className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Industry Benchmarks
                </h3>
                <p className="text-readable">
                  Compare your ads against real industry data and platform-specific 
                  performance metrics to understand competitive positioning.
                </p>
              </div>
              
              <div className="schema-card p-8 text-center">
                <Lightbulb className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Actionable Recommendations
                </h3>
                <p className="text-readable">
                  Receive specific, implementable suggestions to improve your ad 
                  performance and increase ROI based on proven optimization strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisplayAd />
    </div>
  );
}