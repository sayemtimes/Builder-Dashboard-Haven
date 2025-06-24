import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Check, X, Settings, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  user?: {
    name: string;
    avatar: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Deal Closed",
    message: "Sarah Chen closed a $45,000 deal with TechCorp Industries",
    timestamp: "2 minutes ago",
    read: false,
    user: { name: "Sarah Chen", avatar: "SC" },
  },
  {
    id: "2",
    type: "warning",
    title: "High Priority Ticket",
    message: "New support ticket #456 requires immediate attention",
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Campaign Performance",
    message: "Q4 Holiday Campaign exceeded ROI target by 15%",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: "4",
    type: "success",
    title: "New Lead",
    message: "Qualified lead from Global Dynamics LLC added to pipeline",
    timestamp: "1 hour ago",
    read: true,
    user: { name: "Michael Torres", avatar: "MT" },
  },
  {
    id: "5",
    type: "error",
    title: "Integration Issue",
    message: "Salesforce sync failed. Check connection settings.",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "Report Generated",
    message: "Monthly sales report is ready for download",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "7",
    type: "warning",
    title: "Quota Alert",
    message: "David Wilson is at 85% of monthly quota with 5 days remaining",
    timestamp: "4 hours ago",
    read: true,
  },
  {
    id: "8",
    type: "success",
    title: "Customer Feedback",
    message: "New 5-star review received from Innovation Partners",
    timestamp: "6 hours ago",
    read: true,
  },
];

const NotificationDropdown = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "error":
        return "border-l-red-500 bg-red-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0" sideOffset={5}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread notifications
            </p>
          </div>
          <div className="flex space-x-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[400px]">
          <div className="p-2">
            <AnimatePresence>
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "relative p-3 mb-2 rounded-lg border-l-4 transition-all duration-200 cursor-pointer hover:shadow-sm",
                      getNotificationColor(notification.type),
                      !notification.read && "bg-opacity-100",
                      notification.read && "bg-opacity-50 opacity-75",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          {notification.user ? (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {notification.user.avatar}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm">
                                {getNotificationIcon(notification.type)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.timestamp}
                          </p>
                          {notification.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 text-xs h-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                notification.action?.onClick();
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={() => setIsOpen(false)}
              >
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
