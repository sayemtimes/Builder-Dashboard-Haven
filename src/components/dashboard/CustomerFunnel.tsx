import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Cell,
  Tooltip,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";
import { funnelData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface CustomerFunnelProps {
  className?: string;
}

const colors = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#6b7280", // gray-500
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{data.stage}</p>
        <p className="text-sm text-muted-foreground">
          Customers:{" "}
          <span className="font-medium">{data.count.toLocaleString()}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Conversion: <span className="font-medium">{data.conversion}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomerFunnel = ({ className }: CustomerFunnelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={className}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🔄</span>
            <span>Customer Acquisition Funnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="customers"
                  data={funnelData}
                  isAnimationActive={true}
                  animationDuration={1000}
                >
                  <LabelList
                    position="center"
                    fill="#fff"
                    stroke="none"
                    fontSize={14}
                    fontWeight="bold"
                    formatter={(value: number, entry: any) =>
                      `${entry.stage}\n${value.toLocaleString()}`
                    }
                  />
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Rates */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="text-center p-2">
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: colors[index] }}
                />
                <p className="text-xs font-medium">{stage.stage}</p>
                <p className="text-xs text-muted-foreground">
                  {stage.customers.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerFunnel;
