import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
} from "recharts";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Star,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  FileText,
  Users,
  Calendar,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Support-specific mock data
const supportKPIs = [
  {
    title: "Open Tickets",
    value: "156",
    trend: "down",
    percentage: "-8.2%",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "Resolution Time",
    value: "4.2h",
    trend: "down",
    percentage: "-12.5%",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    trend: "up",
    percentage: "+0.3",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "First Response",
    value: "45min",
    trend: "down",
    percentage: "-18.7%",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

const recentTickets = [
  {
    id: "TK-001",
    subject: "Login issues with new password reset",
    customer: "John Smith",
    priority: "High",
    status: "Open",
    assignee: "Sarah Johnson",
    created: "2024-01-15T10:30:00",
    category: "Technical",
    avatar: "JS",
  },
  {
    id: "TK-002",
    subject: "Billing discrepancy for December invoice",
    customer: "Alice Brown",
    priority: "Medium",
    status: "In Progress",
    assignee: "Mike Chen",
    created: "2024-01-15T09:15:00",
    category: "Billing",
    avatar: "AB",
  },
  {
    id: "TK-003",
    subject: "Feature request: Export functionality",
    customer: "Robert Wilson",
    priority: "Low",
    status: "Pending",
    assignee: "Lisa Park",
    created: "2024-01-15T08:45:00",
    category: "Feature Request",
    avatar: "RW",
  },
  {
    id: "TK-004",
    subject: "Cannot access dashboard after update",
    customer: "Emma Davis",
    priority: "High",
    status: "Open",
    assignee: "David Kim",
    created: "2024-01-15T07:20:00",
    category: "Technical",
    avatar: "ED",
  },
  {
    id: "TK-005",
    subject: "Question about premium features",
    customer: "Tom Johnson",
    priority: "Low",
    status: "Resolved",
    assignee: "Sarah Johnson",
    created: "2024-01-14T16:30:00",
    category: "General",
    avatar: "TJ",
  },
];

const ticketCategories = [
  { category: "Technical Issues", count: 45, color: "#ef4444", percentage: 35 },
  {
    category: "Billing Questions",
    count: 28,
    color: "#f59e0b",
    percentage: 22,
  },
  { category: "Feature Requests", count: 34, color: "#3b82f6", percentage: 26 },
  { category: "General Inquiry", count: 22, color: "#10b981", percentage: 17 },
];

const supportAgents = [
  {
    name: "Sarah Johnson",
    status: "Online",
    tickets: 23,
    avgResponse: "32min",
    satisfaction: 4.9,
    avatar: "SJ",
  },
  {
    name: "Mike Chen",
    status: "Online",
    tickets: 19,
    avgResponse: "45min",
    satisfaction: 4.7,
    avatar: "MC",
  },
  {
    name: "Lisa Park",
    status: "Away",
    tickets: 15,
    avgResponse: "38min",
    satisfaction: 4.8,
    avatar: "LP",
  },
  {
    name: "David Kim",
    status: "Online",
    tickets: 21,
    avgResponse: "29min",
    satisfaction: 4.6,
    avatar: "DK",
  },
];

const satisfactionTrends = [
  { month: "Jul", score: 4.2, responses: 156 },
  { month: "Aug", score: 4.4, responses: 178 },
  { month: "Sep", score: 4.3, responses: 192 },
  { month: "Oct", score: 4.6, responses: 203 },
  { month: "Nov", score: 4.7, responses: 189 },
  { month: "Dec", score: 4.8, responses: 221 },
];

const resolutionTimes = [
  { category: "Technical", avgHours: 3.2, target: 4.0 },
  { category: "Billing", avgHours: 2.1, target: 2.5 },
  { category: "Feature Request", avgHours: 8.5, target: 12.0 },
  { category: "General", avgHours: 1.8, target: 2.0 },
];

const knowledgeBase = [
  {
    title: "Getting Started Guide",
    category: "Onboarding",
    views: 2456,
    helpful: 89,
    lastUpdated: "2024-01-10",
  },
  {
    title: "Password Reset Instructions",
    category: "Account",
    views: 1892,
    helpful: 94,
    lastUpdated: "2024-01-08",
  },
  {
    title: "Billing and Subscription FAQ",
    category: "Billing",
    views: 1634,
    helpful: 87,
    lastUpdated: "2024-01-12",
  },
  {
    title: "API Documentation",
    category: "Technical",
    views: 1245,
    helpful: 91,
    lastUpdated: "2024-01-05",
  },
];

const Support = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-500";
      case "Away":
        return "bg-yellow-500";
      case "Offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h ago`;
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
            <h1 className="text-3xl font-bold">Support Dashboard</h1>
            <p className="text-muted-foreground">
              Manage tickets, track satisfaction, and support customers
            </p>
          </div>
          <div className="flex space-x-3">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Knowledge Base
            </Button>
          </div>
        </motion.div>

        {/* Support KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {supportKPIs.map((kpi, index) => (
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
                    <div className={cn("p-2 rounded-lg", kpi.bgColor)}>
                      <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Support Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="tickets" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="agents">Team</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            </TabsList>

            {/* Tickets Tab */}
            <TabsContent value="tickets" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Tickets</CardTitle>
                        <div className="flex space-x-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search tickets..."
                              className="pl-10 w-64"
                            />
                          </div>
                          <Select defaultValue="all">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTickets.map((ticket, index) => (
                          <motion.div
                            key={ticket.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">
                                    {ticket.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">
                                    {ticket.subject}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {ticket.customer} •{" "}
                                    {formatTimeAgo(ticket.created)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant="secondary"
                                    className={getPriorityColor(
                                      ticket.priority,
                                    )}
                                  >
                                    {ticket.priority}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className={getStatusColor(ticket.status)}
                                  >
                                    {ticket.status}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Assigned to {ticket.assignee}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">{ticket.category}</Badge>
                              <span className="text-xs text-muted-foreground">
                                #{ticket.id}
                              </span>
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
                      <CardTitle>Ticket Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ticketCategories.map((category, index) => (
                          <div key={category.category} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {category.category}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {category.count} ({category.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  backgroundColor: category.color,
                                  width: `${category.percentage}%`,
                                }}
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
                          <Phone className="h-4 w-4" />
                          <span className="text-xs">Call Customer</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="text-xs">Send Email</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="text-xs">Create Article</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 flex-col space-y-1"
                        >
                          <Users className="h-4 w-4" />
                          <span className="text-xs">Escalate</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Resolution Times by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={resolutionTimes}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="avgHours"
                            fill="#3b82f6"
                            name="Avg Hours"
                          />
                          <Bar
                            dataKey="target"
                            fill="#94a3b8"
                            name="Target Hours"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Satisfaction Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={satisfactionTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[3.5, 5]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#10b981"
                            strokeWidth={3}
                            name="Satisfaction Score"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="agents" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {supportAgents.map((agent, index) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="relative">
                            <Avatar>
                              <AvatarFallback>{agent.avatar}</AvatarFallback>
                            </Avatar>
                            <div
                              className={cn(
                                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                                getAgentStatusColor(agent.status),
                              )}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {agent.status}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Active Tickets
                            </span>
                            <span className="font-medium">{agent.tickets}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Avg Response
                            </span>
                            <span className="font-medium">
                              {agent.avgResponse}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Satisfaction
                            </span>
                            <span className="font-medium flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              {agent.satisfaction}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Knowledge Base Tab */}
            <TabsContent value="knowledge" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Knowledge Base Articles</CardTitle>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Article
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {knowledgeBase.map((article, index) => (
                      <motion.div
                        key={article.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{article.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <Badge variant="outline">{article.category}</Badge>
                            <span>{article.views} views</span>
                            <span>{article.helpful}% helpful</span>
                            <span>Updated {article.lastUpdated}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Satisfaction Tab */}
            <TabsContent value="satisfaction" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="h-4 w-4 text-yellow-500 fill-yellow-500"
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            John Smith
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "Excellent support! Sarah resolved my issue within
                          minutes. Very impressed with the quick response."
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4].map((star) => (
                              <Star
                                key={star}
                                className="h-4 w-4 text-yellow-500 fill-yellow-500"
                              />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <span className="text-sm font-medium">
                            Alice Brown
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "Good service overall. The billing issue was resolved,
                          though it took a bit longer than expected."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Satisfaction Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "5 Stars", value: 65, color: "#10b981" },
                              { name: "4 Stars", value: 25, color: "#3b82f6" },
                              { name: "3 Stars", value: 7, color: "#f59e0b" },
                              { name: "2 Stars", value: 2, color: "#ef4444" },
                              { name: "1 Star", value: 1, color: "#6b7280" },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {[
                              { color: "#10b981" },
                              { color: "#3b82f6" },
                              { color: "#f59e0b" },
                              { color: "#ef4444" },
                              { color: "#6b7280" },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
