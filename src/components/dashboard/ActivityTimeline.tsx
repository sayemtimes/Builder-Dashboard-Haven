import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { activityFeed, type ActivityItem } from "@/lib/mockData";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityTimelineProps {
  className?: string;
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "lead":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "ticket":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "proposal":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "deal":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "call":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ActivityTimeline = ({ className }: ActivityTimelineProps) => {
  const [activities, setActivities] = useState<ActivityItem[]>(activityFeed);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to add a new activity
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: ["lead", "ticket", "proposal", "deal", "call"][
            Math.floor(Math.random() * 5)
          ] as any,
          message: "New activity detected",
          user: "System",
          time: "just now",
          icon: "🔔",
        };

        setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setActivities([...activityFeed]);
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.3 }}
      className={className}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Live Activity Feed</span>
            </CardTitle>
            <motion.button
              onClick={handleRefresh}
              className={cn(
                "p-2 rounded-lg hover:bg-accent transition-colors",
                isRefreshing && "animate-spin",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="h-4 w-4" />
            </motion.button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">
              Auto-updates every 10 seconds
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] px-6">
            <div className="space-y-3 pb-6">
              <AnimatePresence mode="popLayout">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Timeline Line */}
                    {index < activities.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-8 bg-border" />
                    )}

                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                      {/* Activity Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                        {activity.icon}
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium leading-tight">
                            {activity.message}
                          </p>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {activity.time}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              getActivityColor(activity.type),
                            )}
                          >
                            {activity.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            by {activity.user}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivityTimeline;
