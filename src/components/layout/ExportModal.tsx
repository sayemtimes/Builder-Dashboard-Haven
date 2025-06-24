import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  Table,
  Image,
  Mail,
  Calendar as CalendarIcon,
  Clock,
  Filter,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  formats: string[];
  estimatedSize: string;
  fields: string[];
}

const exportOptions: ExportOption[] = [
  {
    id: "customers",
    name: "Customer Data",
    description:
      "Complete customer records, contact info, and interaction history",
    icon: FileText,
    formats: ["CSV", "Excel", "PDF"],
    estimatedSize: "2.4 MB",
    fields: [
      "Customer ID",
      "Company Name",
      "Contact Person",
      "Email",
      "Phone",
      "Address",
      "Registration Date",
      "Last Activity",
      "Total Revenue",
      "Status",
    ],
  },
  {
    id: "sales",
    name: "Sales Reports",
    description: "Deal pipeline, revenue data, and sales performance metrics",
    icon: Table,
    formats: ["CSV", "Excel", "PDF"],
    estimatedSize: "1.8 MB",
    fields: [
      "Deal ID",
      "Customer",
      "Sales Rep",
      "Deal Value",
      "Stage",
      "Probability",
      "Created Date",
      "Expected Close",
      "Actual Close",
      "Source",
    ],
  },
  {
    id: "marketing",
    name: "Marketing Analytics",
    description: "Campaign performance, lead sources, and conversion data",
    icon: Image,
    formats: ["CSV", "Excel", "PDF"],
    estimatedSize: "3.1 MB",
    fields: [
      "Campaign ID",
      "Campaign Name",
      "Channel",
      "Start Date",
      "End Date",
      "Budget",
      "Spend",
      "Impressions",
      "Clicks",
      "Conversions",
      "ROI",
    ],
  },
  {
    id: "support",
    name: "Support Tickets",
    description:
      "Customer support history, ticket resolution, and satisfaction",
    icon: Mail,
    formats: ["CSV", "Excel", "PDF"],
    estimatedSize: "956 KB",
    fields: [
      "Ticket ID",
      "Customer",
      "Subject",
      "Category",
      "Priority",
      "Status",
      "Assignee",
      "Created",
      "Resolved",
      "Satisfaction",
    ],
  },
];

interface ExportModalProps {
  children: React.ReactNode;
}

const ExportModal = ({ children }: ExportModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [filters, setFilters] = useState({
    includeArchived: false,
    includeDeleted: false,
    applyFilters: true,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [scheduledExport, setScheduledExport] = useState({
    enabled: false,
    frequency: "weekly",
    email: "",
    notes: "",
  });

  const selectedExportOption = exportOptions.find(
    (opt) => opt.id === selectedOption,
  );

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
  };

  const selectAllFields = () => {
    if (selectedExportOption) {
      setSelectedFields(selectedExportOption.fields);
    }
  };

  const clearAllFields = () => {
    setSelectedFields([]);
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetModal = () => {
    setSelectedOption("");
    setSelectedFormat("");
    setSelectedFields([]);
    setIsExporting(false);
    setExportProgress(0);
    setExportComplete(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetModal, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Data</span>
          </DialogTitle>
          <DialogDescription>
            Export your CRM data in various formats for analysis, backup, or
            reporting purposes.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="export" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">Export Now</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Export</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-6">
            {/* Export Options */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Select Data Type</Label>
              <div className="grid grid-cols-2 gap-4">
                {exportOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all",
                      selectedOption === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                    )}
                    onClick={() => {
                      setSelectedOption(option.id);
                      setSelectedFields(option.fields.slice(0, 5)); // Select first 5 by default
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <option.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{option.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {option.estimatedSize}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {option.fields.length} fields
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {selectedExportOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Format Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Export Format</Label>
                  <div className="flex space-x-2">
                    {selectedExportOption.formats.map((format) => (
                      <Button
                        key={format}
                        variant={
                          selectedFormat === format ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedFormat(format)}
                      >
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Field Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Select Fields
                    </Label>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={selectAllFields}
                      >
                        Select All
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFields}
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                    {selectedExportOption.fields.map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox
                          id={field}
                          checked={selectedFields.includes(field)}
                          onCheckedChange={() => handleFieldToggle(field)}
                        />
                        <Label htmlFor={field} className="text-sm">
                          {field}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedFields.length} of{" "}
                    {selectedExportOption.fields.length} fields selected
                  </p>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Date Range</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            "Pick a date range"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange.from}
                          selected={{
                            from: dateRange.from,
                            to: dateRange.to,
                          }}
                          onSelect={(range) => {
                            setDateRange({
                              from: range?.from,
                              to: range?.to,
                            });
                          }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Filters */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Additional Options
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="archived"
                        checked={filters.includeArchived}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            includeArchived: checked as boolean,
                          }))
                        }
                      />
                      <Label htmlFor="archived" className="text-sm">
                        Include archived records
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="deleted"
                        checked={filters.includeDeleted}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            includeDeleted: checked as boolean,
                          }))
                        }
                      />
                      <Label htmlFor="deleted" className="text-sm">
                        Include deleted records
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="filters"
                        checked={filters.applyFilters}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            applyFilters: checked as boolean,
                          }))
                        }
                      />
                      <Label htmlFor="filters" className="text-sm">
                        Apply current dashboard filters
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Export Progress */}
                <AnimatePresence>
                  {isExporting && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                        <span className="text-sm">Exporting data...</span>
                      </div>
                      <Progress value={exportProgress} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {exportProgress}% complete
                      </p>
                    </motion.div>
                  )}

                  {exportComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-lg bg-green-50 border border-green-200"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">
                            Export completed successfully!
                          </p>
                          <p className="text-sm text-green-600">
                            Your file has been generated and is ready for
                            download.
                          </p>
                        </div>
                      </div>
                      <Button className="mt-3" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download File
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enable-schedule"
                  checked={scheduledExport.enabled}
                  onCheckedChange={(checked) =>
                    setScheduledExport((prev) => ({
                      ...prev,
                      enabled: checked as boolean,
                    }))
                  }
                />
                <Label
                  htmlFor="enable-schedule"
                  className="text-base font-medium"
                >
                  Enable Scheduled Export
                </Label>
              </div>

              {scheduledExport.enabled && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pl-6"
                >
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select
                      value={scheduledExport.frequency}
                      onValueChange={(value) =>
                        setScheduledExport((prev) => ({
                          ...prev,
                          frequency: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="Enter email for delivery"
                      value={scheduledExport.email}
                      onChange={(e) =>
                        setScheduledExport((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Notes (Optional)</Label>
                    <Textarea
                      placeholder="Add any notes about this scheduled export..."
                      value={scheduledExport.notes}
                      onChange={(e) =>
                        setScheduledExport((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {selectedExportOption &&
            selectedFormat &&
            selectedFields.length > 0 &&
            !exportComplete && (
              <Button onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export {selectedFormat}
                  </>
                )}
              </Button>
            )}
          {exportComplete && <Button onClick={handleClose}>Close</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
