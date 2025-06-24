import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, Download, Menu, X, BarChart3 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import NotificationDropdown from "./NotificationDropdown";
import ExportModal from "./ExportModal";
import ProfileDropdown from "./ProfileDropdown";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Sales", href: "/sales" },
    { label: "Marketing", href: "/marketing" },
    { label: "Support", href: "/support" },
    { label: "Reports", href: "/reports" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CRM Analytics
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:ml-10 md:space-x-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Export Modal */}
          <ExportModal>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </ExportModal>

          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* User Profile */}
          <ProfileDropdown />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-accent",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-4 pt-4 border-t">
              <ExportModal>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Reports
                </Button>
              </ExportModal>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
