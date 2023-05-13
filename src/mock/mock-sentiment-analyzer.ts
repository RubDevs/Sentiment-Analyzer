import { Injectable } from '@nestjs/common';
import { Sentiment } from '../analyzer/schemas/sentiment.schema';
import { SentimentAnalyzer } from '../analyzer/interfaces/sentiment-analyzer';

@Injectable()
export class MockSentimentAnalizer implements SentimentAnalyzer {
  analyzeSentiment(text: string): Promise<Omit<Sentiment, 'text'>> {
    return Promise.resolve({ score: 0.884759, magnitude: 0.7585 });
  }
}
