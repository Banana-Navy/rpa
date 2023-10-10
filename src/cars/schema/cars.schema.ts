import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Car {
  @Prop({ type: String, default: '' })
  offer: string;

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
  @Prop({ type: Number, default: '' })
  calculatedPrice: number;

  @Prop({ type: Number, default: '' })
  calculatedMargin: number;

  @Prop({ type: String, default: '' })
  status: string;

  @Prop({ type: String, default: '' })
  message: string;

  @Prop({ type: Number, default: '' })
  validation: number;
}

export type CarDocument = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);
