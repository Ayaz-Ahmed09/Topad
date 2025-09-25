'use client';

import { useState, useEffect, useRef } from 'react';
import { Target, Zap, BarChart3, Lightbulb, ArrowRight, CheckCircle, AlertCircle, User, Clock, Star, TrendingUp, Award, Upload, Image, Video, FileVideo, FileImage } from 'lucide-react';
import { DisplayAd } from '@/components/AdSenseComponents';
import  AdEvaluationEngine  from '@/lib/ad-algorithms';
import { createClient } from '@supabase/supabase-js';

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  email: string;
  name: string;
  remainingUses: number;
  totalUses: number;
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
    language: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);
  const [usageTracker, setUsageTracker] = useState<UsageTracker | null>(null);
  const [userIP, setUserIP] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    name: ''
  });

  useEffect(() => {
    // Get user IP and check usage
    initializeUser();
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('adToolUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserInfo(user);
      loadUserStats(user.email);
    }
  }, []);

  const initializeUser = async () => {
    try {
      // Get user IP
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
      setUserIP(ip);

      // Check usage in Supabase
      const { data: usage } = await supabase
        .from('ip_usage_tracker')
        .select('*')
        .eq('ip_address', ip)
        .single();

      if (usage) {
        setUsageTracker({
          ip: usage.ip_address,
          count: usage.usage_count,
          lastUsed: usage.last_used
        });
      } else {
        // Create new IP record
        await supabase
          .from('ip_usage_tracker')
          .insert({
            ip_address: ip,
            usage_count: 0,
            last_used: new Date().toISOString()
          });
        
        setUsageTracker({ ip, count: 0, lastUsed: new Date().toISOString() });
      }
    } catch (error) {
      console.error('Failed to initialize user:', error);
    }
  };

  const updateUsageCount = async (ip: string) => {
    try {
      const newCount = (usageTracker?.count || 0) + 1;
      
      await supabase
        .from('ip_usage_tracker')
        .update({
          usage_count: newCount,
          last_used: new Date().toISOString()
        })
        .eq('ip_address', ip);

      setUsageTracker(prev => prev ? { ...prev, count: newCount, lastUsed: new Date().toISOString() } : null);
    } catch (error) {
      console.error('Failed to update usage count:', error);
    }
  };

  const loadUserStats = async (email: string) => {
    try {
      // Load user stats from Supabase
      const { data: stats } = await supabase
        .from('user_evaluations')
        .select('*')
        .eq('email', email);
      
      setUserStats({
        totalEvaluations: stats?.length || 0,
        remainingFreeUses: Math.max(0, 50 - (stats?.length || 0)) // Premium users get 50 per day
      });
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Maximum 10MB allowed for free service.');
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
    
    setAdData(prev => ({
      ...prev,
      mediaFile: file,
      mediaType: fileType,
      mediaSize: file.size
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
        URL.revokeObjectURL(video.src);
      };
      video.src = URL.createObjectURL(file);
    } else if (fileType === 'image') {
      const img = new Image();
      img.onload = () => {
        setAdData(prev => ({
          ...prev,
          mediaResolution: `${img.width}x${img.height}`
        }));
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
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

  const analyzeMediaFile = (adData: AdData): { qualityScore: number; recommendations: string[]; technicalSpecs: string[] } => {
    const recommendations: string[] = [];
    const technicalSpecs: string[] = [];
    let qualityScore = 50;

    if (!adData.mediaFile) {
      return { qualityScore: 0, recommendations: ['Upload media file for complete analysis'], technicalSpecs: [] };
    }

    const fileSize = adData.mediaSize || 0;
    const resolution = adData.mediaResolution || '';
    const duration = adData.mediaDuration || 0;

    technicalSpecs.push(`File size: ${(fileSize / (1024 * 1024)).toFixed(2)} MB`);
    if (resolution) technicalSpecs.push(`Resolution: ${resolution}`);
    if (duration) technicalSpecs.push(`Duration: ${duration.toFixed(1)} seconds`);

    // Platform-specific media analysis
    if (adData.platform === 'instagram') {
      if (adData.mediaType === 'image') {
        if (resolution.includes('1080x1080') || resolution.includes('1080x1350')) {
          qualityScore += 20;
        } else {
          recommendations.push('Use 1080x1080 (square) or 1080x1350 (portrait) for optimal Instagram display');
        }
      } else if (adData.mediaType === 'video') {
        if (duration >= 3 && duration <= 60) {
          qualityScore += 15;
        } else if (duration > 60) {
          recommendations.push('Instagram videos perform best under 60 seconds');
        } else {
          recommendations.push('Instagram videos should be at least 3 seconds long');
        }
      }
    } else if (adData.platform === 'tiktok') {
      if (adData.mediaType === 'video') {
        if (duration >= 9 && duration <= 15) {
          qualityScore += 25;
        } else if (duration > 15 && duration <= 60) {
          qualityScore += 15;
        } else {
          recommendations.push('TikTok videos perform best between 9-15 seconds');
        }
        if (resolution.includes('1080x1920')) {
          qualityScore += 15;
        } else {
          recommendations.push('Use vertical 9:16 aspect ratio (1080x1920) for TikTok');
        }
      }
    } else if (adData.platform === 'facebook') {
      if (adData.mediaType === 'video') {
        if (duration >= 1 && duration <= 240) {
          qualityScore += 15;
        } else {
          recommendations.push('Facebook videos should be 1-240 seconds for optimal performance');
        }
      } else if (adData.mediaType === 'image') {
        if (resolution.includes('1200x630') || resolution.includes('1080x1080')) {
          qualityScore += 15;
        } else {
          recommendations.push('Use 1200x630 (landscape) or 1080x1080 (square) for Facebook');
        }
      }
    } else if (adData.platform === 'youtube') {
      if (adData.mediaType === 'video') {
        if (duration >= 30) {
          qualityScore += 20;
        } else {
          recommendations.push('YouTube ads should be at least 30 seconds for better performance');
        }
        if (resolution.includes('1920x1080')) {
          qualityScore += 15;
        } else {
          recommendations.push('Use 1920x1080 (16:9) resolution for YouTube');
        }
      }
    }

    // File size analysis
    if (adData.mediaType === 'image') {
      if (fileSize > 10 * 1024 * 1024) { // 10MB
        recommendations.push('Image file size is too large - compress to under 10MB');
        qualityScore -= 10;
      } else if (fileSize < 100 * 1024) { // 100KB
        recommendations.push('Image file size might be too small - ensure good quality');
        qualityScore -= 5;
      } else {
        qualityScore += 10;
      }
    } else if (adData.mediaType === 'video') {
      if (fileSize > 100 * 1024 * 1024) { // 100MB
        recommendations.push('Video file size is too large - compress to under 100MB');
        qualityScore -= 15;
      } else if (fileSize < 1 * 1024 * 1024) { // 1MB
        recommendations.push('Video file size seems small - ensure good quality');
        qualityScore -= 5;
      } else {
        qualityScore += 10;
      }
    }

    return {
      qualityScore: Math.max(0, Math.min(100, qualityScore)),
      recommendations,
      technicalSpecs
    };
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email && loginData.name) {
      const user = {
        email: loginData.email,
        name: loginData.name,
        remainingUses: 50, // Premium users get more
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
    
    // Check usage limits for non-registered users
    if (!userInfo && usageTracker && usageTracker.count >= 3) {
      setShowLoginForm(true);
      setError('You have reached the free limit of 3 evaluations. Please sign up to continue.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use pure algorithmic evaluation
      const evaluation = AdEvaluationEngine.evaluateAd(adData);
      
      // Analyze media file if present
      let mediaAnalysis = null;
      if (adData.mediaFile) {
        mediaAnalysis = analyzeMediaFile(adData);
      }

      // Create comprehensive result
      const result: EvaluationResult = {
        analysis: `Comprehensive algorithmic analysis:\n\n${evaluation.analysis.strengths.length > 0 ? 'STRENGTHS:\n' + evaluation.analysis.strengths.map(s => `• ${s}`).join('\n') + '\n\n' : ''}${evaluation.analysis.weaknesses.length > 0 ? 'AREAS FOR IMPROVEMENT:\n' + evaluation.analysis.weaknesses.map(w => `• ${w}`).join('\n') + '\n\n' : ''}${evaluation.analysis.platformSpecific.length > 0 ? 'PLATFORM INSIGHTS:\n' + evaluation.analysis.platformSpecific.map(p => `• ${p}`).join('\n') + '\n\n' : ''}${evaluation.analysis.audienceInsights.length > 0 ? 'AUDIENCE ANALYSIS:\n' + evaluation.analysis.audienceInsights.map(a => `• ${a}`).join('\n') : ''}`,
        scores: {
          ...evaluation.scores,
          mediaQuality: mediaAnalysis?.qualityScore || 0
        },
        recommendations: evaluation.recommendations,
        mediaAnalysis,
        timestamp: new Date().toISOString()
      };

      setResult(result);

      // Update usage count
      if (userIP) {
        await updateUsageCount(userIP);
      }

      // Save evaluation to Supabase
      await supabase
        .from('evaluations')
        .insert({
          ip_address: userIP,
          user_email: userInfo?.email || null,
          ad_data: adData,
          evaluation_result: result,
          created_at: new Date().toISOString()
        });

      if (userInfo) {
        await supabase
          .from('user_evaluations')
          .insert({
            email: userInfo.email,
            name: userInfo.name,
            ad_data: adData,
            evaluation_result: result,
            created_at: new Date().toISOString()
          });
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

  // Check if form is valid for submission
  const isFormValid = adData.title && adData.description && adData.platform && 
                     adData.audience && adData.industry && adData.goals && 
                     adData.country && adData.adType && adData.targetAge;

  const remainingFreeUses = userInfo ? 50 : Math.max(0, 3 - (usageTracker?.count || 0));

  return (
    <div className="min-h-screen bg-theme-gradient">
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
            <p className="text-xl md:text-2xl text-readable max-w-4xl mx-auto leading-relaxed">
              Get comprehensive ad analysis using advanced algorithms. Upload media files for complete evaluation.
              {!userInfo && ' 3 free evaluations, no registration required!'}
            </p>
          </div>
          
          {/* Usage Tracker */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="schema-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-accent-readable text-lg">
                      {userInfo ? userInfo.name : 'Free User'}
                    </p>
                    <p className="text-readable">
                      {userInfo ? userInfo.email : 'Anonymous User'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span className="font-bold text-orange-400 text-lg">
                      {remainingFreeUses} evaluations remaining
                    </span>
                  </div>
                  <p className="text-readable">
                    Total used: {userInfo ? userStats?.totalEvaluations || 0 : usageTracker?.count || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                Sign Up for More Evaluations
              </h3>
              <p className="text-readable">
                You've used your 3 free evaluations. Sign up for unlimited access!
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
                  Sign Up Free
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
                  Advanced Ad Analysis
                </h2>
                <p className="text-readable mb-8">
                  Upload your media files and get comprehensive algorithmic analysis with industry benchmarks.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Media Upload Section */}
                  {(adData.adType === 'video' || adData.adType === 'image') && (
                    <div className="border-2 border-dashed border-orange-500/30 rounded-lg p-6">
                      <div 
                        className={`transition-colors duration-200 ${isDragOver ? 'bg-orange-500/10' : ''}`}
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                      >
                        <div className="text-center">
                          {adData.mediaFile ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-center">
                                {adData.mediaType === 'image' ? (
                                  <FileImage className="h-12 w-12 text-green-500" />
                                ) : (
                                  <FileVideo className="h-12 w-12 text-green-500" />
                                )}
                              </div>
                              <div>
                                <p className="text-accent-readable font-semibold">{adData.mediaFile.name}</p>
                                <p className="text-readable text-sm">
                                  {(adData.mediaFile.size / (1024 * 1024)).toFixed(2)} MB
                                  {adData.mediaResolution && ` • ${adData.mediaResolution}`}
                                  {adData.mediaDuration && ` • ${adData.mediaDuration.toFixed(1)}s`}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setAdData(prev => ({ ...prev, mediaFile: undefined, mediaType: undefined }))}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove file
                              </button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-accent-readable mb-2">
                                Upload Your {adData.adType === 'video' ? 'Video' : 'Image'} (Max 10MB)
                              </h3>
                              <p className="text-readable mb-4">
                                Drag and drop your file here, or click to browse. File will be analyzed in memory only - not stored.
                              </p>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept={adData.adType === 'video' ? 'video/*' : 'image/*'}
                                onChange={handleFileInputChange}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                              >
                                Choose File
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

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
                  e="text-sm text-readable space-y-1">
                              {result.mediaAnalysis.technicalSpecs.map((spec, index) => (
                                <li key={index} className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                  {spec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {result.mediaAnalysis.recommendations.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium text-orange-400 mb-2">Media Optimization Recommendations</h5>
                            <ul className="space-y-2">
                              {result.mediaAnalysis.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Lightbulb className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                                  <span className="text-readable text-sm">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Detailed Analysis */}
                    <div className="schema-card p-6">
                      <h4 className="text-lg font-semibold text-accent-readable mb-4">
                        Comprehensive Analysis Report
                      </h4>
                      <div className="prose prose-sm max-w-none text-readable">
                        <div className="whitespace-pre-line">{result.analysis}</div>
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    {result.recommendations && result.recommendations.length > 0 && (
                      <div className="schema-card p-6">
                        <h4 className="text-lg font-semibold text-accent-readable mb-4">
                          Priority Optimization Recommendations
                        </h4>
                        <ul className="space-y-3">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-1">
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
                        <span className="text-green-200 font-medium">
                          Analysis Complete - Advanced Algorithm Engine
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
                      Advanced Algorithm Analysis Ready
                    </h3>
                    <p className="text-readable mb-6">
                      Fill out the form and upload media files for comprehensive algorithmic evaluation.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-readable">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        75+ evaluation criteria
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Media file analysis
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Platform optimization
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Industry benchmarks
                      </div>
                    </div>
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
              Advanced Algorithm Engine
            </h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Pure algorithmic evaluation with 75+ data points and media file analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="schema-card text-center p-6">
              <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                75+ Analysis Points
              </h3>
              <p className="text-readable text-sm">
                Comprehensive evaluation including media quality, platform optimization, and audience alignment.
              </p>
            </div>
            
            <div className="schema-card text-center p-6">
              <Video className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Media File Analysis
              </h3>
              <p className="text-readable text-sm">
                Upload images and videos for technical analysis including resolution, duration, and platform compliance.
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
              <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                IP-Based Tracking
              </h3>
              <p className="text-readable text-sm">
                Smart usage tracking with 3 free evaluations, then unlimited access after registration.
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
                Why Choose Our Advanced Evaluator?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="schema-card p-8 text-center">
                <Award className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Pure Algorithm Analysis
                </h3>
                <p className="text-readable">
                  No AI black boxes - transparent algorithmic evaluation with 
                  detailed scoring across multiple performance dimensions.
                </p>
              </div>
              
              <div className="schema-card p-8 text-center">
                <TrendingUp className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Media File Support
                </h3>
                <p className="text-readable">
                  Upload and analyze your actual video and image files with 
                  technical specifications and platform compliance checking.
                </p>
              </div>
              
              <div className="schema-card p-8 text-center">
                <Lightbulb className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Smart Usage Tracking
                </h3>
                <p className="text-readable">
                  IP-based tracking allows 3 free evaluations without registration,
                  then unlimited access after simple sign-up.
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
                    disabled={isLoading || !isFormValid}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing Your Ad...
                      </>
                    ) : (
                      <>
                        Evaluate Ad ({remainingFreeUses} left)
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
                      Advanced Algorithmic Analysis
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

                      {result.scores.mediaQuality > 0 && (
                        <div className="small-card text-center p-4">
                          <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.scores.mediaQuality)}`}>
                            {result.scores.mediaQuality}
                          </div>
                          <div className="text-sm text-readable mb-1">Media Quality</div>
                          <div className={`text-xs font-medium ${getScoreColor(result.scores.mediaQuality)}`}>
                            {getScoreLabel(result.scores.mediaQuality)}
                          </div>
                        </div>
                      )}
                      
                      <div className="schema-card text-center p-4 border-2 border-orange-500 md:col-span-3">
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
                      <div className="schema-card p-6">
                        <h4 className="text-lg font-semibold text-accent-readable mb-4">
                          Media File Analysis
                        </h4>
                        
                        {result.mediaAnalysis.technicalSpecs.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-orange-400 mb-2">Technical Specifications</h5>
                            <ul className="text-sm text-readable space-y-1">
                              {result.mediaAnalysis.technicalSpecs.map((spec, index) => (
                                <li key={index} className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                  {spec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {result.mediaAnalysis.recommendations.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium text-orange-400 mb-2">Media Optimization Recommendations</h5>
                            <ul className="space-y-2">
                              {result.mediaAnalysis.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Lightbulb className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                                  <span className="text-readable text-sm">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Detailed Analysis */}
                    <div className="schema-card p-6">
                      <h4 className="text-lg font-semibold text-accent-readable mb-4">
                        Comprehensive Analysis Report
                      </h4>
                      <div className="prose prose-sm max-w-none text-readable">
                        <div className="whitespace-pre-line">{result.analysis}</div>
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    {result.recommendations && result.recommendations.length > 0 && (
                      <div className="schema-card p-6">
                        <h4 className="text-lg font-semibold text-accent-readable mb-4">
                          Priority Optimization Recommendations
                        </h4>
                        <ul className="space-y-3">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-1">
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
                        <span className="text-green-200 font-medium">
                          Analysis Complete - Advanced Algorithm Engine
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
                      Advanced Algorithm Analysis Ready
                    </h3>
                    <p className="text-readable mb-6">
                      Fill out the form and upload media files for comprehensive algorithmic evaluation.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-readable">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        75+ evaluation criteria
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Media file analysis
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Platform optimization
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Industry benchmarks
                      </div>
                    </div>
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
              Advanced Algorithm Engine
            </h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Pure algorithmic evaluation with 75+ data points and media file analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="schema-card text-center p-6">
              <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                75+ Analysis Points
              </h3>
              <p className="text-readable text-sm">
                Comprehensive evaluation including media quality, platform optimization, and audience alignment.
              </p>
            </div>
            
            <div className="schema-card text-center p-6">
              <Video className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                Media File Analysis
              </h3>
              <p className="text-readable text-sm">
                Upload images and videos for technical analysis including resolution, duration, and platform compliance.
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
              <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">
                IP-Based Tracking
              </h3>
              <p className="text-readable text-sm">
                Smart usage tracking with 3 free evaluations, then unlimited access after registration.
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
                Why Choose Our Advanced Evaluator?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="schema-card p-8 text-center">
                <Award className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Pure Algorithm Analysis
                </h3>
                <p className="text-readable">
                  No AI black boxes - transparent algorithmic evaluation with 
                  detailed scoring across multiple performance dimensions.
                </p>
              </div>
              
              <div className="schema-card p-8 text-center">
                <TrendingUp className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Media File Support
                </h3>
                <p className="text-readable">
                  Upload and analyze your actual video and image files with 
                  technical specifications and platform compliance checking.
                </p>
              </div>
              
              <div className="schema-card p-8 text-center">
                <Lightbulb className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-readable mb-4">
                  Smart Usage Tracking
                </h3>
                <p className="text-readable">
                  IP-based tracking allows 3 free evaluations without registration,
                  then unlimited access after simple sign-up.
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