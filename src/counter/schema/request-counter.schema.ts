import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RequestCounter {
  @Prop({ type: Number, default: 0 })
  nomberOfRequest: number;
}

export type RequestCounterDocument = RequestCounter & Document;
export const RequestCounterSchema =
  SchemaFactory.createForClass(RequestCounter);
