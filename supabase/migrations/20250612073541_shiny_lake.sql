/*
  # Water Quality Issues Schema

  1. New Tables
    - `water_quality_issues`
      - Complete issue tracking with all fields
    - `water_quality_comments`
      - Comments and updates on issues

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for different user roles
*/

-- Create enums
CREATE TYPE water_source_type AS ENUM ('tap', 'well', 'river', 'lake', 'borehole', 'other');
CREATE TYPE issue_type AS ENUM ('contamination', 'shortage', 'infrastructure', 'taste', 'color', 'odor', 'other');
CREATE TYPE severity_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE issue_status AS ENUM ('pending', 'investigating', 'in_progress', 'resolved', 'rejected');

-- Create water quality issues table
CREATE TABLE IF NOT EXISTS water_quality_issues (
  id text PRIMARY KEY,
  location_name text NOT NULL,
  location_district text NOT NULL,
  location_region text NOT NULL,
  location_lat decimal,
  location_lng decimal,
  reported_by text NOT NULL,
  reported_at timestamptz NOT NULL DEFAULT now(),
  description text NOT NULL,
  water_source water_source_type NOT NULL,
  issue_type issue_type NOT NULL,
  severity severity_level NOT NULL,
  status issue_status NOT NULL DEFAULT 'pending',
  assigned_to text,
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS water_quality_comments (
  id text PRIMARY KEY,
  issue_id text NOT NULL REFERENCES water_quality_issues(id) ON DELETE CASCADE,
  text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by text NOT NULL
);

-- Enable RLS
ALTER TABLE water_quality_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_quality_comments ENABLE ROW LEVEL SECURITY;

-- Policies for water quality issues
CREATE POLICY "Anyone can read issues"
  ON water_quality_issues
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create issues"
  ON water_quality_issues
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Engineers and admins can update issues"
  ON water_quality_issues
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'engineer')
    )
  );

-- Policies for comments
CREATE POLICY "Anyone can read comments"
  ON water_quality_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON water_quality_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating updated_at
CREATE TRIGGER update_water_quality_issues_updated_at
  BEFORE UPDATE ON water_quality_issues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();