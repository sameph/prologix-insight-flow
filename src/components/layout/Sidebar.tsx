
import { Link, useLocation } from "react-router-dom";
import { 
  Package, 
  Truck, 
  Store, 
  User, 
  BarChart, 
  AlertCircle, 
  Search,
  Scan,
  Settings,
  LineChart,
  Home,
  Users,
  LogOut,
  HelpCircle,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const [unreadNotifications] = useState(3);
  
  const sidebarLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart,
      badge: null
    },
    {
      title: "Products",
      href: "/products",
      icon: Package,
      badge: null
    },
    {
      title: "Store",
      href: "/store",
      icon: Store,
      badge: null
    },
    {
      title: "Logistics",
      href: "/logistics",
      icon: Truck,
      badge: null
    },
    {
      title: "User Management",
      href: "/users",
      icon: Users,
      badge: null
    },
    {
      title: "Scan Products",
      href: "/scan",
      icon: Scan,
      badge: "New"
    },
    {
      title: "Customer Feedback",
      href: "/feedback",
      icon: AlertCircle,
      badge: null
    },
    {
      title: "Feedback Analytics",
      href: "/feedback-analytics",
      icon: LineChart,
      badge: null
    }
  ];
  
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-gradient-to-b from-background to-background via-background border-r transition-transform duration-300 overflow-hidden",
      isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="flex flex-col h-full">
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-gradient-to-br from-prologix-blue to-prologix-teal p-1">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-prologix-blue to-prologix-teal bg-clip-text text-transparent">ProLogiX</span>
          </div>
          <div className="relative mt-4 rounded-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-input bg-background/80 pl-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-prologix-blue focus-visible:ring-offset-2"
            />
          </div>
        </div>
        
        <div className="flex items-center p-4 border-b">
          <Avatar className="h-9 w-9 border-2 border-primary/10">
            <AvatarImage src="https://ui-avatars.com/api/?name=Admin+User&background=0EA5E9&color=fff" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@prologix.com</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 rounded-full">
            <Bell className="h-4 w-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center text-[8px] text-white">
                {unreadNotifications}
              </span>
            )}
          </Button>
        </div>
        
        <nav className="flex-1 overflow-auto p-3">
          <div className="space-y-1 pb-4">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                    isActive 
                      ? "bg-accent text-accent-foreground shadow-sm" 
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center">
                    <link.icon className={cn(
                      "mr-2 h-4 w-4 transition-colors", 
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )} />
                    <span>{link.title}</span>
                  </div>
                  {link.badge && (
                    <Badge variant="outline" className="bg-primary/10 text-primary text-[10px] px-1.5 py-0">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="border-t p-3 mt-auto space-y-1">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500/80 hover:text-red-500 hover:bg-red-500/10">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
