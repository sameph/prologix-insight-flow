
import { Package, Clock, AlertCircle, Truck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  daysUntilExpiry?: number;
  status: "in-stock" | "low-stock" | "out-of-stock" | "transit";
  onClick?: () => void;
}

const ProductCard = ({
  id,
  name,
  category,
  quantity,
  location,
  daysUntilExpiry,
  status,
  onClick
}: ProductCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "in-stock":
        return <div className="status-badge-success">In Stock</div>;
      case "low-stock":
        return <div className="status-badge-warning">Low Stock</div>;
      case "out-of-stock":
        return <div className="status-badge-error">Out of Stock</div>;
      case "transit":
        return <div className="status-badge-info">In Transit</div>;
      default:
        return null;
    }
  };

  const isExpiringSoon = daysUntilExpiry !== undefined && daysUntilExpiry <= 7;

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">{id}</p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Category:</span>
            <span className="text-xs font-medium">{category}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity:</span>
            <span className="text-xs font-medium">{quantity} units</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Location:</span>
            <span className="text-xs font-medium">{location}</span>
          </div>
          
          {daysUntilExpiry !== undefined && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Expires in:</span>
                <span className={cn("text-xs font-medium", 
                  isExpiringSoon ? "text-prologix-orange" : ""
                )}>
                  {daysUntilExpiry} days
                </span>
              </div>
              <Progress 
                value={Math.min(daysUntilExpiry * 5, 100)} 
                className={cn("h-1", 
                  daysUntilExpiry <= 3 
                    ? "bg-red-100" 
                    : daysUntilExpiry <= 7 
                      ? "bg-orange-100" 
                      : "bg-green-100"
                )} 
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs" onClick={onClick}>
          Details
        </Button>
        
        {isExpiringSoon && (
          <div className="flex items-center gap-1 text-prologix-orange text-xs">
            <AlertCircle className="h-3 w-3" />
            Expiring Soon
          </div>
        )}
        
        {status === "transit" && (
          <div className="flex items-center gap-1 text-prologix-blue text-xs">
            <Truck className="h-3 w-3" />
            In Transit
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
