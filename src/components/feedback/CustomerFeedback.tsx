
import { useState } from "react";
import { Star, MessageSquare, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock feedback data
const feedbackData = [
  {
    id: "F-1023",
    productId: "PRD-78321",
    productName: "Premium Coffee Beans",
    customer: "Alex Johnson",
    tier: "gold",
    rating: 5,
    comment: "Excellent quality and superb packaging. The beans arrived in perfect condition and the freshness is outstanding.",
    date: "2023-04-12"
  },
  {
    id: "F-1024",
    productId: "PRD-92381",
    productName: "Organic Tea Collection",
    customer: "Sarah Miller",
    tier: "silver",
    rating: 4,
    comment: "Great variety and good value. Would appreciate better labeling on the individual tea packets.",
    date: "2023-04-10"
  },
  {
    id: "F-1025",
    productId: "PRD-12465",
    productName: "Artisan Chocolate Box",
    customer: "David Wilson",
    tier: "gold",
    rating: 5,
    comment: "These chocolates are absolutely divine! The presentation is beautiful and they taste amazing.",
    date: "2023-04-08"
  },
  {
    id: "F-1026",
    productId: "PRD-45692",
    productName: "Natural Honey Jar",
    customer: "Emily Brown",
    tier: "bronze",
    rating: 3,
    comment: "The honey is good but the jar arrived with a small crack. Packaging could be improved.",
    date: "2023-04-07"
  },
];

const CustomerFeedback = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [productId, setProductId] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  
  const filteredFeedback = feedbackData.filter(feedback => {
    if (activeTab === "all") return true;
    return feedback.tier === activeTab;
  });
  
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productId.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a product ID"
      });
      return;
    }
    
    toast({
      title: "Feedback submitted",
      description: `Thank you for your feedback on product ${productId}`
    });
    
    setProductId("");
    setComment("");
    setRating(5);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Customer Feedback</h2>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="gold">Gold</TabsTrigger>
            <TabsTrigger value="silver">Silver</TabsTrigger>
            <TabsTrigger value="bronze">Bronze</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-4 space-y-4">
          {filteredFeedback.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>
        
        <TabsContent value="gold" className="mt-4 space-y-4">
          {filteredFeedback.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>
        
        <TabsContent value="silver" className="mt-4 space-y-4">
          {filteredFeedback.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>
        
        <TabsContent value="bronze" className="mt-4 space-y-4">
          {filteredFeedback.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Submit New Feedback</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmitFeedback}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="productId" className="text-sm font-medium">
                Product ID
              </label>
              <input
                id="productId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="Enter product ID or scan barcode"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="p-1 focus:outline-none"
                    onClick={() => setRating(value)}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium">
                Comment
              </label>
              <Textarea
                id="comment"
                placeholder="Enter your feedback about this product"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Feedback</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

// Helper component to render individual feedback items
const FeedbackItem = ({ feedback }: { feedback: typeof feedbackData[0] }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{feedback.productName}</p>
            <p className="text-xs text-muted-foreground">{feedback.productId}</p>
          </div>
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            feedback.tier === "gold" ? "bg-amber-100 text-amber-800" :
            feedback.tier === "silver" ? "bg-slate-100 text-slate-800" :
            "bg-orange-100 text-orange-800"
          )}>
            {feedback.tier.charAt(0).toUpperCase() + feedback.tier.slice(1)} Tier
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-3 px-4">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-4 w-4",
                star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        <p className="text-sm">{feedback.comment}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">By {feedback.customer}</p>
        <p className="text-xs text-muted-foreground">{new Date(feedback.date).toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default CustomerFeedback;
