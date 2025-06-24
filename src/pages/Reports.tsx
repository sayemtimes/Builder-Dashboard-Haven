import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ComposedChart,
} from "recharts";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  Users,
  DollarSign,
  Target,
  Clock,
  Mail,
  Phone,
  Share,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Reports-specific mock data
const reportKPIs = [
  {
    title: "Total Reports Generated",
    value: "247",
    trend: "up",
    percentage: "+18.2%",
    icon: FileText,
    color: "text-blue-600",
    period: "This Month",
  },
  {
    title: "Scheduled Reports",
    value: "23",
    trend: "up",
    percentage: "+5.1%",
    icon: Calendar,
    color: "text-green-600",
    period: "Active",
  },
  {
    title: "Data Exports",
    value: "189",
    trend: "up",
    percentage: "+22.7%",
    icon: Download,
    color: "text-purple-600",
    period: "This Month",
  },
  {
    title: "Report Views",
    value: "3,421",
    trend: "up",
    percentage: "+15.3%",
    icon: BarChart3,
    color: "text-orange-600",
    period: "Total",
  },
];

const salesReportData = [
  { month: "Jan", revenue: 124000, deals: 45, forecast: 130000 },
  { month: "Feb", revenue: 135000, deals: 52, forecast: 140000 },
  { month: "Mar", revenue: 148000, deals: 48, forecast: 145000 },
  { month: "Apr", revenue: 162000, deals: 58, forecast: 160000 },
  { month: "May", revenue: 176000, deals: 63, forecast: 175000 },
  { month: "Jun", revenue: 189000, deals: 67, forecast: 185000 },
];

const performanceMetrics = [
  { metric: "Lead Conversion Rate", current: 3.2, previous: 2.8, target: 3.5 },
  {
    metric: "Customer Acquisition Cost",
    current: 245,
    previous: 267,
    target: 200,
  },
  {
    metric: "Customer Lifetime Value",
    current: 4850,
    previous: 4620,
    target: 5000,
  },
  { metric: "Monthly Churn Rate", current: 2.1, previous: 2.6, target: 2.0 },
  { metric: "Support Response Time", current: 4.2, previous: 5.1, target: 3.0 },
];

const recentReports = [
  {
    id: "1",
    name: "Q4 Sales Performance Report",
    type: "Sales",
    status: "Completed",
    generated: "2024-01-15",
    downloads: 45,
    size: "2.3 MB",
    format: "PDF",
  },
  {
    id: "2",
    name: "Marketing Campaign ROI Analysis",
    type: "Marketing",
    status: "Processing",
    generated: "2024-01-15",
    downloads: 0,
    size: "1.8 MB",
    format: "Excel",
  },
  {
    id: "3",
    name: "Customer Satisfaction Survey Results",
    type: "Support",
    status: "Completed",
    generated: "2024-01-14",
    downloads: 23,
    size: "956 KB",
    format: "PDF",
  },
  {
    id: "4",
    name: "Monthly Revenue Breakdown",
    type: "Finance",
    status: "Scheduled",
    generated: "2024-01-16",
    downloads: 0,
    size: "-",
    format: "PDF",
  },
];

const regionPerformance = [
  { region: "North America", revenue: 245000, growth: 12.5, color: "#3b82f6" },
  { region: "Europe", revenue: 189000, growth: 8.3, color: "#10b981" },
  { region: "Asia Pacific", revenue: 156000, growth: 15.7, color: "#f59e0b" },
  { region: "Latin America", revenue: 89000, growth: 22.1, color: "#ef4444" },
];

const topProducts = [
  { product: "CRM Professional", revenue: 324000, units: 1240, growth: 18.5 },
  { product: "Analytics Suite", revenue: 298000, units: 890, growth: 22.3 },
  { product: "Sales Automation", revenue: 267000, units: 1560, growth: 15.2 },
  { product: "Support Plus", revenue: 189000, units: 2340, growth: 8.7 },
  { product: "Marketing Tools", revenue: 156000, units: 780, growth: 12.9 },
];

