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
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  lastActivity: string;
  totalRevenue: number;
  status: "Active" | "Inactive" | "Prospect" | "Churned";
  segment: "Enterprise" | "SME" | "Individual";
  notes: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    companyName: "TechCorp Industries",
    contactPerson: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94105",
    registrationDate: "2022-03-15",
    lastActivity: "2024-01-15",
    totalRevenue: 125000,
    status: "Active",
    segment: "Enterprise",
    notes: "High-value client with potential for expansion",
  },
  {
    id: "2",
    companyName: "Global Dynamics LLC",
    contactPerson: "Sarah Johnson",
    email: "sarah.j@globaldynamics.com",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, New York, NY 10001",
    registrationDate: "2022-07-22",
    lastActivity: "2024-01-14",
    totalRevenue: 89000,
    status: "Active",
    segment: "SME",
    notes: "Regular customer with good payment history",
  },
  {
    id: "3",
    companyName: "Innovation Partners",
    contactPerson: "Mike Chen",
    email: "mike@innovationpartners.com",
    phone: "+1 (555) 456-7890",
    address: "789 Innovation Blvd, Austin, TX 73301",
    registrationDate: "2023-01-10",
    lastActivity: "2024-01-12",
    totalRevenue: 156000,
    status: "Active",
    segment: "Enterprise",
    notes: "Fast-growing startup with high potential",
  },
  {
    id: "4",
    companyName: "Digital Solutions Inc",
    contactPerson: "Lisa Park",
    email: "lisa.park@digitalsolutions.com",
    phone: "+1 (555) 321-0987",
    address: "321 Digital Way, Seattle, WA 98101",
    registrationDate: "2023-05-18",
    lastActivity: "2024-01-10",
    totalRevenue: 67000,
    status: "Prospect",
    segment: "SME",
    notes: "Interested in our premium package",
  },
  {
    id: "5",
    companyName: "NextGen Systems",
    contactPerson: "Robert Wilson",
    email: "robert@nextgensystems.com",
    phone: "+1 (555) 654-3210",
    address: "654 Future St, Boston, MA 02101",
    registrationDate: "2023-09-03",
    lastActivity: "2024-01-08",
    totalRevenue: 198000,
    status: "Active",
    segment: "Enterprise",
    notes: "Long-term contract, very satisfied customer",
  },
];

interface CustomerCRUDProps {
  children: React.ReactNode;
}

const CustomerCRUD = ({ children }: CustomerCRUDProps) => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState("all");

  const [formData, setFormData] = useState<Partial<Customer>>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    status: "Prospect",
    segment: "SME",
    notes: "",
  });

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesSegment =
      segmentFilter === "all" || customer.segment === segmentFilter;
    return matchesSearch && matchesStatus && matchesSegment;
  });

  const handleCreate = () => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...(formData as Customer),
      registrationDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString().split("T")[0],
      totalRevenue: 0,
    };
    setCustomers([...customers, newCustomer]);
    setIsCreateOpen(false);
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      status: "Prospect",
      segment: "SME",
      notes: "",
    });
    toast({
      title: "Customer Created",
      description: `${newCustomer.companyName} has been added successfully.`,
    });
  };

  const handleEdit = () => {
    if (!selectedCustomer) return;
    const updatedCustomers = customers.map((customer) =>
      customer.id === selectedCustomer.id
        ? { ...customer, ...formData }
        : customer,
    );
    setCustomers(updatedCustomers);
    setIsEditOpen(false);
    setSelectedCustomer(null);
    toast({
      title: "Customer Updated",
      description: `${formData.companyName} has been updated successfully.`,
    });
  };

  const handleDelete = () => {
    if (!selectedCustomer) return;
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== selectedCustomer.id,
    );
    setCustomers(updatedCustomers);
    setIsDeleteOpen(false);
    setSelectedCustomer(null);
    toast({
      title: "Customer Deleted",
      description: `${selectedCustomer.companyName} has been removed.`,
      variant: "destructive",
    });
  };

  const openEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData(customer);
    setIsEditOpen(true);
  };

  const openView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const openDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Prospect":
        return "bg-blue-100 text-blue-800";
      case "Churned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800";
      case "SME":
        return "bg-blue-100 text-blue-800";
      case "Individual":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Dialog
        open={isCreateOpen || isEditOpen || isViewOpen || isDeleteOpen}
        onOpenChange={() => {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setIsViewOpen(false);
          setIsDeleteOpen(false);
          setSelectedCustomer(null);
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Customer Management</span>
            </DialogTitle>
            <DialogDescription>
              Manage your customer database - create, view, edit, and organize
              customer information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Churned">Churned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={segmentFilter} onValueChange={setSegmentFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="SME">SME</SelectItem>
                  <SelectItem value="Individual">Individual</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>

            {/* Customer Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredCustomers.map((customer, index) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-accent/50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {customer.companyName
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {customer.companyName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {customer.contactPerson}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1 text-sm">
                              <Mail className="h-3 w-3" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Phone className="h-3 w-3" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(customer.status)}
                          >
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getSegmentColor(customer.segment)}
                          >
                            {customer.segment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span className="font-medium">
                              ${customer.totalRevenue.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{customer.lastActivity}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openView(customer)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDelete(customer)}
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

      {/* Create/Edit Customer Modal */}
      <Dialog
        open={isCreateOpen || isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setIsEditOpen(false);
            setFormData({
              companyName: "",
              contactPerson: "",
              email: "",
              phone: "",
              address: "",
              status: "Prospect",
              segment: "SME",
              notes: "",
            });
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isCreateOpen ? "Create New Customer" : "Edit Customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  placeholder="Enter contact person"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as Customer["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                    <SelectItem value="Churned">Churned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment">Segment</Label>
                <Select
                  value={formData.segment}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      segment: value as Customer["segment"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                    <SelectItem value="SME">SME</SelectItem>
                    <SelectItem value="Individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Enter notes"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={isCreateOpen ? handleCreate : handleEdit}>
              {isCreateOpen ? "Create Customer" : "Update Customer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Customer Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedCustomer.companyName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedCustomer.companyName}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedCustomer.contactPerson}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(selectedCustomer.status)}
                    >
                      {selectedCustomer.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getSegmentColor(selectedCustomer.segment)}
                    >
                      {selectedCustomer.segment}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">Email:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Phone:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.phone}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Address:</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedCustomer.address}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Registration Date:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.registrationDate}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">Total Revenue:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${selectedCustomer.totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedCustomer.notes && (
                <div className="space-y-2">
                  <span className="font-medium">Notes:</span>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCustomer?.companyName}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerCRUD;
