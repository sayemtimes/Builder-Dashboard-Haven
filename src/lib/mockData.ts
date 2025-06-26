// Types
export interface KPIData {
  id: string;
  title: string;
  value: string;
  trend: "up" | "down";
  percentage: string;
  description: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  icon: string;
  message: string;
  time: string;
  type: string;
  user: string;
}

// KPI Data for dashboard cards
export const kpiData: KPIData[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$847K",
    trend: "up",
    percentage: "+12.5%",
    description: "vs last month",
    icon: "💰",
  },
  {
    id: "deals",
    title: "Active Deals",
    value: "124",
    trend: "up",
    percentage: "+8.2%",
    description: "vs last month",
    icon: "📊",
  },
  {
    id: "customers",
    title: "Total Customers",
    value: "2,945",
    trend: "up",
    percentage: "+15.3%",
    description: "vs last month",
    icon: "👥",
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "18.5%",
    trend: "down",
    percentage: "-2.1%",
    description: "vs last month",
    icon: "🎯",
  },
  {
    id: "satisfaction",
    title: "Customer Satisfaction",
    value: "4.8",
    trend: "up",
    percentage: "+0.3",
    description: "avg rating",
    icon: "⭐",
  },
];

// Sales Data
export const salesData = [
  { month: "Jan", revenue: 45000, deals: 23, conversion: 12.5 },
  { month: "Feb", revenue: 52000, deals: 28, conversion: 14.2 },
  { month: "Mar", revenue: 48000, deals: 25, conversion: 13.1 },
  { month: "Apr", revenue: 61000, deals: 32, conversion: 15.8 },
  { month: "May", revenue: 55000, deals: 29, conversion: 14.5 },
  { month: "Jun", revenue: 67000, deals: 35, conversion: 16.2 },
  { month: "Jul", revenue: 72000, deals: 38, conversion: 17.1 },
  { month: "Aug", revenue: 68000, deals: 36, conversion: 16.4 },
  { month: "Sep", revenue: 75000, deals: 40, conversion: 18.2 },
  { month: "Oct", revenue: 82000, deals: 43, conversion: 19.1 },
  { month: "Nov", revenue: 78000, deals: 41, conversion: 18.5 },
  { month: "Dec", revenue: 95000, deals: 48, conversion: 21.3 },
];

// Sales Representatives
export const salesReps = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    deals: 45,
    revenue: 285000,
    conversionRate: 18.5,
    avatar: "/placeholder.svg",
    status: "active",
    performance: "excellent",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    deals: 38,
    revenue: 220000,
    conversionRate: 15.2,
    avatar: "/placeholder.svg",
    status: "active",
    performance: "good",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    deals: 52,
    revenue: 340000,
    conversionRate: 22.1,
    avatar: "/placeholder.svg",
    status: "active",
    performance: "excellent",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@company.com",
    phone: "+1 (555) 456-7890",
    deals: 31,
    revenue: 195000,
    conversionRate: 13.8,
    avatar: "/placeholder.svg",
    status: "active",
    performance: "average",
  },
];

// Marketing Campaigns
export const campaigns = [
  {
    id: 1,
    name: "Summer Product Launch",
    type: "Email",
    status: "Active",
    budget: 25000,
    spent: 18500,
    leads: 342,
    conversions: 28,
    roi: 2.4,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    id: 2,
    name: "Social Media Boost",
    type: "Social",
    status: "Active",
    budget: 15000,
    spent: 12200,
    leads: 189,
    conversions: 15,
    roi: 1.8,
    startDate: "2024-07-15",
    endDate: "2024-09-15",
  },
  {
    id: 3,
    name: "Google Ads Campaign",
    type: "PPC",
    status: "Paused",
    budget: 35000,
    spent: 32100,
    leads: 425,
    conversions: 38,
    roi: 3.2,
    startDate: "2024-05-01",
    endDate: "2024-07-31",
  },
  {
    id: 4,
    name: "Content Marketing Push",
    type: "Content",
    status: "Planning",
    budget: 20000,
    spent: 0,
    leads: 0,
    conversions: 0,
    roi: 0,
    startDate: "2024-09-01",
    endDate: "2024-11-30",
  },
];

// Support Ticket Statistics
export const ticketStats = [
  {
    category: "Technical",
    count: 145,
    resolved: 132,
    pending: 13,
    avgTime: "4.2h",
  },
  { category: "Billing", count: 89, resolved: 87, pending: 2, avgTime: "2.1h" },
  { category: "Product", count: 67, resolved: 61, pending: 6, avgTime: "6.5h" },
  { category: "Account", count: 52, resolved: 48, pending: 4, avgTime: "3.8h" },
  { category: "General", count: 34, resolved: 32, pending: 2, avgTime: "1.5h" },
];

