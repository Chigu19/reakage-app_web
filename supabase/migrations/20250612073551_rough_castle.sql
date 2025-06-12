/*
  # Sample Data for Water Quality System

  1. Sample Users
    - Admin user
    - Engineer users
    - Regular users

  2. Sample Issues
    - Various types of water quality issues
    - Different statuses and severities
*/

-- Insert sample issues (the migration will handle user creation via auth)
INSERT INTO water_quality_issues (
  id, location_name, location_district, location_region, location_lat, location_lng,
  reported_by, reported_at, description, water_source, issue_type, severity, status,
  assigned_to, updated_at, resolved_at, images
) VALUES
(
  'WQI-001',
  'Msasani Peninsula',
  'Kinondoni',
  'Dar es Salaam',
  -6.7611,
  39.2486,
  'Maria Kimaro',
  '2025-03-15T09:30:00Z',
  'Tap water has a strong chemical smell and brownish color. Multiple households affected.',
  'tap',
  'contamination',
  'high',
  'in_progress',
  'Engineer Juma',
  '2025-03-17T11:45:00Z',
  NULL,
  '{"https://images.pexels.com/photos/2253610/pexels-photo-2253610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}'
),
(
  'WQI-002',
  'Tandale',
  'Kinondoni',
  'Dar es Salaam',
  -6.7928,
  39.2486,
  'Ibrahim Hassan',
  '2025-03-14T15:20:00Z',
  'Community borehole has stopped working. Over 200 households affected.',
  'borehole',
  'infrastructure',
  'critical',
  'investigating',
  'Engineer Baraka',
  '2025-03-15T09:10:00Z',
  NULL,
  '{"https://images.pexels.com/photos/2537480/pexels-photo-2537480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}'
),
(
  'WQI-003',
  'Kipawa',
  'Ilala',
  'Dar es Salaam',
  -6.8314,
  39.2047,
  'Sarah Mwakasege',
  '2025-03-12T11:15:00Z',
  'Water has strong chlorine smell and taste. Affecting entire neighborhood.',
  'tap',
  'taste',
  'medium',
  'resolved',
  'Engineer Zawadi',
  '2025-03-13T14:30:00Z',
  '2025-03-13T14:30:00Z',
  '{"https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}'
),
(
  'WQI-004',
  'Mwenge',
  'Kinondoni',
  'Dar es Salaam',
  -6.7731,
  39.2486,
  'John Mbwambo',
  '2025-03-10T08:45:00Z',
  'No water supply for 3 days. Entire area affected.',
  'tap',
  'shortage',
  'high',
  'resolved',
  'Engineer Ramadhani',
  '2025-03-11T16:20:00Z',
  '2025-03-11T16:20:00Z',
  '{}'
),
(
  'WQI-005',
  'Mbezi Beach',
  'Kinondoni',
  'Dar es Salaam',
  -6.7389,
  39.2184,
  'Grace Makundi',
  '2025-03-16T17:30:00Z',
  'Water appears cloudy with sediment. Multiple households reporting issues.',
  'tap',
  'color',
  'medium',
  'pending',
  NULL,
  '2025-03-16T17:30:00Z',
  NULL,
  '{"https://images.pexels.com/photos/4252526/pexels-photo-4252526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}'
);

-- Insert sample comments
INSERT INTO water_quality_comments (id, issue_id, text, created_at, created_by) VALUES
('c1', 'WQI-001', 'Initial assessment shows potential contamination from rusted pipes. Need to test water samples.', '2025-03-16T10:20:00Z', 'Engineer Juma'),
('c2', 'WQI-001', 'Water samples collected and sent to the lab for testing.', '2025-03-17T11:45:00Z', 'Engineer Juma'),
('c3', 'WQI-002', 'Initial inspection scheduled for tomorrow morning.', '2025-03-14T16:45:00Z', 'Engineer Baraka'),
('c4', 'WQI-002', 'Inspection completed. The pump motor has failed and needs replacement. Ordering parts.', '2025-03-15T09:10:00Z', 'Engineer Baraka'),
('c5', 'WQI-003', 'Investigation shows recent maintenance led to over-chlorination. Adjustments made to treatment facility.', '2025-03-13T14:30:00Z', 'Engineer Zawadi'),
('c6', 'WQI-004', 'Main supply line damaged during road construction. Temporary repairs completed.', '2025-03-11T10:30:00Z', 'Engineer Ramadhani'),
('c7', 'WQI-004', 'Permanent repairs completed. Water supply restored.', '2025-03-11T16:20:00Z', 'Engineer Ramadhani');