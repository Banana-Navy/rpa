import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class initData {
  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: String, default: '' })
  password: string;

  @Prop({ type: Number, default: '' })
  carsNumber: number;

  @Prop({ type: String, default: '' })
  maxKilometers: string;

  @Prop({ type: String, default: '' })
  maxAvailability: string;

  @Prop({ type: String, default: '' })
  year: string;

  @Prop({ type: String, default: '' })
  TTC: string;
}

export type initDataDocument = initData & Document;
export const initDataSchema = SchemaFactory.createForClass(initData);