// Support Ticket Categories
export const ticketCategories = [
  { name: "High Priority", value: 23, color: "#ef4444" },
  { name: "Medium Priority", value: 156, color: "#f59e0b" },
  { name: "Low Priority", value: 208, color: "#10b981" },
  { name: "Resolved", value: 360, color: "#6b7280" },
];

// Customer Lifetime Value Segments
export const cltvSegments = [
  {
    segment: "Premium",
    customers: 145,
    avgValue: 15000,
    retention: 95,
    growth: 12,
  },
  {
    segment: "Standard",
    customers: 892,
    avgValue: 5500,
    retention: 82,
    growth: 8,
  },
  {
    segment: "Basic",
    customers: 1563,
    avgValue: 1200,
    retention: 68,
    growth: -3,
  },
  { segment: "Trial", customers: 345, avgValue: 0, retention: 25, growth: 45 },
];

// Integration Status
export const integrations = [
  {
    id: 1,
    name: "Salesforce",
    type: "CRM",
    status: "Connected",
    lastSync: "2024-01-15T10:30:00Z",
    records: 12500,
    health: "Good",
  },
  {
    id: 2,
    name: "HubSpot",
    type: "Marketing",
    status: "Connected",
    lastSync: "2024-01-15T09:45:00Z",
    records: 8900,
    health: "Excellent",
  },
  {
    id: 3,
    name: "Zendesk",
    type: "Support",
    status: "Connected",
    lastSync: "2024-01-15T11:15:00Z",
    records: 3400,
    health: "Good",
  },
  {
    id: 4,
    name: "Slack",
    type: "Communication",
    status: "Error",
    lastSync: "2024-01-14T16:20:00Z",
    records: 0,
    health: "Poor",
  },
  {
    id: 5,
    name: "Google Analytics",
    type: "Analytics",
    status: "Connected",
    lastSync: "2024-01-15T11:00:00Z",
    records: 45000,
    health: "Excellent",
  },
];

// Channel Attribution Data
export const channelAttribution = [
  {
    channel: "Organic Search",
    visitors: 2890,
    conversions: 145,
    revenue: 87000,
    cpa: 600,
  },
  {
    channel: "Paid Search",
    visitors: 1245,
    conversions: 89,
    revenue: 56000,
    cpa: 629,
  },
  {
    channel: "Social Media",
    visitors: 956,
    conversions: 34,
    revenue: 21000,
    cpa: 618,
  },
  {
    channel: "Email",
    visitors: 678,
    conversions: 56,
    revenue: 34000,
    cpa: 607,
  },
  {
    channel: "Direct",
    visitors: 1834,
    conversions: 112,
    revenue: 71000,
    cpa: 634,
  },
  {
    channel: "Referral",
    visitors: 423,
    conversions: 28,
    revenue: 18000,
    cpa: 643,
  },
];

// AI Assistant Suggestions
export const aiSuggestions = [
  {
    id: 1,
    type: "optimization",
    title: "Improve Email Campaign Performance",
    description:
      "Your email open rates have dropped 15% this month. Consider A/B testing subject lines and optimizing send times.",
    priority: "high",
    estimatedImpact: "+12% conversion rate",
    category: "Marketing",
  },
  {
    id: 2,
    type: "opportunity",
    title: "High-Value Lead Follow-up",
    description:
      "3 leads from enterprise prospects haven't been contacted in 48+ hours. Quick follow-up could increase close probability.",
    priority: "urgent",
    estimatedImpact: "+$45K potential revenue",
    category: "Sales",
  },
  {
    id: 3,
    type: "insight",
    title: "Customer Retention Pattern",
    description:
      "Customers who engage with our support within the first 30 days have 40% higher lifetime value.",
    priority: "medium",
    estimatedImpact: "+25% customer LTV",
    category: "Customer Success",
  },
  {
    id: 4,
    type: "alert",
    title: "Support Ticket Spike",
    description:
      "Technical support tickets increased 35% this week. Consider adding FAQ content or proactive communication.",
    priority: "medium",
    estimatedImpact: "-20% support load",
    category: "Support",
  },
];

