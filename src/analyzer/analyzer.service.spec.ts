import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerService } from './analyzer.service';
import { MockSentimentAnalizer } from '../mock/mock-sentiment-analyzer';
import { getModelToken } from '@nestjs/mongoose';
import { Sentiment, SentimentDocument } from './schemas/sentiment.schema';
import {
  MockSentimentDocument,
  MockSentimentModel,
} from '../mock/mock-sentiment-model';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';
import { SentimentAnalyzer } from './interfaces/sentiment-analyzer';
import { Model } from 'mongoose';

describe('AppController', () => {
  let analyzerService: AnalyzerService;
  let sentimentAnalyzer: SentimentAnalyzer;
  let sentimentModel: Model<SentimentDocument>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot({ transports: [new transports.Console()] }),
      ],
      controllers: [],
      providers: [
        AnalyzerService,
        { provide: 'SentimentAnalyzer', useClass: MockSentimentAnalizer },
        {
          provide: getModelToken(Sentiment.name),
          useValue: MockSentimentModel,
        },
      ],
    }).compile();

    analyzerService = app.get<AnalyzerService>(AnalyzerService);
    sentimentAnalyzer = app.get<SentimentAnalyzer>('SentimentAnalyzer');
    sentimentModel = app.get<Model<SentimentDocument>>(
      getModelToken(Sentiment.name),
    );
  });

  describe('Analyzer Service', () => {
    it('should call the analyzeSentiment function of the provided SentimentAnalizer and create a new Document with the result', async () => {
      jest.spyOn(sentimentAnalyzer, 'analyzeSentiment');
      jest.spyOn(sentimentModel, 'create');
      await analyzerService.analyzeSentiment('testing text from service');
      expect(sentimentAnalyzer.analyzeSentiment).toHaveBeenCalledWith(
        'testing text from service',
      );
      expect(sentimentModel.create).toHaveBeenCalledWith({
        ...MockSentimentDocument,
        text: 'testing text from service',
      });
    });
  });
});
