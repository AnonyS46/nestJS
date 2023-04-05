import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from 'src/book/schema/book.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema({timestamps:true})
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;
  
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop([{type:mongoose.Schema.Types.ObjectId ,ref: 'Book'}])
  @Type(()=>Book)
  books:Book[];

}

export const StudentSchema = SchemaFactory.createForClass(Student);