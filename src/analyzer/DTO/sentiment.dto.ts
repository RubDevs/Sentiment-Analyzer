import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SentimentDto {
  @ApiProperty({
    description: 'The text to analyze',
  })
  @IsString()
  @MinLength(10)
  text: string;
}
