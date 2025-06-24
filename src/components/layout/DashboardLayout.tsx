import { ReactNode } from "react";
import Navigation from "./Navigation";
import AIAssistant from "../dashboard/AIAssistant";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navigation />
      <main className="container mx-auto px-4 py-6 space-y-6">{children}</main>
      <AIAssistant />
    </div>
  );
};

export default DashboardLayout;
