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

export const getIssuesByStatus = () => {
  const statuses = ['pending', 'investigating', 'in_progress', 'resolved', 'rejected'];
  
  return statuses.map(status => ({
    status,
    count: mockWaterQualityIssues.filter(issue => issue.status === status).length
  }));
};

export const getIssuesBySeverity = () => {
  const severities = ['low', 'medium', 'high', 'critical'];
  
  return severities.map(severity => ({
    severity,
    count: mockWaterQualityIssues.filter(issue => issue.severity === severity).length
  }));
};

export const getIssuesByRegion = () => {
  const regionCounts = {};
  
  mockWaterQualityIssues.forEach(issue => {
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
  const typeCounts = {};
  
  mockWaterQualityIssues.forEach(issue => {
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
  return [...mockWaterQualityIssues]
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, limit);
};

export const getHighPriorityIssues = () => {
  return mockWaterQualityIssues.filter(
    issue => (issue.severity === 'high' || issue.severity === 'critical') && 
    issue.status !== 'resolved' && 
    issue.status !== 'rejected'
  );
};

export const getTotalIssuesCount = () => mockWaterQualityIssues.length;

export const getResolvedIssuesCount = () => 
  mockWaterQualityIssues.filter(issue => issue.status === 'resolved').length;

export const getPendingIssuesCount = () => 
  mockWaterQualityIssues.filter(issue => issue.status === 'pending').length;

export const getCriticalIssuesCount = () => 
  mockWaterQualityIssues.filter(issue => issue.severity === 'critical' && issue.status !== 'resolved').length;