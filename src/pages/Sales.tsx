import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  Target,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  Users,
  Award,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sales-specific mock data
const salesKPIs = [
  {
    title: "Monthly Revenue",
    value: "$847K",
    target: "$900K",
    trend: "up",
    percentage: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Deals Closed",
    value: "156",
    target: "180",
    trend: "up",
    percentage: "+8.2%",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Pipeline Value",
    value: "$2.4M",
    target: "$2.8M",
    trend: "up",
    percentage: "+15.3%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Avg. Deal Size",
    value: "$5,429",
    target: "$5,000",
    trend: "up",
    percentage: "+3.1%",
    icon: Award,
    color: "text-orange-600",
  },
];

const pipelineStages = [
  { stage: "Prospecting", count: 45, value: 225000, color: "#ef4444" },
  { stage: "Qualification", count: 32, value: 480000, color: "#f97316" },
  { stage: "Proposal", count: 28, value: 672000, color: "#eab308" },
  { stage: "Negotiation", count: 18, value: 540000, color: "#22c55e" },
  { stage: "Closed Won", count: 12, value: 360000, color: "#3b82f6" },
];

const recentDeals = [
  {
    id: "1",
    company: "TechCorp Industries",
    value: 125000,
    stage: "Negotiation",
    probability: 85,
    rep: "Sarah Chen",
    closeDate: "2024-01-15",
    avatar: "SC",
  },
  {
    id: "2",
    company: "Global Dynamics LLC",
    value: 89000,
    stage: "Proposal",
    probability: 70,
    rep: "Michael Torres",
    closeDate: "2024-01-20",
    avatar: "MT",
  },
  {
    id: "3",
    company: "Innovation Partners",
    value: 156000,
    stage: "Qualification",
    probability: 60,
    rep: "Jessica Kim",
    closeDate: "2024-01-25",
    avatar: "JK",
  },
  {
    id: "4",
    company: "Digital Solutions Inc",
    value: 67000,
    stage: "Prospecting",
    probability: 40,
    rep: "David Wilson",
    closeDate: "2024-02-01",
    avatar: "DW",
  },
  {
    id: "5",
    company: "NextGen Systems",
    value: 198000,
    stage: "Negotiation",
    probability: 90,
    rep: "Amanda Rodriguez",
    closeDate: "2024-01-12",
    avatar: "AR",
  },
];

const salesForecast = [
  { month: "Jan", target: 800000, actual: 750000, projected: 820000 },
  { month: "Feb", target: 850000, actual: 0, projected: 880000 },
  { month: "Mar", target: 900000, actual: 0, projected: 920000 },
  { month: "Apr", target: 950000, actual: 0, projected: 980000 },
];

const teamPerformance = [
  { name: "Sarah Chen", deals: 23, revenue: 567000, quota: 500000 },
  { name: "Michael Torres", deals: 19, revenue: 489000, quota: 450000 },
  { name: "Jessica Kim", deals: 21, revenue: 523000, quota: 480000 },
  { name: "David Wilson", deals: 18, revenue: 398000, quota: 420000 },
  { name: "Amanda Rodriguez", deals: 16, revenue: 445000, quota: 400000 },
];

const Sales = () => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Prospecting":
        return "bg-red-100 text-red-800";
      case "Qualification":
        return "bg-orange-100 text-orange-800";
      case "Proposal":
        return "bg-yellow-100 text-yellow-800";
      case "Negotiation":
        return "bg-blue-100 text-blue-800";
      case "Closed Won":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    return "text-red-600";
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
            <h1 className="text-3xl font-bold">Sales Dashboard</h1>
            <p className="text-muted-foreground">
              Track deals, manage pipeline, and optimize sales performance
            </p>
          </div>
          <div className="flex space-x-3">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Deal
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Call
            </Button>
          </div>
        </motion.div>

        {/* Sales KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {salesKPIs.map((kpi, index) => (
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
                      <div className="flex items-baseline space-x-2">
                        <h3 className="text-2xl font-bold">{kpi.value}</h3>
                        <span className="text-xs text-muted-foreground">
                          / {kpi.target}
                        </span>
                      </div>
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

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Pipeline & Deals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sales Pipeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Sales Pipeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pipelineStages.map((stage, index) => (
                      <div key={stage.stage} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: stage.color }}
                            />
                            <span className="font-medium">{stage.stage}</span>
                            <Badge variant="secondary">
                              {stage.count} deals
                            </Badge>
                          </div>
                          <span className="font-bold">
                            ${stage.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              backgroundColor: stage.color,
                              width: `${(stage.value / 2500000) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Deals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Deals</CardTitle>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search deals..."
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDeals.map((deal, index) => (
                      <motion.div
                        key={deal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback className="text-xs">
                              {deal.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{deal.company}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant="secondary"
                                className={getStageColor(deal.stage)}
                              >
                                {deal.stage}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                by {deal.rep}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            ${deal.value.toLocaleString()}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={cn(
                                "text-xs font-medium",
                                getProbabilityColor(deal.probability),
                              )}
                            >
                              {deal.probability}%
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {deal.closeDate}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Forecast & Team */}
          <div className="space-y-6">
            {/* Sales Forecast */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Sales Forecast</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesForecast}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="opacity-30"
                        />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis
                          fontSize={12}
                          tickFormatter={(value) => `$${value / 1000}K`}
                        />
                        <Tooltip
                          formatter={(value: any) => [
                            `$${value.toLocaleString()}`,
                            "",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#94a3b8"
                          strokeDasharray="5 5"
                          name="Target"
                        />
                        <Line
                          type="monotone"
                          dataKey="projected"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Projected"
                        />
                        <Line
                          type="monotone"
                          dataKey="actual"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Actual"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Team Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Team Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamPerformance.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.deals} deals closed
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm">
                              ${member.revenue.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              / ${member.quota.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all duration-500",
                              member.revenue >= member.quota
                                ? "bg-green-500"
                                : "bg-blue-500",
                            )}
                            style={{
                              width: `${Math.min((member.revenue / member.quota) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-20 flex-col space-y-2"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="text-xs">Make Call</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col space-y-2"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="text-xs">Send Email</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col space-y-2"
                    >
                      <Calendar className="h-5 w-5" />
                      <span className="text-xs">Schedule</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col space-y-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="text-xs">Add Note</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sales;
