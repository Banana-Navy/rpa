import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CarDocument } from './schema/cars.schema';
import { Model } from 'mongoose';
import * as XLSX from 'xlsx';
import { CreateCarDto } from './dto/create-cars.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel('Car')
    private readonly carModel: Model<CarDocument>,
  ) {}

  async create(file) {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let data = XLSX.utils.sheet_to_json(worksheet);

      interface ExcelCarData {
        Offre: string;
        Marque: string;
        Modèle: string;
        Carrosserie: string;
        'Nombre de portes': string;
        Version: string;
        Immatriculation: string;
        Carburant: string;
        Puissance: string;
        Transmission: string;
        'Kilométrage estimé': string;
        'Modèle Choisi': string;
        'Prix minimum': string;
        'prix min divisé par 1,25': string;
        avgPrice: string;
        Marge: string;
        Statut: string;
        Message: string;
        Valider: number;
      }

      data = data.map(async (item: ExcelCarData) => {
        const carId = item.Offre;
        const existingCar = await this.carModel.findOne({ carId });

        if (!existingCar) {
          const autoscoutMinPrice = item['Prix minimum']
            ? parseInt(item['Prix minimum'].replace('.', ''), 10)
            : null;
          const carData = {
            carId,
            brand: item.Marque,
            model: item.Modèle,
            carBody: item.Carrosserie,
            doorsNumber: item['Nombre de portes'].trim(),
            version: item.Version,
            registration: item.Immatriculation,
            fuelType: item.Carburant,
            power: item.Puissance,
            transmission: item.Transmission,
            kmEstimated: item['Kilométrage estimé'],
            autoscoutModel: item['Modèle Choisi'],
            autoscoutMinPrice: autoscoutMinPrice,
            calculatedPrice: item['prix min divisé par 1,25'],
            avgPrice: item['Prix moyen'],
            calculatedMargin: item.Marge,
            status: item.Statut,
            message: item.Message,
            validation: item.Valider,
          };
          await this.carModel.create(carData);
        }
      });
    } catch (error) {
      console.error(error);
      return `error in service ${error}`;
    }
  }

  async getCars(): Promise<any> {
    try {
      const cars = await this.carModel.find();
      return cars;
    } catch (error) {
      return error;
    }
  }

  async getCar(carId): Promise<any> {
    try {
      const car = await this.carModel.findOne({ carId: carId });
      return car;
    } catch (error) {}
  }
}
