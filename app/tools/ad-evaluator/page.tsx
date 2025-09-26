'use client';

import { useState, useRef } from 'react';
import {
  Target, Zap, BarChart3, Lightbulb, ArrowRight, CheckCircle, AlertCircle,
  Clock, Star, TrendingUp, Award, Upload, Image, Video, FileVideo, FileImage,
  Menu, X, Eye, Shield, Cpu, Database
} from 'lucide-react';
import { DisplayAd } from '@/components/AdSenseComponents';
import EvaluationService from '@/lib/evaluation-service';

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
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle basic input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Cleanup temporary object URLs
  const cleanupTempFile = (url?: string) => {
    if (!url) return;
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Error cleaning up temp file:', err);
      }
    }, 100);
  };

  // File upload handling (supports image/video; validation adapted so tool is free and flexible)
  const handleFileUpload = (file: File) => {
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Maximum 10MB allowed.');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (!isImage && !isVideo) {
      setError('Please upload an image or video file.');
      return;
    }

    // If user selected a specific adType, enforce reasonable type rules:
    // - if adType === 'image' require image
    // - if adType === 'video' require video
    if (adData.adType === 'image' && !isImage) {
      setError('Please upload an image file for image ad type.');
      return;
    }
    if (adData.adType === 'video' && !isVideo) {
      setError('Please upload a video file for video ad type.');
      return;
    }

    setError(null);

    const fileType = isImage ? 'image' : 'video';
    const tempUrl = URL.createObjectURL(file);

    setAdData(prev => ({
      ...prev,
      mediaFile: file,
      mediaType: fileType,
      mediaSize: file.size,
      mediaUrl: tempUrl
    }));

    // If video, load metadata
    if (isVideo) {
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
    }

    // If image, load to get resolution
    if (isImage) {
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
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Form validation: require core text fields and (for most ad types) a media file when applicable
  // We'll require media file for any adType except 'search' (search ads typically don't have media).
  const mediaRequired = adData.adType && adData.adType !== 'search';
  const isFormValid = !!(adData.title.trim() &&
    adData.description.trim() &&
    adData.platform &&
    adData.audience.trim() &&
    adData.industry &&
    adData.goals &&
    adData.country &&
    adData.adType &&
    adData.targetAge &&
    (!mediaRequired || adData.mediaFile)
  );

  // Submit handler: tool is fully free — remove user/IP checks and allow evaluation directly
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (!isFormValid) {
      setError('Please complete all required fields. Attach a media file if the selected ad type requires one.');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Keep EvaluationService usage as-is, but do not pass user/IP data.
      // Use the same method the app previously used — pass only adData.
      const evaluationResponse = await EvaluationService.getComprehensiveEvaluation(adData);

      if (!evaluationResponse) {
        setError('Evaluation failed. Try again.');
        return;
      }

      if (!evaluationResponse.success) {
        setError(evaluationResponse.error || 'Evaluation failed.');
        return;
      }

      if (evaluationResponse.evaluation) {
        setResult(evaluationResponse.evaluation);
      }

      // Cleanup temporary media URL (we already generated it locally)
      if (adData.mediaUrl) {
        cleanupTempFile(adData.mediaUrl);
        // keep the file info cleared or keep it — we'll clear the url only to free memory
        setAdData(prev => ({ ...prev, mediaUrl: undefined }));
      }
    } catch (err) {
      console.error('Evaluation error:', err);
      setError('Failed to evaluate ad. Please try again.');
      if (adData.mediaUrl) cleanupTempFile(adData.mediaUrl);
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

  return (
    <div className="min-h-screen bg-theme-gradient">
      {/* Header (simplified - no login/signup or user tracking) */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-orange-500/30 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Ad Evaluator</span>
                <div className="text-xs text-orange-400">Professional Analysis — Free to Use</div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Public Tool</p>
                <p className="text-xs text-orange-400">Unlimited free evaluations</p>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="space-y-2 px-4">
                <p className="text-sm text-orange-400 font-medium">Public Tool</p>
                <p className="text-xs text-gray-400">Unlimited free evaluations</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
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
                <div className="text-xs text-readable">No user tracking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisplayAd />

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <div className="schema-card rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-accent-readable mb-6">Professional Ad Analysis</h2>
                  <p className="text-readable mb-8">
                    Our advanced algorithms analyze over 50 factors including platform optimization, audience alignment,
                    industry benchmarks, and conversion potential. Upload media files for comprehensive technical analysis.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* MEDIA UPLOAD: Now visible whenever an ad type is selected (except empty) and accepts image/video.
                        For 'image' or 'video' adType we restrict accepted file types accordingly.
                    */}
                    {adData.adType && (
                      <div>
                        <label className="block text-sm font-medium text-accent-readable mb-2">
                          Upload {adData.adType === 'image' ? 'Image' : adData.adType === 'video' ? 'Video' : 'Media'} File
                          {mediaRequired ? ' *' : ' (optional)'}
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
                              <div className="flex items-center justify-center space-x-3">
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
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                  }}
                                  className="text-sm text-orange-400 hover:text-orange-300"
                                >
                                  Remove file
                                </button>
                              </div>
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
                                  Maximum 10MB • {adData.adType === 'image' ? 'JPG, PNG, GIF' : adData.adType === 'video' ? 'MP4, MOV, AVI' : 'JPG, PNG, GIF, MP4'}
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
                                accept={
                                  adData.adType === 'image'
                                    ? 'image/*'
                                    : adData.adType === 'video'
                                      ? 'video/*'
                                      : 'image/*,video/*'
                                }
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
                      disabled={isLoading || !isFormValid}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Analyzing Your Ad...
                        </>
                      ) : (
                        <>
                          Analyze Ad
                          <Zap className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Results */}
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
                      <h3 className="text-2xl font-bold text-accent-readable mb-6">Professional Analysis Results</h3>

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

                      <div className="small-card p-6 mb-6">
                        <h4 className="text-lg font-semibold text-accent-readable mb-4">Detailed Professional Analysis</h4>
                        <div className="prose prose-sm max-w-none text-readable">
                          <div className="whitespace-pre-line">{result.analysis}</div>
                        </div>
                      </div>

                      {result.recommendations && result.recommendations.length > 0 && (
                        <div className="small-card p-6">
                          <h4 className="text-lg font-semibold text-accent-readable mb-4">Priority Recommendations</h4>
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
                          <span className="text-green-300 font-medium">Analysis Complete - Professional Grade</span>
                        </div>
                        <span className="text-sm text-green-400">{new Date(result.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {!result && !isLoading && (
                  <div className="schema-card rounded-2xl p-8 text-center">
                    <Target className="h-16 w-16 text-orange-400 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-accent-readable mb-4">Professional Ad Evaluation Ready</h3>
                    <p className="text-readable mb-6">
                      Fill out the comprehensive form to get algorithmic analysis using industry benchmarks and platform-specific optimization recommendations.
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
            <h2 className="text-3xl md:text-4xl font-bold text-accent-readable mb-4">Advanced Evaluation Engine</h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">Professional-grade analysis using proprietary algorithms and industry data</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="small-card text-center p-6">
              <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">Multi-Factor Analysis</h3>
              <p className="text-readable text-sm">Comprehensive evaluation of creativity, platform fit, audience alignment, engagement potential, and conversion optimization.</p>
            </div>

            <div className="small-card text-center p-6">
              <BarChart3 className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">Industry Benchmarks</h3>
              <p className="text-readable text-sm">Compare your ads against real industry data and platform-specific performance metrics from successful campaigns.</p>
            </div>

            <div className="small-card text-center p-6">
              <Lightbulb className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">Actionable Insights</h3>
              <p className="text-readable text-sm">Receive specific, implementable recommendations to improve your ad performance and maximize ROI.</p>
            </div>

            <div className="small-card text-center p-6">
              <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-accent-readable mb-3">Instant Results</h3>
              <p className="text-readable text-sm">Get professional analysis in seconds with detailed scoring and optimization recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-readable mb-4">How Our Evaluation Works</h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">Our proprietary algorithm analyzes your ads using the same criteria that top advertising agencies use</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-accent-readable mb-3">Input Your Ad</h3>
              <p className="text-readable">Provide your ad copy, target platform, audience details, and upload media files for comprehensive analysis.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-accent-readable mb-3">Algorithm Analysis</h3>
              <p className="text-readable">Our advanced algorithms evaluate 50+ factors including platform requirements, industry benchmarks, and conversion psychology.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-accent-readable mb-3">Get Results</h3>
              <p className="text-readable">Receive detailed scores, professional analysis, and specific recommendations to optimize your ad performance.</p>
            </div>
          </div>
        </div>
      </section>

      <DisplayAd />

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="schema-card rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <Award className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-accent-readable mb-6">Ready to Optimize Your Ads?</h2>
            <p className="text-xl text-readable mb-8 max-w-2xl mx-auto">Start analyzing your ads for free now — no signup required.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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