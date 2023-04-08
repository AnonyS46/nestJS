import {  Type } from "class-transformer";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/student/schema/student.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string; // tiêu đề

  @Prop({ required: true })
  totalPage: number; //tổng số trang

  
  @Prop({ required: true })
  author: string; //tác giả
  
  @Prop({  type: mongoose.Schema.Types.ObjectId, ref: 'Student'})
  @Type(() => Student)
  owner: Student; //chủ sở hữu
  
}

export const BookSchema = SchemaFactory.createForClass(Book);