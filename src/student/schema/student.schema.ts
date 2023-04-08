import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/book/schema/book.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema({timestamps:true})
export class Student {
  @Prop({ required: true })
  name: string; // họ tên

  @Prop({ required: true })
  age: number; //tuổi
  
  @Prop({ required: true })
  address: string; //địa chỉ

  @Prop({ required: true })
  phone: string; // số điện thoại

  @Prop([{type:mongoose.Schema.Types.ObjectId ,ref: 'Book'}])
  @Type(()=>Book)
  books:Book[]; // danh sách sách sở hữu

}

export const StudentSchema = SchemaFactory.createForClass(Student);