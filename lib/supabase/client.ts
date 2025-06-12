import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'engineer' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          role?: 'admin' | 'engineer' | 'user';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'admin' | 'engineer' | 'user';
          created_at?: string;
          updated_at?: string;
        };
      };
      water_quality_issues: {
        Row: {
          id: string;
          location_name: string;
          location_district: string;
          location_region: string;
          location_lat: number | null;
          location_lng: number | null;
          reported_by: string;
          reported_at: string;
          description: string;
          water_source: 'tap' | 'well' | 'river' | 'lake' | 'borehole' | 'other';
          issue_type: 'contamination' | 'shortage' | 'infrastructure' | 'taste' | 'color' | 'odor' | 'other';
          severity: 'low' | 'medium' | 'high' | 'critical';
          status: 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'rejected';
          assigned_to: string | null;
          updated_at: string;
          resolved_at: string | null;
          images: string[];
          created_at: string;
        };
        Insert: {
          id: string;
          location_name: string;
          location_district: string;
          location_region: string;
          location_lat?: number | null;
          location_lng?: number | null;
          reported_by: string;
          reported_at?: string;
          description: string;
          water_source: 'tap' | 'well' | 'river' | 'lake' | 'borehole' | 'other';
          issue_type: 'contamination' | 'shortage' | 'infrastructure' | 'taste' | 'color' | 'odor' | 'other';
          severity: 'low' | 'medium' | 'high' | 'critical';
          status?: 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'rejected';
          assigned_to?: string | null;
          updated_at?: string;
          resolved_at?: string | null;
          images?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          location_name?: string;
          location_district?: string;
          location_region?: string;
          location_lat?: number | null;
          location_lng?: number | null;
          reported_by?: string;
          reported_at?: string;
          description?: string;
          water_source?: 'tap' | 'well' | 'river' | 'lake' | 'borehole' | 'other';
          issue_type?: 'contamination' | 'shortage' | 'infrastructure' | 'taste' | 'color' | 'odor' | 'other';
          severity?: 'low' | 'medium' | 'high' | 'critical';
          status?: 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'rejected';
          assigned_to?: string | null;
          updated_at?: string;
          resolved_at?: string | null;
          images?: string[];
          created_at?: string;
        };
      };
      water_quality_comments: {
        Row: {
          id: string;
          issue_id: string;
          text: string;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id: string;
          issue_id: string;
          text: string;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          issue_id?: string;
          text?: string;
          created_at?: string;
          created_by?: string;
        };
      };
    };
  };
};