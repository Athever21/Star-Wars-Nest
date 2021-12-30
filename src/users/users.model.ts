import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from "uuid";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, default:uuidv4})
  _id: string;

  @Prop({unique: true, required: true})
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Exclude() 
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);