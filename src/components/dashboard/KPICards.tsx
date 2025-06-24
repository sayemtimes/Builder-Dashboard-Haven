import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { kpiData, type KPIData } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface KPICardsProps {
  className?: string;
}

const KPICard = ({ data, index }: { data: KPIData; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {data.title}
              </p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold tracking-tight">
                  {data.value}
                </h3>
                <div
                  className={cn(
                    "flex items-center space-x-1 text-xs font-medium",
                    data.trend === "up" ? "text-green-600" : "text-red-600",
                  )}
                >
                  {data.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{data.percentage}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {data.description}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <span className="text-xl">{data.icon}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const KPICards = ({ className }: KPICardsProps) => {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-5", className)}>
      {kpiData.map((data, index) => (
        <KPICard key={data.id} data={data} index={index} />
      ))}
    </div>
  );
};

export default KPICards;
