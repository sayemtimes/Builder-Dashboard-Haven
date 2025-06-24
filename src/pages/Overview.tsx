import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Users,
  DollarSign,
  Target,
  Star,
  Phone,
  Mail,
  Calendar,
  FileText,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import all mock data
import {
  kpiData,
  salesData,
  salesReps,
  campaigns,
  ticketStats,
  ticketCategories,
  cltvSegments,
  activityFeed,
  integrations,
  recentDeals,
  satisfactionTrends,
  channelAttribution,
} from "@/lib/mockData";

const Overview = () => {
  // Combined overview stats
  const overviewStats = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+18.2%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Customers",
      value: "12,847",
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      trend: "up" as const,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Support Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up" as const,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  // Recent activities summary
  const recentActivities = [
    {
      type: "Deal Closed",
      description: "Sarah Chen closed $45K deal with TechCorp",
      time: "2 min ago",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      type: "Support Ticket",
      description: "High priority ticket #456 requires attention",
      time: "5 min ago",
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      type: "Campaign Launch",
      description: "Q4 Holiday Campaign exceeded ROI target",
      time: "15 min ago",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      type: "New Lead",
      description: "Qualified lead from Global Dynamics LLC",
      time: "1 hour ago",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  // Top performers
  const topPerformers = {
    salesRep: salesReps[0],
    campaign: campaigns[0],
    customer: {
      name: "TechCorp Industries",
      value: "$125K",
      growth: "+25%",
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            CRM Analytics Dashboard Overview
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your complete business intelligence center - monitor sales
            performance, track customer satisfaction, analyze marketing ROI, and
            optimize operations in real-time.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Button size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Generate Report
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Meeting
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            Key Performance Indicators
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {overviewStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <h3 className="text-3xl font-bold">{stat.value}</h3>
                        <div
                          className={cn(
                            "flex items-center space-x-1 text-sm",
                            stat.color,
                          )}
                        >
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span>{stat.change}</span>
                          <span className="text-muted-foreground">
                            vs last month
                          </span>
                        </div>
                      </div>
                      <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                        <stat.icon className={cn("h-6 w-6", stat.color)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            Complete Business Overview
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Sales Performance Preview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Sales Performance Trends</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData.slice(-6)}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                      />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis
                        fontSize={12}
                        tickFormatter={(value) => `$${value / 1000}K`}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="currentYear"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Top Performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {topPerformers.salesRep.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {topPerformers.salesRep.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${topPerformers.salesRep.revenue.toLocaleString()}{" "}
                        revenue
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                  <p className="font-medium">{topPerformers.campaign.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {topPerformers.campaign.roi}% ROI •{" "}
                    {topPerformers.campaign.leads} leads
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <p className="font-medium">{topPerformers.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {topPerformers.customer.value} value •{" "}
                    {topPerformers.customer.growth} growth
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Marketing ROI Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Marketing ROI Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelAttribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="leads"
                        label={({ percentage }) => `${percentage}%`}
                      >
                        {channelAttribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {channelAttribution.slice(0, 3).map((channel, index) => (
                    <div
                      key={channel.channel}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: channel.color }}
                        />
                        <span>{channel.channel}</span>
                      </div>
                      <span className="font-medium">{channel.leads} leads</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Support Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-red-50">
                    <p className="text-2xl font-bold text-red-600">
                      {ticketStats.totalOpen}
                    </p>
                    <p className="text-xs text-red-600">Open</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <p className="text-2xl font-bold text-green-600">
                      {ticketStats.resolved}
                    </p>
                    <p className="text-xs text-green-600">Resolved</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <p className="text-2xl font-bold text-blue-600">
                      {ticketStats.avgResolutionTime}
                    </p>
                    <p className="text-xs text-blue-600">Avg Time</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {ticketCategories.slice(0, 3).map((category) => (
                    <div
                      key={category.category}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{category.category}</span>
                      <span className="text-sm font-medium">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Lifetime Value */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Customer Value Segments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cltvSegments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" fontSize={10} />
                      <YAxis
                        fontSize={10}
                        tickFormatter={(value) => `$${value / 1000}K`}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="avgCLTV"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Recent Activities & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-accent">
                      <activity.icon
                        className={cn("h-4 w-4", activity.color)}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex-col space-y-2">
                  <DollarSign className="h-6 w-6" />
                  <span>New Deal</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Add Customer</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>New Campaign</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>Generate Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Phone className="h-6 w-6" />
                  <span>Support Ticket</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Call</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Integration Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "p-4 rounded-lg border-2 text-center transition-all",
                      integration.status === "connected"
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50",
                    )}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-2xl">{integration.icon}</span>
                      {integration.status === "connected" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <p className="font-medium">{integration.name}</p>
                    <Badge
                      variant={
                        integration.status === "connected"
                          ? "default"
                          : "destructive"
                      }
                      className="mt-2"
                    >
                      {integration.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
