
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import FeedbackAnalysis from "@/components/feedback/FeedbackAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerFeedback from "@/components/feedback/CustomerFeedback";

const FeedbackAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-2xl font-bold">Feedback Analytics</h1>
            
            <Tabs defaultValue="analysis">
              <TabsList className="mb-6">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;
