import { Module } from '@nestjs/common';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sentiment, SentimentSchema } from './schemas/sentiment.schema';
import { GoogleSentimentAnalizer } from './providers/google-sentiment-analizer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sentiment.name, schema: SentimentSchema },
    ]),
  ],
  controllers: [AnalyzerController],
  providers: [
    AnalyzerService,
    {
      provide: 'SentimentAnalyzer',
      useClass: GoogleSentimentAnalizer,
    },
  ],
})
export class AnalyzerModule {}
