import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { salesData, salesReps, filterOptions } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface SalesPerformanceProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: pld.color }}
            />
            <span className="text-muted-foreground">{pld.dataKey}:</span>
            <span className="font-medium">${pld.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const SalesPerformance = ({ className }: SalesPerformanceProps) => {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {/* Revenue Trend Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <span>📈</span>
                <span>Revenue Trend</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Select defaultValue="year">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.dateRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="month"
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="currentYear"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Current Year"
                  />
                  <Line
                    type="monotone"
                    dataKey="previousYear"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#94a3b8", r: 3 }}
                    name="Previous Year"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Sales Reps */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏆</span>
              <span>Top Sales Representatives</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesReps.map((rep, index) => (
                <motion.div
                  key={rep.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {rep.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{rep.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {rep.deals} deals closed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      ${rep.revenue.toLocaleString()}
                    </p>
                    <div className="w-20 h-2 bg-secondary rounded-full mt-1">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${(rep.revenue / salesReps[0].revenue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SalesPerformance;
