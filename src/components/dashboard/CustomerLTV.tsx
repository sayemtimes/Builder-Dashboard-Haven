import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { cltvSegments, highValueClients } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerLTVProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          Avg. CLTV:{" "}
          <span className="font-medium">${data.avgCLTV.toLocaleString()}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Customers:{" "}
          <span className="font-medium">{data.customers.toLocaleString()}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Growth: <span className="font-medium">{data.growthRate}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const getSegmentColor = (segment: string) => {
  switch (segment) {
    case "Enterprise":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "SME":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Individual":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const CustomerLTV = ({ className }: CustomerLTVProps) => {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-2", className)}>
      {/* CLTV by Segment Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💎</span>
              <span>Customer Lifetime Value by Segment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cltvSegments}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="segment"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="avgCLTV"
                    radius={[4, 4, 0, 0]}
                    fill="#3b82f6"
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Segment Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {cltvSegments.map((segment, index) => (
                <motion.div
                  key={segment.segment}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-accent/50 text-center"
                >
                  <Badge
                    variant="secondary"
                    className={cn("mb-2", getSegmentColor(segment.segment))}
                  >
                    {segment.segment}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {segment.customers.toLocaleString()} customers
                  </p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {segment.growthRate > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className="text-xs font-medium">
                      {segment.growthRate}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* High Value Clients */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span>Top 10 High Value Clients</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {highValueClients.map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      {index < 3 && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{client.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            getSegmentColor(client.segment),
                          )}
                        >
                          {client.segment}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {client.tenure}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      ${client.cltv.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${client.monthlySpend.toLocaleString()}/mo
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    $
                    {highValueClients
                      .reduce((sum, client) => sum + client.cltv, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total CLTV</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    $
                    {highValueClients
                      .reduce((sum, client) => sum + client.monthlySpend, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Monthly Revenue
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerLTV;
