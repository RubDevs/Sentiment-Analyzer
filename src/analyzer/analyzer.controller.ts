import { Body, Controller, Post } from '@nestjs/common';
import { AnalyzerService } from './analyzer.service';
import { Sentiment } from './schemas/sentiment.schema';
import { SentimentDto } from './DTO/sentiment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sentiments')
@Controller('sentiments')
export class AnalyzerController {
  constructor(private readonly analizerService: AnalyzerService) {}

  @ApiOperation({
    summary: 'Get the sentiment analysis of a text',
  })
  @ApiResponse({
    status: 201,
    description: 'The result of the sentiment analysis',
    type: Sentiment,
  })
  @Post()
  analyzeSentiment(@Body() { text }: SentimentDto): Promise<Sentiment> {
    return this.analizerService.analyzeSentiment(text);
  }
}