const Reports = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? "text-green-600" : "text-red-600";
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
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Generate insights, track performance, and export business data
            </p>
          </div>
          <div className="flex space-x-3">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          </div>
        </motion.div>

        {/* Reports KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reportKPIs.map((kpi, index) => (
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
                      <div className="flex items-center space-x-2">
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
                        <span className="text-xs text-muted-foreground">
                          {kpi.period}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-accent">
                      <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Reports Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales Reports</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="regional">Regional</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Revenue & Sales Trends</CardTitle>
                        <Select defaultValue="6months">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3months">3 Months</SelectItem>
                            <SelectItem value="6months">6 Months</SelectItem>
                            <SelectItem value="1year">1 Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={salesReportData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Bar
                              yAxisId="left"
                              dataKey="revenue"
                              fill="#3b82f6"
                              name="Revenue ($)"
                              radius={[4, 4, 0, 0]}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="deals"
                              stroke="#10b981"
                              strokeWidth={3}
                              name="Deals Closed"
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="forecast"
                              stroke="#f59e0b"
                              strokeDasharray="5 5"
                              name="Forecast"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentReports.slice(0, 4).map((report, index) => (
                          <motion.div
                            key={report.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
                          >
                            <div className="space-y-1">
                              <p className="font-medium text-sm">
                                {report.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="secondary"
                                  className={getStatusColor(report.status)}
                                >
                                  {report.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {report.downloads} downloads
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </motion.div>
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
                          <FileText className="h-4 w-4" />
                          <span className="text-xs">Sales Report</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <PieChartIcon className="h-4 w-4" />
                          <span className="text-xs">Analytics</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <Users className="h-4 w-4" />
                          <span className="text-xs">Customer Report</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="text-xs">Email Report</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Sales Reports Tab */}
            <TabsContent value="sales" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.metric}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{metric.metric}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">
                              {metric.current.toLocaleString()}
                              {metric.metric.includes("Rate") ||
                              metric.metric.includes("Time")
                                ? metric.metric.includes("Rate")
                                  ? "%"
                                  : "h"
                                : metric.metric.includes("Cost") ||
                                    metric.metric.includes("Value")
                                  ? ""
                                  : ""}
                            </span>
                            <div
                              className={cn(
                                "flex items-center text-xs",
                                getGrowthColor(
                                  metric.current - metric.previous,
                                ),
                              )}
                            >
                              {metric.current > metric.previous ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              <span>
                                {Math.abs(
                                  ((metric.current - metric.previous) /
                                    metric.previous) *
                                    100,
                                ).toFixed(1)}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Target: {metric.target.toLocaleString()}</span>
                          <span>
                            Previous: {metric.previous.toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={cn(
                                "h-2 rounded-full transition-all duration-500",
                                metric.current >= metric.target
                                  ? "bg-green-500"
                                  : "bg-blue-500",
                              )}
                              style={{
                                width: `${Math.min((metric.current / metric.target) * 100, 100)}%`,
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

            {/* Regional Tab */}
            <TabsContent value="regional" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={regionPerformance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="region" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                            {regionPerformance.map((entry, index) => (
                              <Bar key={`bar-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div
                          key={product.product}
                          className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                        >
                          <div>
                            <p className="font-medium">{product.product}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.units.toLocaleString()} units
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">
                              ${product.revenue.toLocaleString()}
                            </p>
                            <p className="text-sm text-green-600">
                              +{product.growth}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Scheduled Tab */}
            <TabsContent value="scheduled" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Scheduled Reports</CardTitle>
                    <Button>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report, index) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium">{report.name}</h4>
                            <Badge variant="outline">{report.type}</Badge>
                            <Badge
                              variant="secondary"
                              className={getStatusColor(report.status)}
                            >
                              {report.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Generated: {report.generated}</span>
                            <span>Format: {report.format}</span>
                            <span>Size: {report.size}</span>
                            <span>Downloads: {report.downloads}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default Reports;
