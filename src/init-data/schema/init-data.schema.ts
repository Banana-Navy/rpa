import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class initData {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  userId: mongoose.Types.ObjectId[];

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String, default: '' })
  password: string;

  @Prop({ type: Number, default: '' })
  carsCount: number;

  @Prop({ type: String, default: '' })
  maxKilometers: string;

  @Prop({ type: String, default: '' })
  maxAvailability: string;

  @Prop({ type: String, default: '' })
  year: string;

  @Prop({ type: String, default: '' })
  ratio: string;
}

export type initDataDocument = initData & Document;
export const initDataSchema = SchemaFactory.createForClass(initData);
