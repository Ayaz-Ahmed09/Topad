import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          password_hash?: string;
          is_premium: boolean;
          total_evaluations: number;
          last_evaluation: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          password_hash?: string;
          is_premium?: boolean;
          total_evaluations?: number;
          last_evaluation?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          password_hash?: string;
          is_premium?: boolean;
          total_evaluations?: number;
          last_evaluation?: string | null;
          updated_at?: string;
        };
      };
      ip_usage_tracker: {
        Row: {
          id: string;
          ip_address: string;
          usage_count: number;
          last_used: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ip_address: string;
          usage_count?: number;
          last_used?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          ip_address?: string;
          usage_count?: number;
          last_used?: string;
          updated_at?: string;
        };
      };
      user_evaluations: {
        Row: {
          id: string;
          email: string;
          name: string;
          ad_data: any;
          evaluation_result: any;
          overall_score: number;
          platform: string;
          industry: string;
          media_analyzed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          ad_data: any;
          evaluation_result: any;
          overall_score: number;
          platform: string;
          industry: string;
          media_analyzed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          ad_data?: any;
          evaluation_result?: any;
          overall_score?: number;
          platform?: string;
          industry?: string;
          media_analyzed?: boolean;
        };
      };
      evaluations: {
        Row: {
          id: string;
          ip_address: string;
          user_email: string | null;
          ad_data: any;
          evaluation_result: any;
          overall_score: number;
          platform: string;
          industry: string;
          media_analyzed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          ip_address: string;
          user_email?: string | null;
          ad_data: any;
          evaluation_result: any;
          overall_score: number;
          platform: string;
          industry: string;
          media_analyzed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          ip_address?: string;
          user_email?: string | null;
          ad_data?: any;
          evaluation_result?: any;
          overall_score?: number;
          platform?: string;
          industry?: string;
          media_analyzed?: boolean;
        };
      };
    };
  };
};