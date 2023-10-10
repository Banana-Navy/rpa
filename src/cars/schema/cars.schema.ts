import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Car {
  @Prop({ type: String })
  Offer: string;

  @Prop({ type: String })
  Marque: string;

  @Prop({ type: String })
  Model: string;

  @Prop({ type: String })
  Version: string;

  @Prop({ type: String })
  Immatriculation: string;

  @Prop({ type: String })
  Carburant: string;

  @Prop({ type: String })
  Puissance: string;

  @Prop({ type: String })
  Transmission: string;

  @Prop({ type: String })
  KilometrageEstime: string;

  @Prop({ type: String })
  Degats: string;

  @Prop({ type: Number })
  PrixMinimum: number;

  @Prop({ type: Number })
  PrixMinDiv: number;

  @Prop({ type: Number })
  Marge: number;

  @Prop({ type: String })
  Statut: string;

  @Prop({ type: String })
  Message: string;

  @Prop({ type: Number })
  Valider: number;
}

export type CarDocument = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);
