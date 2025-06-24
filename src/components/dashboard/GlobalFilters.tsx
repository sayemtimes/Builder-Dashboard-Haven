import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Filter, X } from "lucide-react";
import { motion } from "framer-motion";
import { filterOptions } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface GlobalFiltersProps {
  className?: string;
}

const GlobalFilters = ({ className }: GlobalFiltersProps) => {
  const [dateRange, setDateRange] = useState("30d");
  const [region, setRegion] = useState("all");
  const [salesRep, setSalesRep] = useState("all");
  const [segments, setSegments] = useState<string[]>([]);
  const [customDateRange, setCustomDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);

  const handleSegmentToggle = (segment: string) => {
    if (segment === "all") {
      setSegments([]);
      return;
    }

    setSegments((prev) =>
      prev.includes(segment)
        ? prev.filter((s) => s !== segment)
        : [...prev, segment],
    );
  };

  const clearAllFilters = () => {
    setDateRange("30d");
    setRegion("all");
    setSalesRep("all");
    setSegments([]);
    setCustomDateRange({ from: undefined, to: undefined });
  };

  const hasActiveFilters =
    dateRange !== "30d" ||
    region !== "all" ||
    salesRep !== "all" ||
    segments.length > 0 ||
    customDateRange.from ||
    customDateRange.to;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Date Range */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.dateRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Custom Date Range */}
                {dateRange === "custom" && (
                  <Popover
                    open={showCustomCalendar}
                    onOpenChange={setShowCustomCalendar}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full sm:w-60 justify-start text-left font-normal",
                          !customDateRange.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {customDateRange.from ? (
                          customDateRange.to ? (
                            <>
                              {format(customDateRange.from, "LLL dd, y")} -{" "}
                              {format(customDateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(customDateRange.from, "LLL dd, y")
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
                        defaultMonth={customDateRange.from}
                        selected={{
                          from: customDateRange.from,
                          to: customDateRange.to,
                        }}
                        onSelect={(range) => {
                          setCustomDateRange({
                            from: range?.from,
                            to: range?.to,
                          });
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </div>

              {/* Region */}
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sales Rep */}
              <Select value={salesRep} onValueChange={setSalesRep}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sales Rep" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.salesReps.map((rep) => (
                    <SelectItem key={rep.value} value={rep.value}>
                      {rep.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Customer Segments */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-40 justify-between"
                  >
                    <span className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Segments
                      {segments.length > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-2 h-5 w-5 p-0 flex items-center justify-center"
                        >
                          {segments.length}
                        </Badge>
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="start">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Customer Segments</h4>
                    {filterOptions.segments.map((segment) => (
                      <div
                        key={segment.value}
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-accent"
                        onClick={() => handleSegmentToggle(segment.value)}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded border-2 border-primary",
                            segments.includes(segment.value) ||
                              (segment.value === "all" && segments.length === 0)
                              ? "bg-primary"
                              : "bg-background",
                          )}
                        />
                        <span className="text-sm">{segment.label}</span>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Clear Filters & Active Filters */}
            <div className="flex items-center space-x-3">
              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Active:</span>
                  <div className="flex space-x-1">
                    {dateRange !== "30d" && (
                      <Badge variant="secondary" className="text-xs">
                        {
                          filterOptions.dateRanges.find(
                            (r) => r.value === dateRange,
                          )?.label
                        }
                      </Badge>
                    )}
                    {region !== "all" && (
                      <Badge variant="secondary" className="text-xs">
                        {
                          filterOptions.regions.find((r) => r.value === region)
                            ?.label
                        }
                      </Badge>
                    )}
                    {salesRep !== "all" && (
                      <Badge variant="secondary" className="text-xs">
                        {
                          filterOptions.salesReps.find(
                            (r) => r.value === salesRep,
                          )?.label
                        }
                      </Badge>
                    )}
                    {segments.map((segment) => (
                      <Badge
                        key={segment}
                        variant="secondary"
                        className="text-xs"
                      >
                        {
                          filterOptions.segments.find(
                            (s) => s.value === segment,
                          )?.label
                        }
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Button */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GlobalFilters;
