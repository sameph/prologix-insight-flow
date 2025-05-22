
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import FeedbackAnalysis from "@/components/feedback/FeedbackAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerFeedback from "@/components/feedback/CustomerFeedback";
import { BarChart4, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FeedbackAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-b from-background to-muted/20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-7xl"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Feedback Analytics</h1>
                <p className="text-muted-foreground">Analyze and visualize customer feedback using AI</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Share Reports
                </Button>
                <Button variant="default" className="gap-2">
                  <BarChart4 className="h-4 w-4" />
                  Create New Analysis
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="mb-6 bg-background/80 backdrop-blur-sm">
                <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                <TabsTrigger value="raw">Raw Feedback</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis">
                <FeedbackAnalysis />
              </TabsContent>
              
              <TabsContent value="raw">
                <CustomerFeedback />
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;
