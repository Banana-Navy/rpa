import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  initData,
  initDataDocument,
} from 'src/init-data/schema/init-data.schema';

@Schema({ timestamps: true })
export class Car {
  @Prop({ type: String, default: '' })
  carId: string;

  @Prop({ type: String, default: '' })
  brand: string;

  @Prop({ type: String, default: '' })
  model: string;

  @Prop({ type: String, default: '' })
  carBody: string;

  @Prop({ type: String, default: '' })
  doorsNumber: string;

  @Prop({ type: String, default: '' })
  version: string;

  @Prop({ type: String, default: '' })
  registration: string;

  @Prop({ type: String, default: '' })
  fuelType: string;

  @Prop({ type: String, default: '' })
  power: string;

  @Prop({ type: String, default: '' })
  transmission: string;

  @Prop({ type: String, default: '' })
  kmEstimated: string;

  @Prop({ type: String, default: '' })
  autoscoutModel: string;

  @Prop({ type: Number, default: '' })
  autoscoutMinPrice: number;

  // prix divsé par 1.25 ou 1.6
  @Prop({ type: String, default: '' })
  calculatedPrice: string;

  @Prop({ type: Number, default: '' })
  avgPrice: number;

  @Prop({ type: String, default: '' })
  calculatedMargin: string;

  @Prop({ type: String, default: '' })
  status: string;

  @Prop({ type: Number, default: '' })
  validation: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'init-data' })
  initData: mongoose.Types.ObjectId;
}

export type CarDocument = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);
