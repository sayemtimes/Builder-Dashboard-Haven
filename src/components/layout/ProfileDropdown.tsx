import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  LogOut,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
  bio: string;
  timezone: string;
  language: string;
}

const mockUser: UserProfile = {
  id: "1",
  name: "John Doe",
  email: "john.doe@company.com",
  role: "Sales Manager",
  department: "Sales",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  joinDate: "2022-03-15",
  avatar: "/placeholder.svg",
  bio: "Experienced sales manager with 8+ years in CRM and customer relationship management.",
  timezone: "EST",
  language: "English",
};

const ProfileDropdown = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>(mockUser);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    reports: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: true,
    contactInfoVisible: false,
  });

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground mt-1">
                    {user.email}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {user.role}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {user.department}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>📍 {user.location}</p>
                <p>📅 Joined {new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile & Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
            <Badge variant="secondary" className="ml-auto">
              3
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Shield className="mr-2 h-4 w-4" />
            <span>Privacy & Security</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Palette className="mr-2 h-4 w-4" />
            <span>Appearance</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing & Plans</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Settings Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile & Settings</span>
            </DialogTitle>
            <DialogDescription>
              Manage your account settings, preferences, and personal
              information.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="profile" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{user.name}</h3>
                    <p className="text-muted-foreground">{user.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "destructive" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              {isEditing ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editedUser.phone}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={editedUser.location}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editedUser.bio}
                      onChange={(e) =>
                        setEditedUser((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </div>
                  <div className="col-span-2 flex space-x-2">
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          {user.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {user.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Join Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Bio</p>
                      <p className="text-sm text-muted-foreground">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Preferences</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Input value={user.timezone} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Input value={user.language} readOnly />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dashboard Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show welcome message</p>
                      <p className="text-sm text-muted-foreground">
                        Display welcome message on dashboard
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-refresh data</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically refresh dashboard data every 5 minutes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show animations</p>
                      <p className="text-sm text-muted-foreground">
                        Enable smooth animations and transitions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-factor authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Login notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy Controls</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile visibility</p>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other team members
                      </p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          profileVisible: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity status</p>
                      <p className="text-sm text-muted-foreground">
                        Show when you're online or active
                      </p>
                    </div>
                    <Switch
                      checked={privacy.activityVisible}
                      onCheckedChange={(checked) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          activityVisible: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Contact information</p>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your contact details
                      </p>
                    </div>
                    <Switch
                      checked={privacy.contactInfoVisible}
                      onCheckedChange={(checked) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          contactInfoVisible: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Notification Preferences
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          email: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing emails</p>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and tips
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          marketing: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Report notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when scheduled reports are ready
                      </p>
                    </div>
                    <Switch
                      checked={notifications.reports}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          reports: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDropdown;
