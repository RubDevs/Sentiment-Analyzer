import { LanguageServiceClient } from '@google-cloud/language';
import { Injectable } from '@nestjs/common';
import { Sentiment } from '../schemas/sentiment.schema';
import { SentimentAnalyzer } from '../interfaces/sentiment-analyzer';

@Injectable()
export class GoogleSentimentAnalizer implements SentimentAnalyzer {
  private client: LanguageServiceClient;
  constructor() {
    this.client = new LanguageServiceClient();
  }
  async analyzeSentiment(text: string): Promise<Omit<Sentiment, 'text'>> {
    const [result] = await this.client.analyzeSentiment({
      document: { content: text, type: 'PLAIN_TEXT' },
    });
    return result.documentSentiment;
  }
}
