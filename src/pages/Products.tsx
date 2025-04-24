import { useState } from "react";
import { Package, Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ProductCard from "@/components/products/ProductCard";
import BarcodeScanner from "@/components/products/BarcodeScanner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type ProductStatus = "in-stock" | "low-stock" | "out-of-stock" | "transit";

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  daysUntilExpiry: number;
  status: ProductStatus;
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: "PRD-78321",
    name: "Premium Coffee Beans",
    category: "Beverages",
    quantity: 342,
    location: "Warehouse A",
    daysUntilExpiry: 120,
    status: "in-stock" as const
  },
  {
    id: "PRD-92381",
    name: "Organic Tea Collection",
    category: "Beverages",
    quantity: 157,
    location: "Warehouse A",
    daysUntilExpiry: 90,
    status: "in-stock" as const
  },
  {
    id: "PRD-12465",
    name: "Artisan Chocolate Box",
    category: "Confectionery",
    quantity: 84,
    location: "Store #3",
    daysUntilExpiry: 60,
    status: "in-stock" as const
  },
  {
    id: "PRD-45692",
    name: "Natural Honey Jar",
    category: "Natural Products",
    quantity: 51,
    location: "Store #2",
    daysUntilExpiry: 180,
    status: "low-stock" as const
  },
  {
    id: "PRD-63741",
    name: "Organic Bread",
    category: "Bakery",
    quantity: 16,
    location: "Store #1",
    daysUntilExpiry: 3,
    status: "low-stock" as const
  },
  {
    id: "PRD-58123",
    name: "Fresh Milk",
    category: "Dairy",
    quantity: 67,
    location: "Distribution Center",
    daysUntilExpiry: 5,
    status: "in-stock" as const
  },
  {
    id: "PRD-29475",
    name: "Yogurt Pack",
    category: "Dairy",
    quantity: 24,
    location: "Store #5",
    daysUntilExpiry: 7,
    status: "low-stock" as const
  },
  {
    id: "PRD-30981",
    name: "Fruit Juice",
    category: "Beverages",
    quantity: 38,
    location: "Warehouse B",
    daysUntilExpiry: 15,
    status: "in-stock" as const
  }
];

const Products = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "expiring-soon") return matchesSearch && product.daysUntilExpiry <= 7;
    if (selectedTab === "low-stock") return matchesSearch && product.status === "low-stock";
    
    return false;
  });
  
  const handleScan = (barcode: string) => {
    const foundProduct = mockProducts.find(p => p.id === barcode);
    
    if (foundProduct) {
      setSelectedProduct(foundProduct);
    } else {
      toast({
        variant: "destructive",
        title: "Product not found",
        description: `No product found with ID: ${barcode}`
      });
    }
    
    setIsScannerOpen(false);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={() => setIsScannerOpen(true)}>
                  <Package className="mr-2 h-4 w-4" />
                  Scan Product
                </Button>
              </div>
            </div>
            
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products by name or ID..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
              
              <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="expiring-soon">Expiring Soon</TabsTrigger>
                  <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Product Scanner Dialog */}
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Product Barcode</DialogTitle>
            <DialogDescription>
              Scan a product barcode to quickly find product details
            </DialogDescription>
          </DialogHeader>
          <BarcodeScanner onScan={handleScan} />
        </DialogContent>
      </Dialog>
      
      {/* Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected product
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Product Name</p>
                  <p className="text-sm">{selectedProduct.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Product ID</p>
                  <p className="text-sm">{selectedProduct.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Quantity</p>
                  <p className="text-sm">{selectedProduct.quantity} units</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">{selectedProduct.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expires In</p>
                  <p className="text-sm">{selectedProduct.daysUntilExpiry} days</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Status</p>
                {selectedProduct.status === "in-stock" && (
                  <p className="status-badge-success">In Stock</p>
                )}
                {selectedProduct.status === "low-stock" && (
                  <p className="status-badge-warning">Low Stock</p>
                )}
                {selectedProduct.status === "out-of-stock" && (
                  <p className="status-badge-error">Out of Stock</p>
                )}
                {selectedProduct.status === "transit" && (
                  <p className="status-badge-info">In Transit</p>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
                <Button>Edit Product</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
