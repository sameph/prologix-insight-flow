import { useState } from "react";
import { Store as StoreIcon, Package, ShoppingCart, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CustomerTiers from "@/components/store/CustomerTiers";

const Store = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const storeSummary = [
    {
      title: "Total Products",
      value: "1,234",
      icon: Package,
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Active Orders",
      value: "56",
      icon: ShoppingCart,
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Customer Rating",
      value: "4.8/5",
      icon: Star,
      trend: "+0.3",
      trendUp: true
    },
    {
      title: "Daily Visitors",
      value: "892",
      icon: Users,
      trend: "-3%",
      trendUp: false
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Store Management</h1>
                <p className="text-muted-foreground">Monitor store performance and manage orders</p>
              </div>
              
              <Button>
                <StoreIcon className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {storeSummary.map((item) => (
                <Card key={item.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className={`text-xs ${item.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                      {item.trend} from last month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Customer Loyalty Tiers */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Customer Loyalty Program</h2>
              <CustomerTiers currentPoints={2500} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Store;
