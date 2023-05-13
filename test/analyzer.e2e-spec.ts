import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MockSentimentAnalizer } from '../src/mock/mock-sentiment-analyzer';
import {
  Sentiment,
  SentimentDocument,
} from '../src/analyzer/schemas/sentiment.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('Analyzer (e2e)', () => {
  let app: INestApplication;
  let sentimentModel: Model<SentimentDocument>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    })
      .overrideProvider('SentimentAnalyzer')
      .useClass(MockSentimentAnalizer)
      .compile();

    app = moduleFixture.createNestApplication();
    sentimentModel = app.get<Model<SentimentDocument>>(
      getModelToken(Sentiment.name),
    );
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  it('/sentiments (POST) should return the Sentiment Analysis and save a new Document with the result', async () => {
    const text = `Testing text to be Analyzed ${new Date().getTime()}`;
    const result = await request(app.getHttpServer())
      .post('/sentiments')
      .send({ text });
    expect(result.status).toBe(201);
    const lastDocument = await sentimentModel
      .findOne()
      .sort({ _id: -1 })
      .exec();
    expect(lastDocument.text).toBe(text);
    // The score returned by the MockSentimentAnalizer is always 0.884759
    expect(lastDocument.score).toBe(0.884759);
  });

  it('/sentiments (POST) should return a 400 error if the Text length is less than 10', async () => {
    const text = `Testing`;
    const result = await request(app.getHttpServer())
      .post('/sentiments')
      .send({ text });
    expect(result.status).toBe(400);
    expect(result.body.message[0]).toBe(
      'text must be longer than or equal to 10 characters',
    );
  });

  afterAll(async () => {
    await sentimentModel.deleteMany().exec();
    await app.close();
  });
});
