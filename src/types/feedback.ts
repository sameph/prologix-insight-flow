
// Feedback data types for AI analysis

// Raw feedback data from customers
export interface CustomerFeedbackData {
  id: string;
  productId: string;
  productName: string;
  customer: string;
  customerTier: 'bronze' | 'silver' | 'gold';
  rating: number; // 1-5
  comment: string;
  date: string;
  source?: 'app' | 'email' | 'web' | 'store';
}

// AI analyzed sentiment results
export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number; // 0-1 confidence score
  aspects?: {
    aspect: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }[];
}

// Keyword extraction results
export interface KeywordExtractionResult {
  keywords: {
    keyword: string;
    score: number;
    count: number;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
}

// Product feedback analysis
export interface ProductFeedbackAnalysis {
  productId: string;
  productName: string;
  sentimentBreakdown: {
    positive: number; // percentage
    negative: number; // percentage
    neutral: number; // percentage
  };
  topKeywords: string[];
  trendVsPreviousPeriod: number; // percentage change
}

// AI generated insight
export interface FeedbackInsight {
  id: number;
  topic: string;
  insight: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-1
  relatedProducts?: string[];
  suggestedActions?: string[];
}

// Complete feedback analysis results
export interface FeedbackAnalysisResults {
  period: {
    start: string;
    end: string;
  };
  totalFeedbackCount: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sentimentTrend: number; // percentage change vs previous period
  customerTierBreakdown: {
    bronze: {
      count: number;
      averageRating: number;
    };
    silver: {
      count: number;
      averageRating: number;
    };
    gold: {
      count: number;
      averageRating: number;
    };
  };
  topKeywords: {
    keyword: string;
    count: number;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  productAnalysis: ProductFeedbackAnalysis[];
  insights: FeedbackInsight[];
  generatedAt: string;
}
