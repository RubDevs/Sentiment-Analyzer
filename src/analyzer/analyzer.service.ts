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
    private readonly sentimentAnalizer: SentimentAnalyzer,
    @InjectModel(Sentiment.name)
    private sentimentModel: Model<SentimentDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
  ) {}
  async analyzeSentiment(text: string): Promise<Sentiment> {
    try {
      const { score, magnitude } =
        await this.sentimentAnalizer.analyzeSentiment(text);
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
