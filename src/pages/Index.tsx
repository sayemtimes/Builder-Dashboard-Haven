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
import { motion } from "framer-motion";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            CRM Analytics Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into your customer relationships, sales
            performance, and business growth metrics. Everything you need to
            make data-driven decisions.
          </p>
        </motion.div>

        {/* Global Filters */}
        <GlobalFilters />

        {/* KPI Cards Row */}
        <KPICards />

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
              <span>Weekly auto email reports enabled</span>
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