// Recent Activity Timeline
export const recentActivity = [
  {
    id: 1,
    type: "deal_closed",
    title: "Deal Closed",
    description: "Enterprise deal with Acme Corp closed for $45,000",
    user: "Sarah Johnson",
    timestamp: "2024-01-15T14:30:00Z",
    value: 45000,
  },
  {
    id: 2,
    type: "campaign_launched",
    title: "Campaign Launched",
    description: "Q1 Product Launch email campaign went live",
    user: "Marketing Team",
    timestamp: "2024-01-15T12:00:00Z",
    value: null,
  },
  {
    id: 3,
    type: "support_resolved",
    title: "Critical Issue Resolved",
    description: "High-priority technical issue resolved for Premium customer",
    user: "Tech Support",
    timestamp: "2024-01-15T11:45:00Z",
    value: null,
  },
  {
    id: 4,
    type: "lead_qualified",
    title: "Lead Qualified",
    description: "New MQL from organic search converted to SQL",
    user: "David Thompson",
    timestamp: "2024-01-15T10:15:00Z",
    value: null,
  },
  {
    id: 5,
    type: "integration_connected",
    title: "Integration Connected",
    description: "Successfully connected HubSpot integration",
    user: "System",
    timestamp: "2024-01-15T09:30:00Z",
    value: null,
  },
];

// Customer Funnel Data
export const funnelData = [
  { stage: "Visitors", count: 12500, conversion: 100 },
  { stage: "Leads", count: 3750, conversion: 30 },
  { stage: "MQLs", count: 1125, conversion: 9 },
  { stage: "SQLs", count: 450, conversion: 3.6 },
  { stage: "Opportunities", count: 180, conversion: 1.44 },
  { stage: "Customers", count: 36, conversion: 0.29 },
];

// Customer Retention Data
export const retentionData = [
  { cohort: "Jan 2023", month1: 100, month3: 85, month6: 72, month12: 58 },
  { cohort: "Feb 2023", month1: 100, month3: 88, month6: 75, month12: 62 },
  { cohort: "Mar 2023", month1: 100, month3: 82, month6: 69, month12: 55 },
  { cohort: "Apr 2023", month1: 100, month3: 91, month6: 78, month12: 65 },
  { cohort: "May 2023", month1: 100, month3: 86, month6: 73, month12: 59 },
  { cohort: "Jun 2023", month1: 100, month3: 89, month6: 76, month12: 63 },
];

// Customer Churn Reasons
export const churnReasons = [
  { reason: "Price too high", percentage: 32, count: 156 },
  { reason: "Poor customer service", percentage: 24, count: 117 },
  { reason: "Feature limitations", percentage: 18, count: 88 },
  { reason: "Found better alternative", percentage: 15, count: 73 },
  { reason: "Technical issues", percentage: 11, count: 54 },
];

// Cohort Data for retention analysis
export const cohortData = [
  {
    month: "Jan 2023",
    month0: 100,
    month1: 85,
    month2: 72,
    month3: 58,
    month4: 48,
    month5: 42,
  },
  {
    month: "Feb 2023",
    month0: 100,
    month1: 88,
    month2: 75,
    month3: 62,
    month4: 52,
    month5: 45,
  },
  {
    month: "Mar 2023",
    month0: 100,
    month1: 82,
    month2: 69,
    month3: 55,
    month4: 46,
    month5: 39,
  },
  {
    month: "Apr 2023",
    month0: 100,
    month1: 91,
    month2: 78,
    month3: 65,
    month4: 55,
    month5: 48,
  },
  {
    month: "May 2023",
    month0: 100,
    month1: 86,
    month2: 73,
    month3: 59,
    month4: 49,
    month5: 43,
  },
  {
    month: "Jun 2023",
    month0: 100,
    month1: 89,
    month2: 76,
    month3: 63,
    month4: 53,
    month5: 46,
  },
];

// Ad Spend Data for marketing dashboard
export const adSpendData = [
  { name: "Google Ads", amount: 25000, value: 42 },
  { name: "Facebook Ads", amount: 18000, value: 30 },
  { name: "LinkedIn Ads", amount: 10000, value: 17 },
  { name: "Twitter Ads", amount: 4000, value: 7 },
  { name: "YouTube Ads", amount: 2500, value: 4 },
];

