import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Target,
  DollarSign,
  Calendar as CalendarIcon,
  Users,
  Eye,
  TrendingUp,
  Building,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage:
    | "Prospecting"
    | "Qualification"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost";
  probability: number;
  assignee: string;
  source: string;
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  createdDate: Date;
  lastActivity: Date;
  description: string;
  nextAction: string;
}

const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Enterprise CRM License",
    company: "TechCorp Industries",
    value: 125000,
    stage: "Negotiation",
    probability: 85,
    assignee: "Sarah Chen",
    source: "Inbound",
    expectedCloseDate: new Date("2024-02-15"),
    createdDate: new Date("2023-12-01"),
    lastActivity: new Date("2024-01-15"),
    description: "Large enterprise deal for comprehensive CRM solution",
    nextAction: "Schedule final pricing discussion with decision makers",
  },
  {
    id: "2",
    title: "Marketing Automation Package",
    company: "Global Dynamics LLC",
    value: 89000,
    stage: "Proposal",
    probability: 70,
    assignee: "Michael Torres",
    source: "Referral",
    expectedCloseDate: new Date("2024-02-20"),
    createdDate: new Date("2023-11-15"),
    lastActivity: new Date("2024-01-14"),
    description: "Marketing automation solution for growing business",
    nextAction: "Follow up on proposal feedback",
  },
  {
    id: "3",
    title: "Sales Analytics Suite",
    company: "Innovation Partners",
    value: 156000,
    stage: "Qualification",
    probability: 60,
    assignee: "Jessica Kim",
    source: "Website",
    expectedCloseDate: new Date("2024-03-01"),
    createdDate: new Date("2024-01-05"),
    lastActivity: new Date("2024-01-12"),
    description: "Advanced analytics and reporting solution",
    nextAction: "Conduct needs assessment meeting",
  },
  {
    id: "4",
    title: "Customer Support Platform",
    company: "Digital Solutions Inc",
    value: 67000,
    stage: "Prospecting",
    probability: 40,
    assignee: "David Wilson",
    source: "Cold Outreach",
    expectedCloseDate: new Date("2024-03-15"),
    createdDate: new Date("2024-01-10"),
    lastActivity: new Date("2024-01-10"),
    description: "Support ticketing and customer service solution",
    nextAction: "Schedule discovery call",
  },
];

interface DealsCRUDProps {
  children: React.ReactNode;
}

