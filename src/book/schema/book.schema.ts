import {  Type } from "class-transformer";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/student/schema/student.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  totalPage: number;

  
  @Prop({ required: true })
  author: string;
  
  @Prop({  type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
  @Type(() => Student)
  owner: Student;
  
}

export const BookSchema = SchemaFactory.createForClass(Book);