import { createClient } from '@supabase/supabase-js';

// Supabase configuration - replace with your actual values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface WaterQualityIssue {
  id: string;
  location: {
    name: string;
    district: string;
    region: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  reportedBy: string;
  reportedAt: string;
  description: string;
  waterSource: 'tap' | 'well' | 'river' | 'lake' | 'borehole' | 'other';
  issueType: 'contamination' | 'shortage' | 'infrastructure' | 'taste' | 'color' | 'odor' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'rejected';
  assignedTo?: string;
  updatedAt?: string;
  resolvedAt?: string;
  images?: string[];
  comments: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  }[];
}

// Cache for storing data
let cachedIssues: WaterQualityIssue[] = [];
let lastCacheUpdate: number = 0;
const CACHE_DURATION = 30000; // 30 seconds

// Helper function to transform database row to WaterQualityIssue
const transformDbRowToIssue = (row: any, comments: any[] = []): WaterQualityIssue => ({
  id: row.id,
  location: {
    name: row.location_name,
    district: row.location_district,
    region: row.location_region,
    coordinates: row.location_lat && row.location_lng ? {
      lat: row.location_lat,
      lng: row.location_lng
    } : undefined
  },
  reportedBy: row.reported_by,
  reportedAt: row.reported_at,
  description: row.description,
  waterSource: row.water_source,
  issueType: row.issue_type,
  severity: row.severity,
  status: row.status,
  assignedTo: row.assigned_to,
  updatedAt: row.updated_at,
  resolvedAt: row.resolved_at,
  images: row.images || [],
  comments: comments.map(comment => ({
    id: comment.id,
    text: comment.text,
    createdAt: comment.created_at,
    createdBy: comment.created_by
  }))
});

// Background data fetching
const fetchAllIssuesFromDB = async (): Promise<WaterQualityIssue[]> => {
  try {
    const { data: issues, error: issuesError } = await supabase
      .from('water_quality_issues')
      .select('*')
      .order('reported_at', { ascending: false });

    if (issuesError) {
      console.error('Error fetching issues:', issuesError);
      return [];
    }

    // Fetch comments for all issues
    const { data: comments, error: commentsError } = await supabase
      .from('water_quality_comments')
      .select('*')
      .order('created_at', { ascending: true });

    if (commentsError) {
      console.error('Error fetching comments:', commentsError);
    }

    // Group comments by issue_id
    const commentsByIssue = (comments || []).reduce((acc, comment) => {
      if (!acc[comment.issue_id]) {
        acc[comment.issue_id] = [];
      }
      acc[comment.issue_id].push(comment);
      return acc;
    }, {});

    return issues.map(issue => transformDbRowToIssue(issue, commentsByIssue[issue.id] || []));
  } catch (error) {
    console.error('Error in fetchAllIssuesFromDB:', error);
    return [];
  }
};

// Update cache function
const updateCache = async () => {
  const now = Date.now();
  if (now - lastCacheUpdate > CACHE_DURATION) {
    const issues = await fetchAllIssuesFromDB();
    cachedIssues = issues;
    lastCacheUpdate = now;
  }
};

// Initialize cache on first load
let isInitialized = false;
const initializeCache = () => {
  if (!isInitialized) {
    isInitialized = true;
    updateCache(); // Don't await, let it run in background
    // Set up periodic cache updates
    setInterval(updateCache, CACHE_DURATION);
  }
};

// Call initialize on module load
initializeCache();