const DealsCRUD = ({ children }: DealsCRUDProps) => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const [formData, setFormData] = useState<Partial<Deal>>({
    title: "",
    company: "",
    value: 0,
    stage: "Prospecting",
    probability: 25,
    assignee: "",
    source: "",
    expectedCloseDate: new Date(),
    description: "",
    nextAction: "",
  });

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || deal.stage === stageFilter;
    const matchesAssignee =
      assigneeFilter === "all" || deal.assignee === assigneeFilter;
    return matchesSearch && matchesStage && matchesAssignee;
  });

  const handleCreate = () => {
    const newDeal: Deal = {
      id: Date.now().toString(),
      ...(formData as Deal),
      createdDate: new Date(),
      lastActivity: new Date(),
    };
    setDeals([...deals, newDeal]);
    setIsCreateOpen(false);
    resetForm();
    toast({
      title: "Deal Created",
      description: `${newDeal.title} has been added to the pipeline.`,
    });
  };

  const handleEdit = () => {
    if (!selectedDeal) return;
    const updatedDeals = deals.map((deal) =>
      deal.id === selectedDeal.id
        ? { ...deal, ...formData, lastActivity: new Date() }
        : deal,
    );
    setDeals(updatedDeals);
    setIsEditOpen(false);
    setSelectedDeal(null);
    toast({
      title: "Deal Updated",
      description: `${formData.title} has been updated successfully.`,
    });
  };

  const handleDelete = () => {
    if (!selectedDeal) return;
    const updatedDeals = deals.filter((deal) => deal.id !== selectedDeal.id);
    setDeals(updatedDeals);
    setIsDeleteOpen(false);
    setSelectedDeal(null);
    toast({
      title: "Deal Deleted",
      description: `${selectedDeal.title} has been removed from the pipeline.`,
      variant: "destructive",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      value: 0,
      stage: "Prospecting",
      probability: 25,
      assignee: "",
      source: "",
      expectedCloseDate: new Date(),
      description: "",
      nextAction: "",
    });
  };

  const openEdit = (deal: Deal) => {
    setSelectedDeal(deal);
    setFormData(deal);
    setIsEditOpen(true);
  };

  const openView = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsViewOpen(true);
  };

  const openDelete = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDeleteOpen(true);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Prospecting":
        return "bg-red-100 text-red-800";
      case "Qualification":
        return "bg-orange-100 text-orange-800";
      case "Proposal":
        return "bg-yellow-100 text-yellow-800";
      case "Negotiation":
        return "bg-blue-100 text-blue-800";
      case "Closed Won":
        return "bg-green-100 text-green-800";
      case "Closed Lost":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const uniqueAssignees = Array.from(
    new Set(deals.map((deal) => deal.assignee)),
  );

  return (
    <>
      <Dialog
        open={isCreateOpen || isEditOpen || isViewOpen || isDeleteOpen}
        onOpenChange={() => {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setIsViewOpen(false);
          setIsDeleteOpen(false);
          setSelectedDeal(null);
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Deal Pipeline Management</span>
            </DialogTitle>
            <DialogDescription>
              Manage your sales pipeline - track deals, update stages, and
              monitor progress.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="Prospecting">Prospecting</SelectItem>
                  <SelectItem value="Qualification">Qualification</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closed Won">Closed Won</SelectItem>
                  <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  {uniqueAssignees.map((assignee) => (
                    <SelectItem key={assignee} value={assignee}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Deal
              </Button>
            </div>

            {/* Pipeline Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-2xl font-bold text-blue-600">
                  {filteredDeals.length}
                </p>
                <p className="text-sm text-blue-600">Total Deals</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-2xl font-bold text-green-600">
                  $
                  {filteredDeals
                    .reduce((sum, deal) => sum + deal.value, 0)
                    .toLocaleString()}
                </p>
                <p className="text-sm text-green-600">Pipeline Value</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-2xl font-bold text-purple-600">
                  $
                  {Math.round(
                    filteredDeals.reduce((sum, deal) => sum + deal.value, 0) /
                      filteredDeals.length || 0,
                  ).toLocaleString()}
                </p>
                <p className="text-sm text-purple-600">Avg Deal Size</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    filteredDeals.reduce(
                      (sum, deal) => sum + deal.probability,
                      0,
                    ) / filteredDeals.length || 0,
                  )}
                  %
                </p>
                <p className="text-sm text-orange-600">Avg Probability</p>
              </div>
            </div>

            {/* Deals Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Expected Close</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredDeals.map((deal, index) => (
                      <motion.tr
                        key={deal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-accent/50"
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{deal.title}</p>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Building className="h-3 w-3" />
                              <span>{deal.company}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span className="font-medium">
                              ${deal.value.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStageColor(deal.stage)}
                          >
                            {deal.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span
                              className={cn(
                                "font-medium",
                                getProbabilityColor(deal.probability),
                              )}
                            >
                              {deal.probability}%
                            </span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: `${deal.probability}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {deal.assignee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{deal.assignee}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm">
                            <CalendarIcon className="h-3 w-3" />
                            <span>
                              {format(deal.expectedCloseDate, "MMM dd, yyyy")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openView(deal)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(deal)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDelete(deal)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Deal Modal */}
      <Dialog
        open={isCreateOpen || isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setIsEditOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isCreateOpen ? "Create New Deal" : "Edit Deal"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Deal Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter deal title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Enter company name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Deal Value ($)</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: Number(e.target.value) })
                  }
                  placeholder="Enter deal value"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="probability">Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      probability: Number(e.target.value),
                    })
                  }
                  placeholder="Enter probability"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Stage</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) =>
                    setFormData({ ...formData, stage: value as Deal["stage"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prospecting">Prospecting</SelectItem>
                    <SelectItem value="Qualification">Qualification</SelectItem>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                    <SelectItem value="Closed Won">Closed Won</SelectItem>
                    <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) =>
                    setFormData({ ...formData, assignee: e.target.value })
                  }
                  placeholder="Enter assignee name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) =>
                    setFormData({ ...formData, source: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inbound">Inbound</SelectItem>
                    <SelectItem value="Outbound">Outbound</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.expectedCloseDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.expectedCloseDate ? (
                        format(formData.expectedCloseDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.expectedCloseDate}
                      onSelect={(date) =>
                        setFormData({ ...formData, expectedCloseDate: date! })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter deal description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextAction">Next Action</Label>
              <Input
                id="nextAction"
                value={formData.nextAction}
                onChange={(e) =>
                  setFormData({ ...formData, nextAction: e.target.value })
                }
                placeholder="Enter next action required"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={isCreateOpen ? handleCreate : handleEdit}>
              {isCreateOpen ? "Create Deal" : "Update Deal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Deal Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Deal Details</DialogTitle>
          </DialogHeader>
          {selectedDeal && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedDeal.title}</h3>
                  <p className="text-muted-foreground flex items-center space-x-1">
                    <Building className="h-4 w-4" />
                    <span>{selectedDeal.company}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${selectedDeal.value.toLocaleString()}
                  </p>
                  <Badge
                    variant="secondary"
                    className={getStageColor(selectedDeal.stage)}
                  >
                    {selectedDeal.stage}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Probability:</span>
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={cn(
                          "font-bold",
                          getProbabilityColor(selectedDeal.probability),
                        )}
                      >
                        {selectedDeal.probability}%
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${selectedDeal.probability}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Assignee:</span>
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {selectedDeal.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedDeal.assignee}</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Source:</p>
                    <p className="text-muted-foreground">
                      {selectedDeal.source}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Expected Close Date:</span>
                    </p>
                    <p className="text-muted-foreground">
                      {format(selectedDeal.expectedCloseDate, "PPP")}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Created:</p>
                    <p className="text-muted-foreground">
                      {format(selectedDeal.createdDate, "PPP")}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Last Activity:</p>
                    <p className="text-muted-foreground">
                      {format(selectedDeal.lastActivity, "PPP")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-medium">Description:</p>
                  <p className="text-muted-foreground">
                    {selectedDeal.description}
                  </p>
                </div>

                <div>
                  <p className="font-medium">Next Action:</p>
                  <p className="text-muted-foreground">
                    {selectedDeal.nextAction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Deal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedDeal?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Deal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealsCRUD;
