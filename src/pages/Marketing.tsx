import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Eye,
  MousePointer,
  DollarSign,
  Plus,
  Search,
  Filter,
  Mail,
  Globe,
  Facebook,
  Linkedin,
  Calendar,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Marketing-specific mock data
const marketingKPIs = [
  {
    title: "Campaign ROI",
    value: "340%",
    trend: "up",
    percentage: "+25.3%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Lead Generation",
    value: "2,847",
    trend: "up",
    percentage: "+12.8%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    trend: "up",
    percentage: "+0.8%",
    icon: Target,
    color: "text-purple-600",
  },
  {
    title: "Cost per Lead",
    value: "$24",
    trend: "down",
    percentage: "-15.2%",
    icon: DollarSign,
    color: "text-orange-600",
  },
];

const campaignPerformance = [
  {
    name: "Q4 Holiday Campaign",
    impressions: 125000,
    clicks: 3500,
    conversions: 142,
    spend: 8500,
    roi: 340,
  },
  {
    name: "LinkedIn B2B Outreach",
    impressions: 45000,
    clicks: 1890,
    conversions: 78,
    spend: 3200,
    roi: 285,
  },
  {
    name: "Google Ads - SME",
    impressions: 89000,
    clicks: 2340,
    conversions: 156,
    spend: 5600,
    roi: 420,
  },
  {
    name: "Email Newsletter",
    impressions: 78000,
    clicks: 1560,
    conversions: 89,
    spend: 1200,
    roi: 180,
  },
  {
    name: "Facebook Retargeting",
    impressions: 34000,
    clicks: 890,
    conversions: 45,
    spend: 2100,
    roi: 250,
  },
];

const channelAttribution = [
  { channel: "Google Ads", leads: 1245, percentage: 32, color: "#4285f4" },
  { channel: "Facebook", leads: 890, percentage: 23, color: "#1877f2" },
  { channel: "LinkedIn", leads: 678, percentage: 18, color: "#0077b5" },
  { channel: "Email", leads: 567, percentage: 15, color: "#ea4335" },
  { channel: "Organic", leads: 456, percentage: 12, color: "#34a853" },
];

const contentPerformance = [
  {
    title: "The Ultimate Guide to CRM",
    type: "Blog Post",
    views: 15400,
    leads: 234,
    conversionRate: 1.52,
    status: "published",
  },
  {
    title: "2024 Sales Trends Webinar",
    type: "Webinar",
    views: 2890,
    leads: 567,
    conversionRate: 19.62,
    status: "live",
  },
  {
    title: "ROI Calculator Tool",
    type: "Interactive Tool",
    views: 8720,
    leads: 445,
    conversionRate: 5.1,
    status: "published",
  },
  {
    title: "Customer Success Stories",
    type: "Case Study",
    views: 6540,
    leads: 189,
    conversionRate: 2.89,
    status: "published",
  },
];

const marketingFunnel = [
  { stage: "Awareness", visitors: 45000, percentage: 100 },
  { stage: "Interest", visitors: 12500, percentage: 28 },
  { stage: "Consideration", visitors: 5600, percentage: 12 },
  { stage: "Intent", visitors: 2800, percentage: 6 },
  { stage: "Purchase", visitors: 890, percentage: 2 },
];

const socialMetrics = [
  { platform: "LinkedIn", followers: 12500, engagement: 4.2, posts: 45 },
  { platform: "Facebook", followers: 8900, engagement: 3.1, posts: 38 },
  { platform: "Twitter", followers: 6700, engagement: 2.8, posts: 52 },
  { platform: "Instagram", followers: 4300, engagement: 5.1, posts: 28 },
];

const monthlyTrends = [
  { month: "Jul", leads: 1890, spend: 18500, impressions: 245000 },
  { month: "Aug", leads: 2140, spend: 21200, impressions: 289000 },
  { month: "Sep", leads: 2380, spend: 23800, impressions: 312000 },
  { month: "Oct", leads: 2650, spend: 25600, impressions: 345000 },
  { month: "Nov", leads: 2890, spend: 27200, impressions: 378000 },
  { month: "Dec", leads: 3120, spend: 28900, impressions: 402000 },
];

const Marketing = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800";
      case "published":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return <Linkedin className="h-4 w-4" />;
      case "Facebook":
        return <Facebook className="h-4 w-4" />;
      case "Twitter":
        return <Globe className="h-4 w-4" />;
      case "Instagram":
        return <Eye className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
            <p className="text-muted-foreground">
              Analyze campaigns, track attribution, and optimize marketing ROI
            </p>
          </div>
          <div className="flex space-x-3">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </motion.div>

        {/* Marketing KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {marketingKPIs.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {kpi.title}
                      </p>
                      <h3 className="text-2xl font-bold">{kpi.value}</h3>
                      <div
                        className={cn(
                          "flex items-center space-x-1 text-xs",
                          kpi.color,
                        )}
                      >
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{kpi.percentage}</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        `bg-${kpi.color.split("-")[1]}-100`,
                      )}
                    >
                      <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Marketing Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="attribution">Attribution</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Campaign Performance</CardTitle>
                        <div className="flex space-x-2">
                          <Select defaultValue="all">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Campaigns</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="paused">Paused</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {campaignPerformance.map((campaign, index) => (
                          <motion.div
                            key={campaign.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">{campaign.name}</h4>
                              <Badge
                                variant="secondary"
                                className={
                                  campaign.roi > 300
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                ROI: {campaign.roi}%
                              </Badge>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">
                                  Impressions
                                </p>
                                <p className="font-medium">
                                  {campaign.impressions.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Clicks</p>
                                <p className="font-medium">
                                  {campaign.clicks.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Conversions
                                </p>
                                <p className="font-medium">
                                  {campaign.conversions}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Spend</p>
                                <p className="font-medium">
                                  ${campaign.spend.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Marketing Funnel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {marketingFunnel.map((stage, index) => (
                          <div key={stage.stage} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {stage.stage}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {stage.visitors.toLocaleString()} (
                                {stage.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${stage.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="text-xs">Email Campaign</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <Target className="h-4 w-4" />
                          <span className="text-xs">A/B Test</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs">Schedule Post</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span className="text-xs">Analytics</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Attribution Tab */}
            <TabsContent value="attribution" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Attribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={channelAttribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="leads"
                            label={({ channel, percentage }) =>
                              `${channel}: ${percentage}%`
                            }
                          >
                            {channelAttribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="leads"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Content Performance</CardTitle>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search content..."
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentPerformance.map((content, index) => (
                      <motion.div
                        key={content.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{content.title}</h4>
                            <Badge variant="secondary">{content.type}</Badge>
                            <Badge
                              variant="secondary"
                              className={getStatusColor(content.status)}
                            >
                              {content.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{content.views.toLocaleString()} views</span>
                            <span>{content.leads} leads</span>
                            <span>{content.conversionRate}% conversion</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{
                                width: `${Math.min(content.conversionRate * 5, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Media Tab */}
            <TabsContent value="social" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {socialMetrics.map((platform, index) => (
                  <motion.div
                    key={platform.platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          {getPlatformIcon(platform.platform)}
                          <h3 className="font-medium">{platform.platform}</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Followers
                            </span>
                            <span className="font-medium">
                              {platform.followers.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Engagement
                            </span>
                            <span className="font-medium">
                              {platform.engagement}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Posts
                            </span>
                            <span className="font-medium">
                              {platform.posts}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="leads"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          name="Leads"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="spend"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="Spend ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Marketing;