// Export the original mock data as fallback
export const mockWaterQualityIssues: WaterQualityIssue[] = [
  {
    id: "WQI-001",
    location: {
      name: "Msasani Peninsula",
      district: "Kinondoni",
      region: "Dar es Salaam",
      coordinates: { lat: -6.7611, lng: 39.2486 }
    },
    reportedBy: "Maria Kimaro",
    reportedAt: "2025-03-15T09:30:00Z",
    description: "Tap water has a strong chemical smell and brownish color. Multiple households affected.",
    waterSource: "tap",
    issueType: "contamination",
    severity: "high",
    status: "in_progress",
    assignedTo: "Engineer Juma",
    updatedAt: "2025-03-17T11:45:00Z",
    images: [
      "https://images.pexels.com/photos/2253610/pexels-photo-2253610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: [
      {
        id: "c1",
        text: "Initial assessment shows potential contamination from rusted pipes. Need to test water samples.",
        createdAt: "2025-03-16T10:20:00Z",
        createdBy: "Engineer Juma"
      },
      {
        id: "c2",
        text: "Water samples collected and sent to the lab for testing.",
        createdAt: "2025-03-17T11:45:00Z",
        createdBy: "Engineer Juma"
      }
    ]
  },
  {
    id: "WQI-002",
    location: {
      name: "Tandale",
      district: "Kinondoni",
      region: "Dar es Salaam",
      coordinates: { lat: -6.7928, lng: 39.2486 }
    },
    reportedBy: "Ibrahim Hassan",
    reportedAt: "2025-03-14T15:20:00Z",
    description: "Community borehole has stopped working. Over 200 households affected.",
    waterSource: "borehole",
    issueType: "infrastructure",
    severity: "critical",
    status: "investigating",
    assignedTo: "Engineer Baraka",
    updatedAt: "2025-03-15T09:10:00Z",
    images: [
      "https://images.pexels.com/photos/2537480/pexels-photo-2537480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: [
      {
        id: "c1",
        text: "Initial inspection scheduled for tomorrow morning.",
        createdAt: "2025-03-14T16:45:00Z",
        createdBy: "Engineer Baraka"
      },
      {
        id: "c2",
        text: "Inspection completed. The pump motor has failed and needs replacement. Ordering parts.",
        createdAt: "2025-03-15T09:10:00Z",
        createdBy: "Engineer Baraka"
      }
    ]
  },
  {
    id: "WQI-003",
    location: {
      name: "Kipawa",
      district: "Ilala",
      region: "Dar es Salaam",
      coordinates: { lat: -6.8314, lng: 39.2047 }
    },
    reportedBy: "Sarah Mwakasege",
    reportedAt: "2025-03-12T11:15:00Z",
    description: "Water has strong chlorine smell and taste. Affecting entire neighborhood.",
    waterSource: "tap",
    issueType: "taste",
    severity: "medium",
    status: "resolved",
    assignedTo: "Engineer Zawadi",
    updatedAt: "2025-03-13T14:30:00Z",
    resolvedAt: "2025-03-13T14:30:00Z",
    images: [
      "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: [
      {
        id: "c1",
        text: "Investigation shows recent maintenance led to over-chlorination. Adjustments made to treatment facility.",
        createdAt: "2025-03-13T14:30:00Z",
        createdBy: "Engineer Zawadi"
      }
    ]
  },
  {
    id: "WQI-004",
    location: {
      name: "Mwenge",
      district: "Kinondoni",
      region: "Dar es Salaam",
      coordinates: { lat: -6.7731, lng: 39.2486 }
    },
    reportedBy: "John Mbwambo",
    reportedAt: "2025-03-10T08:45:00Z",
    description: "No water supply for 3 days. Entire area affected.",
    waterSource: "tap",
    issueType: "shortage",
    severity: "high",
    status: "resolved",
    assignedTo: "Engineer Ramadhani",
    updatedAt: "2025-03-11T16:20:00Z",
    resolvedAt: "2025-03-11T16:20:00Z",
    comments: [
      {
        id: "c1",
        text: "Main supply line damaged during road construction. Temporary repairs completed.",
        createdAt: "2025-03-11T10:30:00Z",
        createdBy: "Engineer Ramadhani"
      },
      {
        id: "c2",
        text: "Permanent repairs completed. Water supply restored.",
        createdAt: "2025-03-11T16:20:00Z",
        createdBy: "Engineer Ramadhani"
      }
    ]
  },
  {
    id: "WQI-005",
    location: {
      name: "Mbezi Beach",
      district: "Kinondoni",
      region: "Dar es Salaam",
      coordinates: { lat: -6.7389, lng: 39.2184 }
    },
    reportedBy: "Grace Makundi",
    reportedAt: "2025-03-16T17:30:00Z",
    description: "Water appears cloudy with sediment. Multiple households reporting issues.",
    waterSource: "tap",
    issueType: "color",
    severity: "medium",
    status: "pending",
    images: [
      "https://images.pexels.com/photos/4252526/pexels-photo-4252526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: []
  },
  {
    id: "WQI-006",
    location: {
      name: "Mabibo",
      district: "Ubungo",
      region: "Dar es Salaam",
      coordinates: { lat: -6.8125, lng: 39.2184 }
    },
    reportedBy: "David Swai",
    reportedAt: "2025-03-17T10:10:00Z",
    description: "Community well water has unusual odor. People experiencing stomach issues after consumption.",
    waterSource: "well",
    issueType: "odor",
    severity: "critical",
    status: "investigating",
    assignedTo: "Engineer Salim",
    updatedAt: "2025-03-17T13:40:00Z",
    images: [
      "https://images.pexels.com/photos/5599562/pexels-photo-5599562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: [
      {
        id: "c1",
        text: "Initial investigation scheduled. Advising residents to avoid consumption until further notice.",
        createdAt: "2025-03-17T13:40:00Z",
        createdBy: "Engineer Salim"
      }
    ]
  },
  {
    id: "WQI-007",
    location: {
      name: "Manzese",
      district: "Ubungo",
      region: "Dar es Salaam",
      coordinates: { lat: -6.7928, lng: 39.2371 }
    },
    reportedBy: "Fatima Mwinyi",
    reportedAt: "2025-03-13T14:50:00Z",
    description: "Water pressure very low in the entire neighborhood for over a week.",
    waterSource: "tap",
    issueType: "infrastructure",
    severity: "medium",
    status: "in_progress",
    assignedTo: "Engineer Joseph",
    updatedAt: "2025-03-15T11:30:00Z",
    comments: [
      {
        id: "c1",
        text: "Initial assessment shows potential blockage in main distribution pipe. Scheduling maintenance.",
        createdAt: "2025-03-14T09:15:00Z",
        createdBy: "Engineer Joseph"
      },
      {
        id: "c2",
        text: "Maintenance team deployed. Working on clearing blockage.",
        createdAt: "2025-03-15T11:30:00Z",
        createdBy: "Engineer Joseph"
      }
    ]
  },
  {
    id: "WQI-008",
    location: {
      name: "Magomeni",
      district: "Kinondoni",
      region: "Dar es Salaam",
      coordinates: { lat: -6.8011, lng: 39.2602 }
    },
    reportedBy: "Peter Makamba",
    reportedAt: "2025-03-16T12:20:00Z",
    description: "River water appears to have oil contamination. Local fishermen reporting dead fish.",
    waterSource: "river",
    issueType: "contamination",
    severity: "critical",
    status: "investigating",
    assignedTo: "Engineer Rose",
    updatedAt: "2025-03-17T08:45:00Z",
    images: [
      "https://images.pexels.com/photos/4209318/pexels-photo-4209318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: [
      {
        id: "c1",
        text: "Environmental team dispatched to investigate source of contamination. Samples collected.",
        createdAt: "2025-03-17T08:45:00Z",
        createdBy: "Engineer Rose"
      }
    ]
  },
  {
    id: "WQI-009",
    location: {
      name: "Kigamboni",
      district: "Kigamboni",
      region: "Dar es Salaam",
      coordinates: { lat: -6.8236, lng: 39.2953 }
    },
    reportedBy: "Benjamin Urassa",
    reportedAt: "2025-03-15T16:40:00Z",
    description: "Community water tank damaged and leaking. Serves about 50 households.",
    waterSource: "other",
    issueType: "infrastructure",
    severity: "high",
    status: "in_progress",
    assignedTo: "Engineer Amina",
    updatedAt: "2025-03-16T10:15:00Z",
    images: [
      "https://images.pexels.com/photos/11042732/pexels-photo-11042732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: [
      {
        id: "c1",
        text: "Assessment complete. Tank needs replacement. Temporary water distribution arranged.",
        createdAt: "2025-03-16T10:15:00Z",
        createdBy: "Engineer Amina"
      }
    ]
  },
  {
    id: "WQI-010",
    location: {
      name: "Tabata",
      district: "Ilala",
      region: "Dar es Salaam",
      coordinates: { lat: -6.8452, lng: 39.2268 }
    },
    reportedBy: "Lucy Mwaikambo",
    reportedAt: "2025-03-14T09:25:00Z",
    description: "Tap water has metallic taste and reddish color.",
    waterSource: "tap",
    issueType: "taste",
    severity: "medium",
    status: "rejected",
    assignedTo: "Engineer Thomas",
    updatedAt: "2025-03-14T14:50:00Z",
    images: [
      "https://images.pexels.com/photos/3698534/pexels-photo-3698534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    comments: [
      {
        id: "c1",
        text: "Investigation shows issue is isolated to reporter's home plumbing. Not a system-wide issue.",
        createdAt: "2025-03-14T14:50:00Z",
        createdBy: "Engineer Thomas"
      }
    ]
  }
];

// Synchronous functions that use cache or fallback to mock data
const getDataSource = (): WaterQualityIssue[] => {
  // If cache is available and recent, use it; otherwise use mock data
  return cachedIssues.length > 0 ? cachedIssues : mockWaterQualityIssues;
};

export const getIssuesByStatus = () => {
  const issues = getDataSource();
  const statuses = ['pending', 'investigating', 'in_progress', 'resolved', 'rejected'];
  
  return statuses.map(status => ({
    status,
    count: issues.filter(issue => issue.status === status).length
  }));
};

export const getIssuesBySeverity = () => {
  const issues = getDataSource();
  const severities = ['low', 'medium', 'high', 'critical'];
  
  return severities.map(severity => ({
    severity,
    count: issues.filter(issue => issue.severity === severity).length
  }));
};

export const getIssuesByRegion = () => {
  const issues = getDataSource();
  const regionCounts = {};
  
  issues.forEach(issue => {
    const region = issue.location.region;
    if (!regionCounts[region]) {
      regionCounts[region] = 0;
    }
    regionCounts[region]++;
  });
  
  return Object.entries(regionCounts).map(([region, count]) => ({
    region,
    count
  }));
};

export const getIssuesByType = () => {
  const issues = getDataSource();
  const typeCounts = {};
  
  issues.forEach(issue => {
    const type = issue.issueType;
    if (!typeCounts[type]) {
      typeCounts[type] = 0;
    }
    typeCounts[type]++;
  });
  
  return Object.entries(typeCounts).map(([type, count]) => ({
    type,
    count
  }));
};

export const getRecentIssues = (limit = 5) => {
  const issues = getDataSource();
  return [...issues]
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, limit);
};

