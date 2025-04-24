
import { useState } from "react";
import { Truck, Package, AlertCircle, Map, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

// Mock logistics data
const shipments = [
  {
    id: "SHP-1023",
    destination: "Store #1",
    origin: "Warehouse A",
    products: 24,
    status: "in-transit",
    progress: 65,
    departureDate: "2023-04-10",
    estimatedArrival: "2023-04-15"
  },
  {
    id: "SHP-1024",
    destination: "Store #3",
    origin: "Warehouse B",
    products: 18,
    status: "pending",
    progress: 0,
    departureDate: "2023-04-17",
    estimatedArrival: "2023-04-22"
  },
  {
    id: "SHP-1025",
    destination: "Distribution Center",
    origin: "Warehouse A",
    products: 36,
    status: "delivered",
    progress: 100,
    departureDate: "2023-04-05",
    estimatedArrival: "2023-04-08"
  },
  {
    id: "SHP-1026",
    destination: "Store #2",
    origin: "Distribution Center",
    products: 12,
    status: "in-transit",
    progress: 25,
    departureDate: "2023-04-12",
    estimatedArrival: "2023-04-16"
  }
];

// Mock inventory locations data
const inventoryLocations = [
  {
    id: "LOC-1",
    name: "Warehouse A",
    capacity: 80,
    products: [
      { category: "Beverages", count: 520 },
      { category: "Confectionery", count: 320 },
      { category: "Dairy", count: 150 },
      { category: "Bakery", count: 210 }
    ],
    alerts: 2
  },
  {
    id: "LOC-2",
    name: "Warehouse B",
    capacity: 65,
    products: [
      { category: "Natural Products", count: 180 },
      { category: "Beverages", count: 240 },
      { category: "Confectionery", count: 170 },
      { category: "Dairy", count: 110 }
    ],
    alerts: 0
  },
  {
    id: "LOC-3",
    name: "Distribution Center",
    capacity: 45,
    products: [
      { category: "Beverages", count: 120 },
      { category: "Dairy", count: 95 },
      { category: "Bakery", count: 75 }
    ],
    alerts: 1
  },
  {
    id: "LOC-4",
    name: "Store #1",
    capacity: 30,
    products: [
      { category: "Beverages", count: 45 },
      { category: "Confectionery", count: 38 },
      { category: "Dairy", count: 32 },
      { category: "Bakery", count: 28 }
    ],
    alerts: 3
  }
];

const Logistics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("shipments");
  
  // Filter shipments based on search term
  const filteredShipments = shipments.filter(
    shipment => 
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter locations based on search term
  const filteredLocations = inventoryLocations.filter(
    location =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-transit":
        return <div className="status-badge-info">In Transit</div>;
      case "pending":
        return <div className="status-badge-warning">Pending</div>;
      case "delivered":
        return <div className="status-badge-success">Delivered</div>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-2xl font-bold">Logistics Management</h1>
            
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search shipments or locations..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Truck className="mr-2 h-4 w-4" />
                  New Shipment
                </Button>
              </div>
              
              <Tabs defaultValue="shipments" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="shipments">Shipments</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory Locations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="shipments" className="mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredShipments.map((shipment) => (
                      <Card key={shipment.id} className="card-hover">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-lg">{shipment.id}</CardTitle>
                              <CardDescription>
                                {shipment.origin} → {shipment.destination}
                              </CardDescription>
                            </div>
                            {getStatusBadge(shipment.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-4">
                            <div>
                              <div className="mb-1 flex items-center justify-between text-sm">
                                <span>Shipment Progress</span>
                                <span>{shipment.progress}%</span>
                              </div>
                              <Progress value={shipment.progress} />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Products</p>
                                <p className="font-medium">{shipment.products} items</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Departure</p>
                                <p className="font-medium">{new Date(shipment.departureDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">ETA</p>
                                <p className="font-medium">{new Date(shipment.estimatedArrival).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Status</p>
                                <p className="font-medium capitalize">{shipment.status.replace("-", " ")}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {filteredShipments.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                        <Truck className="h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No shipments found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory" className="mt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredLocations.map((location) => (
                      <Card key={location.id} className="card-hover">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-lg">{location.name}</CardTitle>
                              <CardDescription>{location.id}</CardDescription>
                            </div>
                            {location.alerts > 0 && (
                              <div className="status-badge-warning flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                <span>{location.alerts} alerts</span>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-4">
                            <div>
                              <div className="mb-1 flex items-center justify-between text-sm">
                                <span>Storage Capacity</span>
                                <span>{location.capacity}%</span>
                              </div>
                              <Progress 
                                value={location.capacity} 
                                className={`h-2 ${
                                  location.capacity > 90 ? "bg-red-100" : 
                                  location.capacity > 75 ? "bg-orange-100" : 
                                  "bg-green-100"
                                }`} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Product Categories</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                {location.products.map((product, idx) => (
                                  <div key={idx}>
                                    <p className="font-medium">{product.category}</p>
                                    <p className="text-muted-foreground">{product.count} items</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Inventory</Button>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {filteredLocations.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                        <Map className="h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No locations found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Logistics;
