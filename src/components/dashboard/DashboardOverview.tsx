
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Package, 
  Truck, 
  AlertCircle, 
  ShoppingCart, 
  BarChart4, 
  Clock 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const DashboardOverview = () => {
  // Mock data for the overview cards
  const overviewData = {
    totalProducts: 1204,
    pendingShipments: 42,
    expiringItems: 17,
    customerFeedback: 85
  };
  
  // Mock data for product stats
  const productStats = [
    { name: "Premium Coffee Beans", sold: 723, inStock: 412, rating: 4.8 },
    { name: "Organic Tea Collection", sold: 541, inStock: 267, rating: 4.5 },
    { name: "Artisan Chocolate Box", sold: 325, inStock: 178, rating: 4.7 },
    { name: "Natural Honey Jar", sold: 289, inStock: 124, rating: 4.6 }
  ];
  
  // Mock expiring products data
  const expiringProducts = [
    { id: "PRD-0012", name: "Fresh Milk", location: "Warehouse A", daysLeft: 2 },
    { id: "PRD-0237", name: "Yogurt Pack", location: "Store #5", daysLeft: 3 },
    { id: "PRD-0431", name: "Fruit Juice", location: "Distribution Center", daysLeft: 5 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.pendingShipments}</div>
            <p className="text-xs text-muted-foreground">
              +4% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expiring Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-prologix-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.expiringItems}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate action
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Feedback</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.customerFeedback}%</div>
            <p className="text-xs text-muted-foreground">
              Positive feedback rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productStats.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.sold} sold / {product.inStock} in stock
                    </p>
                  </div>
                  <div className="ml-2 flex items-center gap-1 text-sm">
                    <span>{product.rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="gold"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/products" className="flex items-center justify-center gap-1">
                <span>View all products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Expiring Soon</CardTitle>
                <CardDescription>
                  Products near expiration date
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-prologix-orange border-prologix-orange">
                <AlertCircle className="h-4 w-4 mr-1" /> Alert
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringProducts.map((product, index) => (
                <div key={index} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.id} - {product.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-prologix-orange" />
                      <span className="text-xs font-medium text-prologix-orange">
                        {product.daysLeft} days left
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={product.daysLeft * 10} 
                      className={`h-1.5 ${product.daysLeft <= 3 ? "bg-red-100" : "bg-orange-100"}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/products" className="flex items-center justify-center gap-1">
                <span>View all expiring items</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback Overview</CardTitle>
          <CardDescription>
            Analysis of recent customer feedback and loyalty tiers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-r from-yellow-100 to-amber-100 p-4">
              <h3 className="mb-2 font-semibold">Gold Tier</h3>
              <div className="text-2xl font-bold">247</div>
              <div className="mt-1 text-xs">
                <span className="inline-flex items-center text-green-700">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  12% increase
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-gray-100 to-slate-200 p-4">
              <h3 className="mb-2 font-semibold">Silver Tier</h3>
              <div className="text-2xl font-bold">634</div>
              <div className="mt-1 text-xs">
                <span className="inline-flex items-center text-green-700">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  8% increase
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-orange-100 to-amber-200 p-4">
              <h3 className="mb-2 font-semibold">Bronze Tier</h3>
              <div className="text-2xl font-bold">421</div>
              <div className="mt-1 text-xs">
                <span className="inline-flex items-center text-green-700">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  4% increase
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full" asChild>
            <Link to="/feedback" className="flex items-center justify-center gap-1">
              <span>View detailed feedback</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardOverview;
