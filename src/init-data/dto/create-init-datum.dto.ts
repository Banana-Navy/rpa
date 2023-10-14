import mongoose from 'mongoose';

export class CreateInitDatumDto {
  userId: mongoose.Types.ObjectId[];
  email: string;
  password: string;
  carsCount: number;
  maxKilometers: string;
  maxAvailability: string;
  year: string;
  ratio: string;
}
