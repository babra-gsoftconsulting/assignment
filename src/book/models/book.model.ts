import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  gerne: string;

  @Prop({ required: true, type: Types.ObjectId })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
