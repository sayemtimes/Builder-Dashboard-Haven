import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { integrations } from "@/lib/mockData";
import { Settings, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationStatusProps {
  className?: string;
}

const IntegrationStatus = ({ className }: IntegrationStatusProps) => {
  const connectedCount = integrations.filter(
    (i) => i.status === "connected",
  ).length;
  const totalCount = integrations.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className={className}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <span>🔗</span>
              <span>Integration Status</span>
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              {connectedCount} of {totalCount} connected
            </div>
            <div className="w-16 h-2 bg-secondary rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(connectedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md",
                  integration.status === "connected"
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                    : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20",
                )}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{integration.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{integration.name}</p>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs mt-1",
                          integration.status === "connected"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                        )}
                      >
                        {integration.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    {integration.status === "connected" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <p className="font-bold text-green-600">{connectedCount}</p>
                <p className="text-muted-foreground">Connected</p>
              </div>
              <div>
                <p className="font-bold text-red-600">
                  {totalCount - connectedCount}
                </p>
                <p className="text-muted-foreground">Disconnected</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntegrationStatus;
