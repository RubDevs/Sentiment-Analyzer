import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';
import { MockSentimentAnalizer } from '../mock/mock-sentiment-analyzer';
import { getModelToken } from '@nestjs/mongoose';
import { Sentiment } from './schemas/sentiment.schema';
import { MockSentimentModel } from '../mock/mock-sentiment-model';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

describe('AppController', () => {
  let analyzerController: AnalyzerController;
  let analyzerService: AnalyzerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot({ transports: [new transports.Console()] }),
      ],
      controllers: [AnalyzerController],
      providers: [
        AnalyzerService,
        { provide: 'SentimentAnalyzer', useClass: MockSentimentAnalizer },
        {
          provide: getModelToken(Sentiment.name),
          useValue: MockSentimentModel,
        },
      ],
    }).compile();

    analyzerController = app.get<AnalyzerController>(AnalyzerController);
    analyzerService = app.get<AnalyzerService>(AnalyzerService);
  });

  describe('Analyzer Controller', () => {
    it('should call the service with the provided text', async () => {
      jest.spyOn(analyzerService, 'analyzeSentiment');
      await analyzerController.analyzeSentiment({ text: 'testing text' });
      expect(analyzerService.analyzeSentiment).toHaveBeenCalledWith(
        'testing text',
      );
    });
  });
});
