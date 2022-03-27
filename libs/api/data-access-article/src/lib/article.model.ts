import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true // will create createdAt and updatedAt fields
})
export class Article {
  // @Prop() @ApiProperty() text: string;
  // @Prop() @ApiProperty() author: string;
  @Prop() text: string;
  @Prop() author: string;
}

export type ArticleDocument = Article & Document;

// gonna create the schema for us:
export const ArticleSchema = SchemaFactory.createForClass(Article);
