import { Sentiment } from '../schemas/sentiment.schema';

export interface SentimentAnalyzer {
  analyzeSentiment(text: string): Promise<Omit<Sentiment, 'text'>>;
}
