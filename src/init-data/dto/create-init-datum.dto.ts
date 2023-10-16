import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class InitDataDto {
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
}
