import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { campaigns, adSpendData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface MarketingCampaignsProps {
  className?: string;
}

const adSpendColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Spend:{" "}
          <span className="font-medium">${data.amount.toLocaleString()}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Share: <span className="font-medium">{data.value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const MarketingCampaigns = ({ className }: MarketingCampaignsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("roi");

  const filteredCampaigns = campaigns
    .filter((campaign) => {
      const matchesSearch = campaign.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        campaign.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "roi":
          return b.roi - a.roi;
        case "leads":
          return b.leads - a.leads;
        case "reach":
          return b.reach - a.reach;
        case "conversion":
          return b.conversionRate - a.conversionRate;
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={cn("grid gap-4 lg:grid-cols-3", className)}>
      {/* Campaigns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="lg:col-span-2"
      >
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <CardTitle className="flex items-center space-x-2">
              <span>📢</span>
              <span>Marketing Campaign Performance</span>
            </CardTitle>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roi">ROI</SelectItem>
                  <SelectItem value="leads">Leads</SelectItem>
                  <SelectItem value="reach">Reach</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-3">Campaign</th>
                    <th className="text-right font-medium p-3">Reach</th>
                    <th className="text-right font-medium p-3">Leads</th>
                    <th className="text-right font-medium p-3">Conv. Rate</th>
                    <th className="text-right font-medium p-3">ROI</th>
                    <th className="text-center font-medium p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign, index) => (
                    <motion.tr
                      key={campaign.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono">
                        {campaign.reach.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {campaign.leads.toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <span className="font-medium">
                            {campaign.conversionRate}%
                          </span>
                          {campaign.conversionRate > 10 ? (
                            <TrendingUp className="h-3 w-3 text-green-600" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-600" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className="font-bold text-green-600">
                          {campaign.roi}%
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(campaign.status)}
                        >
                          {campaign.status}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ad Spend Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💰</span>
              <span>Ad Spend Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adSpendData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {adSpendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={adSpendColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Spend Breakdown */}
            <div className="space-y-3">
              {adSpendData.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: adSpendColors[index] }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">
                      ${item.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.value}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Spend</span>
                <span className="text-lg font-bold">
                  $
                  {adSpendData
                    .reduce((sum, item) => sum + item.amount, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MarketingCampaigns;
