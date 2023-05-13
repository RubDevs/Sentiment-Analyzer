import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type SentimentDocument = HydratedDocument<Sentiment>;

@Schema({ timestamps: true })
export class Sentiment {
  @Prop()
  @ApiProperty()
  text: string;

  @Prop()
  @ApiProperty()
  score?: number;

  @Prop()
  @ApiProperty()
  magnitude?: number;
}

export const SentimentSchema = SchemaFactory.createForClass(Sentiment);
