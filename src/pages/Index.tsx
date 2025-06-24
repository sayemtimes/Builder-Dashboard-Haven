import DashboardLayout from "@/components/layout/DashboardLayout";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import KPICards from "@/components/dashboard/KPICards";
import CustomerFunnel from "@/components/dashboard/CustomerFunnel";
import SalesPerformance from "@/components/dashboard/SalesPerformance";
import CustomerRetention from "@/components/dashboard/CustomerRetention";
import MarketingCampaigns from "@/components/dashboard/MarketingCampaigns";
import SupportTickets from "@/components/dashboard/SupportTickets";
import CustomerLTV from "@/components/dashboard/CustomerLTV";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import IntegrationStatus from "@/components/dashboard/IntegrationStatus";
import CustomerCRUD from "@/components/crud/CustomerCRUD";
import DealsCRUD from "@/components/crud/DealsCRUD";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  BarChart3,
  Phone,
  Calendar,
  FileText,
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header with Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              CRM Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time insights into your customer relationships, sales
              performance, and business growth metrics.
            </p>
          </div>
          <div className="flex space-x-3">
            <CustomerCRUD>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </CustomerCRUD>
            <DealsCRUD>
              <Button variant="outline">
                <Target className="mr-2 h-4 w-4" />
                New Deal
              </Button>
            </DealsCRUD>
          </div>
        </motion.div>

        {/* Global Filters */}
        <GlobalFilters />

        {/* KPI Cards Row */}
        <KPICards />

        {/* Quick Actions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <CustomerCRUD>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2 w-full"
                  >
                    <Users className="h-6 w-6" />
                    <span>Manage Customers</span>
                  </Button>
                </CustomerCRUD>
                <DealsCRUD>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2 w-full"
                  >
                    <Target className="h-6 w-6" />
                    <span>Pipeline</span>
                  </Button>
                </DealsCRUD>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Campaigns</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Phone className="h-6 w-6" />
                  <span>Support</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Left Column - Main Charts (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Customer Funnel */}
            <CustomerFunnel />

            {/* Sales Performance */}
            <SalesPerformance />

            {/* Customer Retention & Churn */}
            <CustomerRetention />

            {/* Marketing Campaigns */}
            <MarketingCampaigns />

            {/* Support Tickets */}
            <SupportTickets />

            {/* Customer Lifetime Value */}
            <CustomerLTV />
          </div>

          {/* Right Sidebar (1 column) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Real-time Activity Timeline */}
            <ActivityTimeline />

            {/* Integration Status */}
            <IntegrationStatus />
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="text-center py-8 border-t border-border/50"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live data updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span>Full CRUD operations enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
