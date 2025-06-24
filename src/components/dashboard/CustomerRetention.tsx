import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { cohortData, churnReasons } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface CustomerRetentionProps {
  className?: string;
}

const churnColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#6b7280"];

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{data.reason}</p>
        <p className="text-sm text-muted-foreground">
          Percentage: <span className="font-medium">{data.percentage}%</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Count: <span className="font-medium">{data.count}</span>
        </p>
      </div>
    );
  }
  return null;
};

const getRetentionColor = (value: number) => {
  if (value >= 80) return "bg-green-500";
  if (value >= 70) return "bg-yellow-500";
  if (value >= 60) return "bg-orange-500";
  return "bg-red-500";
};

const CustomerRetention = ({ className }: CustomerRetentionProps) => {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-2", className)}>
      {/* Cohort Analysis Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📊</span>
              <span>Cohort Retention Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2">Cohort</th>
                    <th className="text-center font-medium p-2">Month 0</th>
                    <th className="text-center font-medium p-2">Month 1</th>
                    <th className="text-center font-medium p-2">Month 2</th>
                    <th className="text-center font-medium p-2">Month 3</th>
                    <th className="text-center font-medium p-2">Month 4</th>
                    <th className="text-center font-medium p-2">Month 5</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map((row, index) => (
                    <motion.tr
                      key={row.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <td className="p-2 font-medium">{row.month}</td>
                      <td className="p-2 text-center">
                        <span className="inline-flex items-center justify-center w-12 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                          {row.month0}%
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-12 h-6 rounded-full text-white text-xs font-medium",
                            getRetentionColor(row.month1),
                          )}
                        >
                          {row.month1}%
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-12 h-6 rounded-full text-white text-xs font-medium",
                            getRetentionColor(row.month2),
                          )}
                        >
                          {row.month2}%
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-12 h-6 rounded-full text-white text-xs font-medium",
                            getRetentionColor(row.month3),
                          )}
                        >
                          {row.month3}%
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-12 h-6 rounded-full text-white text-xs font-medium",
                            getRetentionColor(row.month4),
                          )}
                        >
                          {row.month4}%
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-12 h-6 rounded-full text-white text-xs font-medium",
                            getRetentionColor(row.month5),
                          )}
                        >
                          {row.month5}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>80%+ retention</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>70-79% retention</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>60-69% retention</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>&lt;60% retention</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Churn Reasons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📉</span>
              <span>Churn Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Pie Chart */}
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={churnReasons}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      animationDuration={1000}
                    >
                      {churnReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={churnColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Churn Reasons List */}
              <div className="space-y-3">
                {churnReasons.map((reason, index) => (
                  <motion.div
                    key={reason.reason}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: churnColors[index] }}
                      />
                      <span className="text-sm font-medium">
                        {reason.reason}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{reason.percentage}%</p>
                      <p className="text-xs text-muted-foreground">
                        {reason.count} customers
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerRetention;
