
import {  Type } from "class-transformer";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/student/schema/student.schema';

export type InformationDocument = HydratedDocument<Information>;

@Schema({timestamps:true})
export class Information{

  @Prop({ required: true })
  sender: string; // người gửi

  @Prop({ required: true })
  content: string; // nội dung

  
}

export const InformationSchema = SchemaFactory.createForClass(Information);