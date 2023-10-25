import { ApiProperty } from '@nestjs/swagger';
import { initData } from 'src/init-data/schema/init-data.schema';

export class CarDto {
  _id?: string;
  @ApiProperty()
  carId: string;
  @ApiProperty()
  brand: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  carBody: string;
  @ApiProperty()
  doorsNumber: string;
  @ApiProperty()
  version: string;
  @ApiProperty()
  registration: string;
  @ApiProperty()
  fuelType: string;
  @ApiProperty()
  power: string;
  @ApiProperty()
  transmission: string;
  @ApiProperty()
  kmEstimated: string;
  autoscoutModel: string;
  @ApiProperty()
  autoscoutMinPrice: number;
  @ApiProperty()
  calculatedPrice: string;
  @ApiProperty()
  avgPrice: number;
  @ApiProperty()
  calculatedMargin: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  validation: number;
  @ApiProperty()
  initData: string;
}
