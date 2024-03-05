import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class InitDataDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  carsCount: number;
  @ApiProperty()
  maxKilometers: string;
  @ApiProperty()
  maxAvailability: string;
  @ApiProperty()
  year: string;
  @ApiProperty()
  ratio: string;
  @ApiProperty()
  priceEstimationStatus: boolean;
  @ApiProperty()
  autoOneRequestCount: number;
}
