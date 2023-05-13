import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { SentimentAnalyzer } from './interfaces/sentiment-analyzer';
import { Sentiment, SentimentDocument } from './schemas/sentiment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AnalyzerService {
  constructor(
    @Inject('SentimentAnalyzer')
    private readonly sentimentAnalyzer: SentimentAnalyzer,
    @InjectModel(Sentiment.name)
    private readonly sentimentModel: Model<SentimentDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
  ) {}
  /**
   * Function that analyzes the sentiment of a given text using a sentiment
   * analyzer and creates a sentiment document with the score and magnitude of the sentiment.
   * @param {string} text - The text that needs to be analyzed for sentiment.
   * @returns The function `analyzeSentiment` returns a Promise that resolves to a `Sentiment` object.
   */
  async analyzeSentiment(text: string): Promise<Sentiment> {
    try {
      const { score, magnitude } =
        await this.sentimentAnalyzer.analyzeSentiment(text);
      return this.sentimentModel.create({
        text,
        score,
        magnitude,
      });
    } catch (error) {
      this.logger.error(
        `[App] Error processing the Sentiment Analysis: ${error}`,
      );
      throw error;
    }
  }
}
