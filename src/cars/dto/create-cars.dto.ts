export class CreateCarDto {
  _id?: string;
  carId: string;
  brand: string;
  model: string;
  carBody: string;
  doorsNumber: string;
  version: string;
  registration: string;
  fuelType: string;
  power: string;
  transmission: string;
  kmEstimated: string;
  autoscoutModel: string;
  autoscoutMinPrice: number;
  calculatedPrice: number;
  calculatedMargin: number;
  status: string;
  message: string;
  validation: number;
}
