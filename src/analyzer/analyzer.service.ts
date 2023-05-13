import { Inject, Injectable } from '@nestjs/common';
import { SentimentAnalyzer } from './interfaces/sentiment-analyzer';
import { Sentiment, SentimentDocument } from './schemas/sentiment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AnalyzerService {
  constructor(
    @Inject('SentimentAnalyzer')
    private readonly sentimentAnalizer: SentimentAnalyzer,
    @InjectModel(Sentiment.name)
    private sentimentModel: Model<SentimentDocument>,
  ) {}
  async analyzeSentiment(text: string): Promise<Sentiment> {
    const { score, magnitude } = await this.sentimentAnalizer.analyzeSentiment(
      text,
    );
    return this.sentimentModel.create({
      text,
      score,
      magnitude,
    });
  }
}