// High Value Clients for CLTV dashboard
export const highValueClients = [
  {
    name: "Acme Enterprise Corp",
    cltv: 485000,
    monthlySpend: 15000,
    segment: "Enterprise",
    tenure: "3.2 years",
  },
  {
    name: "TechGlobal Solutions",
    cltv: 420000,
    monthlySpend: 12500,
    segment: "Enterprise",
    tenure: "2.8 years",
  },
  {
    name: "Innovation Labs Inc",
    cltv: 380000,
    monthlySpend: 11000,
    segment: "Enterprise",
    tenure: "2.5 years",
  },
  {
    name: "Digital Dynamics LLC",
    cltv: 320000,
    monthlySpend: 9500,
    segment: "Mid-Market",
    tenure: "2.1 years",
  },
  {
    name: "Future Systems Co",
    cltv: 285000,
    monthlySpend: 8500,
    segment: "Mid-Market",
    tenure: "1.9 years",
  },
  {
    name: "CloudFirst Technologies",
    cltv: 250000,
    monthlySpend: 7500,
    segment: "Mid-Market",
    tenure: "1.7 years",
  },
  {
    name: "DataDriven Enterprises",
    cltv: 225000,
    monthlySpend: 6800,
    segment: "Mid-Market",
    tenure: "1.5 years",
  },
  {
    name: "SmartScale Solutions",
    cltv: 200000,
    monthlySpend: 6200,
    segment: "SMB",
    tenure: "1.3 years",
  },
  {
    name: "NextGen Innovations",
    cltv: 185000,
    monthlySpend: 5800,
    segment: "SMB",
    tenure: "1.2 years",
  },
  {
    name: "AgileWorks Partners",
    cltv: 165000,
    monthlySpend: 5200,
    segment: "SMB",
    tenure: "1.1 years",
  },
];

// Mock deals data for CRUD operations
export const mockDeals = [
  {
    id: 1,
    title: "Enterprise Software License",
    client: "Acme Corporation",
    value: 45000,
    stage: "Proposal",
    probability: 75,
    closeDate: "2024-02-15",
    owner: "Sarah Johnson",
    description:
      "Annual enterprise software license renewal with additional modules",
  },
  {
    id: 2,
    title: "Website Redesign Project",
    client: "TechStart Inc",
    value: 25000,
    stage: "Negotiation",
    probability: 60,
    closeDate: "2024-01-30",
    owner: "Michael Chen",
    description: "Complete website redesign and development project",
  },
  {
    id: 3,
    title: "Cloud Migration Services",
    client: "Global Industries",
    value: 85000,
    stage: "Qualified",
    probability: 40,
    closeDate: "2024-03-20",
    owner: "Emily Rodriguez",
    description: "Full cloud infrastructure migration and optimization",
  },
  {
    id: 4,
    title: "Marketing Automation Setup",
    client: "Retail Solutions",
    value: 15000,
    stage: "Discovery",
    probability: 25,
    closeDate: "2024-02-28",
    owner: "David Thompson",
    description:
      "Implementation of marketing automation platform and workflows",
  },
];

// Mock customers data for CRUD operations
export const mockCustomers = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    status: "Active",
    value: 125000,
    lastContact: "2024-01-10",
    source: "Website",
    tags: ["Enterprise", "High Value"],
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "hello@techstart.com",
    phone: "+1 (555) 234-5678",
    company: "TechStart Inc",
    status: "Prospect",
    value: 45000,
    lastContact: "2024-01-12",
    source: "Referral",
    tags: ["Startup", "Technology"],
  },
  {
    id: 3,
    name: "Global Industries",
    email: "info@globalind.com",
    phone: "+1 (555) 345-6789",
    company: "Global Industries",
    status: "Active",
    value: 200000,
    lastContact: "2024-01-08",
    source: "Trade Show",
    tags: ["Manufacturing", "Global"],
  },
  {
    id: 4,
    name: "Retail Solutions",
    email: "support@retailsol.com",
    phone: "+1 (555) 456-7890",
    company: "Retail Solutions",
    status: "Inactive",
    value: 75000,
    lastContact: "2023-12-15",
    source: "Cold Outreach",
    tags: ["Retail", "Medium Size"],
  },
];

// Filter Options for dashboard components
export const filterOptions = {
  dateRanges: [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
    { label: "Last 6 months", value: "6m" },
    { label: "Last year", value: "1y" },
    { label: "All time", value: "all" },
  ],
  regions: [
    { label: "All Regions", value: "all" },
    { label: "North America", value: "na" },
    { label: "Europe", value: "eu" },
    { label: "Asia Pacific", value: "apac" },
    { label: "Latin America", value: "latam" },
    { label: "Middle East & Africa", value: "mea" },
  ],
  salesReps: [
    { label: "All Sales Reps", value: "all" },
    { label: "Sarah Johnson", value: "sarah" },
    { label: "Michael Chen", value: "michael" },
    { label: "Emily Rodriguez", value: "emily" },
    { label: "David Thompson", value: "david" },
  ],
  segments: [
    { label: "Enterprise", value: "enterprise" },
    { label: "Mid-Market", value: "mid-market" },
    { label: "SMB", value: "smb" },
    { label: "Startup", value: "startup" },
  ],
};
