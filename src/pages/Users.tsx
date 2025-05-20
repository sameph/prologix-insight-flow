
import { useState, useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  UserPlus, 
  UserX, 
  Search, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Download,
  ArrowUpDown,
  Filter,
  RefreshCw
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  dateCreated: string;
  avatar?: string;
  lastActive?: string;
  department?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Admin",
    status: "active",
    dateCreated: "2024-01-15",
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff",
    lastActive: "Today, 9:41 AM",
    department: "Engineering"
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    role: "Manager",
    status: "active",
    dateCreated: "2024-02-03",
    avatar: "https://ui-avatars.com/api/?name=Emily+Johnson&background=8B5CF6&color=fff",
    lastActive: "Yesterday, 4:23 PM",
    department: "Marketing"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    role: "User",
    status: "inactive",
    dateCreated: "2024-03-22",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=F97316&color=fff",
    lastActive: "2 days ago",
    department: "Sales"
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "Manager",
    status: "active",
    dateCreated: "2024-01-30",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&background=10B981&color=fff",
    lastActive: "Today, 11:09 AM",
    department: "Customer Support"
  },
  {
    id: "5",
    name: "David Lee",
    email: "david.lee@example.com",
    role: "User",
    status: "active",
    dateCreated: "2024-04-10",
    avatar: "https://ui-avatars.com/api/?name=David+Lee&background=EF4444&color=fff",
    lastActive: "10 minutes ago",
    department: "Finance"
  }
];

const Users = () => {
  const { open, setOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    status: "active" as "active" | "inactive",
    department: "Engineering"
  });
  const [activeTab, setActiveTab] = useState("all");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = () => {
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      dateCreated: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${newUser.name.replace(/ /g, '+')}&background=random&color=fff`,
      lastActive: "Just now",
      department: newUser.department
    };
    setUsers([...users, user]);
    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "User", status: "active", department: "Engineering" });
    
    toast({
      title: "User Added",
      description: `${user.name} has been successfully added to the system.`,
    });
  };

  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (currentUser) {
      setUsers(users.filter(user => user.id !== currentUser.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "User Deleted",
        description: `${currentUser.name} has been removed from the system.`,
        variant: "destructive"
      });
      setCurrentUser(null);
    }
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const refreshUsers = () => {
    setIsLoading(true);
    // Simulate a refresh delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data Refreshed",
        description: "User list has been refreshed with the latest data.",
      });
    }, 1000);
  };

  const exportUsers = () => {
    toast({
      title: "Export Started",
      description: "User data is being prepared for download.",
    });
    // Simulate an export - in a real app, this would generate a CSV or Excel file
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "User data has been exported successfully.",
      });
    }, 1500);
  };

  const filteredUsers = users.filter(user => {
    // Filter by search query
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by status if showActiveOnly is enabled
    const matchesStatus = showActiveOnly ? user.status === "active" : true;
    
    // Filter by tab
    const matchesTab = activeTab === "all" || 
                       (activeTab === "admin" && user.role === "Admin") || 
                       (activeTab === "manager" && user.role === "Manager") || 
                       (activeTab === "user" && user.role === "User");
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={open} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-muted-foreground">Manage your team members and their roles</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={refreshUsers} disabled={isLoading}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button variant="outline" onClick={exportUsers}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button onClick={() => setIsAddUserOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Viewing {filteredUsers.length} of {users.length} users</CardDescription>
                  </div>
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="admin">Admins</TabsTrigger>
                      <TabsTrigger value="manager">Managers</TabsTrigger>
                      <TabsTrigger value="user">Users</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="relative w-full max-w-md">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search users..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="w-[260px]">
                      <div className="flex items-center space-x-2">
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="h-3.5 w-3.5 mr-2" />
                            <span>Filters</span>
                            <span className="ml-2 rounded-full bg-primary w-5 h-5 text-[10px] text-primary-foreground grid place-items-center">
                              {showActiveOnly ? 1 : 0}
                            </span>
                          </Button>
                        </CollapsibleTrigger>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="active-users-only" className="text-sm">Active users only</Label>
                          <Switch id="active-users-only" checked={showActiveOnly} onCheckedChange={setShowActiveOnly} />
                        </div>
                      </div>
                      <CollapsibleContent className="mt-2 rounded-md border p-2">
                        <div className="flex flex-col gap-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Label htmlFor="filter-department" className="text-sm whitespace-nowrap">Department:</Label>
                              <select id="filter-department" className="flex h-8 w-full rounded-md border border-input px-3 py-1 text-sm">
                                <option>All</option>
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>Sales</option>
                                <option>Finance</option>
                              </select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Label htmlFor="sort-by" className="text-sm whitespace-nowrap">Sort by:</Label>
                              <select id="sort-by" className="flex h-8 w-full rounded-md border border-input px-3 py-1 text-sm">
                                <option>Name</option>
                                <option>Date Added</option>
                                <option>Last Active</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm">Apply Filters</Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                  
                  <div className="rounded-md border shadow-sm overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[250px]">
                            <div className="flex items-center space-x-1">
                              <span>Name</span>
                              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                          </TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead>Date Created</TableHead>
                          <TableHead className="w-[80px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <Search className="h-8 w-8 mb-2" />
                                <p>No users found</p>
                                <p className="text-sm">Try adjusting your search or filters</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8 border">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col">
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <span className="font-medium cursor-pointer hover:text-primary transition-colors">{user.name}</span>
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-80">
                                        <div className="flex space-x-4">
                                          <Avatar className="h-12 w-12">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                          </Avatar>
                                          <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">{user.name}</h4>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                            <div className="flex items-center pt-1">
                                              <span className="text-xs text-muted-foreground">
                                                Member since {new Date(user.dateCreated).toLocaleDateString()}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                    <span className="text-sm text-muted-foreground">{user.email}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    user.role === "Admin" 
                                      ? "bg-purple-100 text-purple-800 hover:bg-purple-100" 
                                      : user.role === "Manager" 
                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100" 
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                  }
                                >
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={
                                    user.status === "active" 
                                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{user.department}</TableCell>
                              <TableCell>
                                <span className="text-sm">{user.lastActive}</span>
                              </TableCell>
                              <TableCell>{new Date(user.dateCreated).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="cursor-pointer flex items-center">
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="cursor-pointer flex items-center text-destructive"
                                      onClick={() => handleDeleteUser(user)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
                    </p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. Fill out the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="john.doe@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option>User</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={newUser.department}
                  onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                >
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Finance</option>
                  <option>Customer Support</option>
                  <option>Human Resources</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="active" 
                checked={newUser.status === "active"}
                onCheckedChange={(checked) => 
                  setNewUser({...newUser, status: checked ? "active" : "inactive"})
                }
              />
              <Label htmlFor="active">Active User</Label>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser} disabled={!newUser.name || !newUser.email}>
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4 flex items-center space-x-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              <UserX className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