export const getHighPriorityIssues = () => {
  const issues = getDataSource();
  return issues.filter(
    issue => (issue.severity === 'high' || issue.severity === 'critical') && 
    issue.status !== 'resolved' && 
    issue.status !== 'rejected'
  );
};

export const getTotalIssuesCount = () => getDataSource().length;

export const getResolvedIssuesCount = () => 
  getDataSource().filter(issue => issue.status === 'resolved').length;

export const getPendingIssuesCount = () => 
  getDataSource().filter(issue => issue.status === 'pending').length;

export const getCriticalIssuesCount = () => 
  getDataSource().filter(issue => issue.severity === 'critical' && issue.status !== 'resolved').length;

// Additional async functions for when you need real-time updates
export const refreshData = async () => {
  await updateCache();
};

export const forceRefresh = async () => {
  lastCacheUpdate = 0; // Force cache refresh
  await updateCache();
};

// CRUD operations (async, for when you need to modify data)
export const createIssue = async (issue: Omit<WaterQualityIssue, 'id' | 'comments'>): Promise<WaterQualityIssue | null> => {
  try {
    const { data, error } = await supabase
      .from('water_quality_issues')
      .insert({
        id: `WQI-${Date.now()}`,
        location_name: issue.location.name,
        location_district: issue.location.district,
        location_region: issue.location.region,
        location_lat: issue.location.coordinates?.lat,
        location_lng: issue.location.coordinates?.lng,
        reported_by: issue.reportedBy,
        reported_at: issue.reportedAt,
        description: issue.description,
        water_source: issue.waterSource,
        issue_type: issue.issueType,
        severity: issue.severity,
        status: issue.status,
        assigned_to: issue.assignedTo,
        updated_at: issue.updatedAt,
        resolved_at: issue.resolvedAt,
        images: issue.images
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating issue:', error);
      return null;
    }

    // Refresh cache after creating
    await forceRefresh();
    return transformDbRowToIssue(data, []);
  } catch (error) {
    console.error('Error in createIssue:', error);
    return null;
  }
};

export const updateIssue = async (id: string, updates: Partial<WaterQualityIssue>): Promise<WaterQualityIssue | null> => {
  try {
    const updateData: any = {};
    
    if (updates.location) {
      updateData.location_name = updates.location.name;
      updateData.location_district = updates.location.district;
      updateData.location_region = updates.location.region;
      updateData.location_lat = updates.location.coordinates?.lat;
      updateData.location_lng = updates.location.coordinates?.lng;
    }
    
    if (updates.reportedBy) updateData.reported_by = updates.reportedBy;
    if (updates.reportedAt) updateData.reported_at = updates.reportedAt;
    if (updates.description) updateData.description = updates.description;
    if (updates.waterSource) updateData.water_source = updates.waterSource;
    if (updates.issueType) updateData.issue_type = updates.issueType;
    if (updates.severity) updateData.severity = updates.severity;
    if (updates.status) updateData.status = updates.status;
    if (updates.assignedTo !== undefined) updateData.assigned_to = updates.assignedTo;
    if (updates.updatedAt) updateData.updated_at = updates.updatedAt;
    if (updates.resolvedAt !== undefined) updateData.resolved_at = updates.resolvedAt;
    if (updates.images) updateData.images = updates.images;

    const { data, error } = await supabase
      .from('water_quality_issues')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating issue:', error);
      return null;
    }

    // Refresh cache after updating
    await forceRefresh();

    // Fetch comments for the updated issue
    const { data: comments } = await supabase
      .from('water_quality_comments')
      .select('*')
      .eq('issue_id', id)
      .order('created_at', { ascending: true });

    return transformDbRowToIssue(data, comments || []);
  } catch (error) {
    console.error('Error in updateIssue:', error);
    return null;
  }
};

export const addComment = async (issueId: string, comment: Omit<WaterQualityIssue['comments'][0], 'id'>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('water_quality_comments')
      .insert({
        id: `c-${Date.now()}`,
        issue_id: issueId,
        text: comment.text,
        created_at: comment.createdAt,
        created_by: comment.createdBy
      });

    if (error) {
      console.error('Error adding comment:', error);
      return false;
    }

    // Refresh cache after adding comment
    await forceRefresh();
    return true;
  } catch (error) {
    console.error('Error in addComment:', error);
    return false;
  }
};