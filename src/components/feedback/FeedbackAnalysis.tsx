
import { useState } from "react";
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';
import { MessageSquare, TrendingUp, ThumbsUp, ThumbsDown, Smile, Frown, Meh, ChevronDown, Filter, Download, Share2, ArrowRight, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  ],
  sentimentTrend: [
    { month: 'Jan', positive: 55, negative: 20, neutral: 25 },
    { month: 'Feb', positive: 60, negative: 18, neutral: 22 },
    { month: 'Mar', positive: 58, negative: 22, neutral: 20 },
    { month: 'Apr', positive: 62, negative: 15, neutral: 23 },
    { month: 'May', positive: 65, negative: 15, neutral: 20 },
    { month: 'Jun', positive: 68, negative: 12, neutral: 20 },
  ],
  keyIssuesBySeverity: [
    { issue: 'Delivery Delays', count: 24, severity: 'high' },
    { issue: 'Product Damage', count: 18, severity: 'high' },
    { issue: 'Payment Issues', count: 15, severity: 'medium' },
    { issue: 'Website Navigation', count: 12, severity: 'medium' },
    { issue: 'Missing Items', count: 10, severity: 'high' },
    { issue: 'Product Description', count: 8, severity: 'low' },
  ]
};

const FeedbackAnalysis = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("last-30");
  const [viewMode, setViewMode] = useState("advanced");

  const refreshAnalysis = () => {
    setIsRefreshing(true);
    toast.info("Refreshing analysis data...");
    // In a real implementation, this would trigger a new AI analysis
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Feedback analysis refreshed successfully");
    }, 2000);
  };

  const exportReport = () => {
    toast.success("Report exported successfully");
  };

  const shareAnalysis = () => {
    toast.success("Analysis link copied to clipboard");
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

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
            <PieChartIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              AI Feedback Analysis
            </h2>
            <p className="text-sm text-muted-foreground">
              Analyze customer feedback using artificial intelligence
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7">Last 7 days</SelectItem>
              <SelectItem value="last-30">Last 30 days</SelectItem>
              <SelectItem value="last-90">Last 90 days</SelectItem>
              <SelectItem value="year-to-date">Year to date</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic View</SelectItem>
              <SelectItem value="advanced">Advanced View</SelectItem>
              <SelectItem value="expert">Expert View</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Filter by Date</DropdownMenuItem>
              <DropdownMenuItem>Filter by Product</DropdownMenuItem>
              <DropdownMenuItem>Filter by Source</DropdownMenuItem>
              <DropdownMenuItem>Filter by Sentiment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon" onClick={exportReport}>
            <Download className="h-4 w-4" />
            <span className="sr-only">Export Report</span>
          </Button>
          
          <Button variant="outline" size="icon" onClick={shareAnalysis}>
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share Analysis</span>
          </Button>
          
          <Button 
            variant="default" 
            onClick={refreshAnalysis} 
            disabled={isRefreshing}
          >
            {isRefreshing ? "Analyzing..." : "Refresh Analysis"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid sm:grid-cols-4 grid-cols-2 mb-4 gap-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100">Overview</TabsTrigger>
          <TabsTrigger value="keywords" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100">Keywords</TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100">Products</TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100">AI Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 animate-fade-in">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b">
                <CardTitle>Sentiment Overview</CardTitle>
                <CardDescription>Overall sentiment across all customer feedback</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
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
                        animationDuration={1000}
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
              <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-t flex justify-between text-sm">
                <span className="text-green-600 font-medium">↑ 5% from last month</span>
                <Button variant="ghost" size="sm" className="text-xs">
                  View Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b">
                <CardTitle>Sentiment Trends</CardTitle>
                <CardDescription>Monthly sentiment analysis trends</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={analyzedFeedback.sentimentTrend}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6B7280" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6B7280" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="positive" stroke="#10B981" fillOpacity={1} fill="url(#colorPositive)" />
                      <Area type="monotone" dataKey="negative" stroke="#EF4444" fillOpacity={1} fill="url(#colorNegative)" />
                      <Area type="monotone" dataKey="neutral" stroke="#6B7280" fillOpacity={1} fill="url(#colorNeutral)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-t flex justify-between text-sm">
                <span className="text-green-600 font-medium">Trending Upward</span>
                <Button variant="ghost" size="sm" className="text-xs">
                  View Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b">
              <CardTitle>Critical Issues by Severity</CardTitle>
              <CardDescription>Issues identified with their severity levels</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyzedFeedback.keyIssuesBySeverity}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="issue" 
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                        {analyzedFeedback.keyIssuesBySeverity.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.severity === 'high' ? '#EF4444' : entry.severity === 'medium' ? '#F59E0B' : '#3B82F6'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Top Issues Breakdown</h4>
                  <div className="space-y-3">
                    {analyzedFeedback.keyIssuesBySeverity.map((issue) => (
                      <div key={issue.issue} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            issue.severity === 'high' ? 'bg-red-500' : 
                            issue.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                          }`} />
                          <span className="text-sm">{issue.issue}</span>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger>
                            <Badge className={getSeverityColor(issue.severity)}>
                              {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                            </Badge>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="font-medium">{issue.issue} ({issue.count} mentions)</h4>
                              <p className="text-sm text-muted-foreground">
                                This issue has been mentioned in {issue.count} customer feedback entries with {issue.severity} severity.
                              </p>
                              <div className="pt-2">
                                <Button variant="outline" size="sm" className="w-full">
                                  View Related Feedback
                                </Button>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full text-sm mt-4">
                    Generate Improvement Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b">
              <CardTitle>Summary Insights</CardTitle>
              <CardDescription>AI-generated summary of feedback trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-6">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <p className="text-sm">
                  Based on the latest customer feedback analysis, overall sentiment is <span className="font-medium text-green-600">65% positive</span>, with highest satisfaction regarding product quality and customer service. Areas for improvement include delivery times and packaging of specific products.
                </p>
                <p className="text-sm mt-2">
                  Gold tier customers provide more feedback (42% of total) and report higher satisfaction levels than other tiers. Most feedback is received via the mobile app (65%), followed by email (25%).
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">AI Generated</Badge>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Generate Detailed Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="animate-fade-in">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b">
              <CardTitle>Top Mentioned Keywords</CardTitle>
              <CardDescription>Most frequently mentioned topics in customer feedback</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={analyzedFeedback.topKeywords}
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="keyword" 
                      tick={{ fontSize: 12 }}
                    />
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
              <div className="mt-6 flex flex-wrap gap-2">
                {analyzedFeedback.topKeywords.map((keyword) => (
                  <HoverCard key={keyword.keyword}>
                    <HoverCardTrigger asChild>
                      <Badge 
                        variant="outline"
                        className={`
                          cursor-pointer transition-all hover:scale-105
                          ${keyword.sentiment === 'positive' ? 'border-green-200 bg-green-50 text-green-600' : 
                            keyword.sentiment === 'negative' ? 'border-red-200 bg-red-50 text-red-600' : 
                            'border-gray-200 bg-gray-50 text-gray-600'}
                        `}
                      >
                        {keyword.keyword} ({keyword.count})
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getSentimentIcon(keyword.sentiment)}
                          <h4 className="font-medium">{keyword.keyword} ({keyword.count} mentions)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This keyword has been mentioned in {keyword.count} customer feedback entries with {keyword.sentiment} sentiment.
                        </p>
                        <div className="pt-2 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Feedback
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Trend Analysis
                          </Button>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="animate-fade-in">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b">
              <CardTitle>Product Sentiment Analysis</CardTitle>
              <CardDescription>Feedback breakdown by product</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
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
                    <div key={product.id} className="rounded-md border p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-blue-800 dark:text-blue-300">{product.name}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{product.id}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-500" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${product.positive}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {product.positive}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ThumbsDown className="h-4 w-4 text-red-500" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${product.negative}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {product.negative}%
                          </span>
                        </div>
                        <Button variant="outline" className="w-full text-xs mt-2" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="animate-fade-in">
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-b">
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Actionable insights extracted from customer feedback</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {analyzedFeedback.insightsGenerated.map((insight) => (
                  <div 
                    key={insight.id} 
                    className={`rounded-lg border p-4 transition-all hover:shadow-md
                      ${insight.sentiment === 'positive' ? 'border-l-4 border-l-green-500' : 
                        insight.sentiment === 'negative' ? 'border-l-4 border-l-red-500' : 
                        'border-l-4 border-l-gray-500'}
                    `}
                  >
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
                    <div className="flex justify-end mt-2">
                      <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                        Take Action <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-t flex justify-between py-4">
              <Button variant="outline" size="sm">
                Export Insights
              </Button>
              <Button variant="default" size="sm">
                Generate Action Plan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackAnalysis;
