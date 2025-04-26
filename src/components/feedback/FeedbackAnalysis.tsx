
import { useState } from "react";
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageSquare, TrendingUp, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample AI-analyzed feedback data
const analyzedFeedback = {
  sentimentBreakdown: [
    { name: 'Positive', value: 65, color: '#10B981' },
    { name: 'Neutral', value: 20, color: '#6B7280' },
    { name: 'Negative', value: 15, color: '#EF4444' },
  ],
  topKeywords: [
    { keyword: 'quality', count: 28, sentiment: 'positive' },
    { keyword: 'packaging', count: 22, sentiment: 'positive' },
    { keyword: 'delivery', count: 18, sentiment: 'negative' },
    { keyword: 'price', count: 15, sentiment: 'neutral' },
    { keyword: 'taste', count: 12, sentiment: 'positive' },
    { keyword: 'customer service', count: 10, sentiment: 'positive' },
    { keyword: 'freshness', count: 8, sentiment: 'positive' },
    { keyword: 'variety', count: 6, sentiment: 'positive' },
  ],
  productFeedback: [
    { id: "PRD-78321", name: "Premium Coffee Beans", positive: 85, negative: 15 },
    { id: "PRD-92381", name: "Organic Tea Collection", positive: 70, negative: 30 },
    { id: "PRD-12465", name: "Artisan Chocolate Box", positive: 92, negative: 8 },
    { id: "PRD-45692", name: "Natural Honey Jar", positive: 60, negative: 40 },
  ],
  insightsGenerated: [
    {
      id: 1,
      topic: "Product Quality",
      insight: "Customers consistently praise the quality of Premium Coffee Beans, with 85% positive feedback. Consider highlighting quality in marketing materials.",
      sentiment: "positive"
    },
    {
      id: 2,
      topic: "Packaging",
      insight: "Several customers mentioned concerns about the Natural Honey Jar packaging. 23% of negative feedback relates to cracked jars upon delivery.",
      sentiment: "negative"
    },
    {
      id: 3,
      topic: "Customer Service",
      insight: "Gold tier customers report higher satisfaction (92%) with customer service compared to Bronze tier (76%).",
      sentiment: "positive"
    },
    {
      id: 4,
      topic: "Delivery Times",
      insight: "Delivery complaints increased by 12% this month compared to last month. Most common in rural areas.",
      sentiment: "negative"
    },
  ]
};

const FeedbackAnalysis = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAnalysis = () => {
    setIsRefreshing(true);
    // In a real implementation, this would trigger a new AI analysis
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch(sentiment) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      default:
        return <Meh className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Feedback Analysis
        </h2>
        <Button 
          variant="outline" 
          onClick={refreshAnalysis} 
          disabled={isRefreshing}
        >
          {isRefreshing ? "Analyzing..." : "Refresh Analysis"}
        </Button>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Overview</CardTitle>
                <CardDescription>Overall sentiment across all customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyzedFeedback.sentimentBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyzedFeedback.sentimentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Volume</CardTitle>
                <CardDescription>Monthly feedback trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: 'Jan', volume: 45 },
                        { month: 'Feb', volume: 52 },
                        { month: 'Mar', volume: 48 },
                        { month: 'Apr', volume: 70 },
                        { month: 'May', volume: 65 },
                        { month: 'Jun', volume: 85 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="volume" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Summary Insights</CardTitle>
              <CardDescription>AI-generated summary of feedback trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                Based on the latest customer feedback analysis, overall sentiment is <span className="font-medium text-green-600">65% positive</span>, with highest satisfaction regarding product quality and customer service. Areas for improvement include delivery times and packaging of specific products.
              </p>
              <p className="text-sm">
                Gold tier customers provide more feedback (42% of total) and report higher satisfaction levels than other tiers. Most feedback is received via the mobile app (65%), followed by email (25%).
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle>Top Mentioned Keywords</CardTitle>
              <CardDescription>Most frequently mentioned topics in customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={analyzedFeedback.topKeywords}
                    margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="keyword" />
                    <Tooltip />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {analyzedFeedback.topKeywords.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={entry.sentiment === 'positive' ? '#10B981' : entry.sentiment === 'negative' ? '#EF4444' : '#6B7280'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {analyzedFeedback.topKeywords.map((keyword) => (
                  <Badge 
                    key={keyword.keyword}
                    variant="outline"
                    className={`
                      ${keyword.sentiment === 'positive' ? 'border-green-200 bg-green-50 text-green-600' : 
                        keyword.sentiment === 'negative' ? 'border-red-200 bg-red-50 text-red-600' : 
                        'border-gray-200 bg-gray-50 text-gray-600'}
                    `}
                  >
                    {keyword.keyword} ({keyword.count})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Sentiment Analysis</CardTitle>
              <CardDescription>Feedback breakdown by product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyzedFeedback.productFeedback}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    stackOffset="sign"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" stackId="stack" fill="#10B981" />
                    <Bar dataKey="negative" stackId="stack" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-medium">Product Feedback Highlights</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {analyzedFeedback.productFeedback.map((product) => (
                    <div key={product.id} className="rounded-md border p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{product.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${product.positive}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">
                          {product.positive}% positive
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Actionable insights extracted from customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyzedFeedback.insightsGenerated.map((insight) => (
                  <div key={insight.id} className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 mb-2">
                        {getSentimentIcon(insight.sentiment)}
                        <h4 className="font-medium">{insight.topic}</h4>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          insight.sentiment === 'positive' ? 'bg-green-50 text-green-700 border-green-200' :
                          insight.sentiment === 'negative' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }
                      >
                        {insight.sentiment.charAt(0).toUpperCase() + insight.sentiment.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackAnalysis;
