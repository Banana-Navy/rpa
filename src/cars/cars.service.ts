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
        'prix min divisé par 1,25': number;
        Marge: number;
        Statut: string;
        Message: string;
        Valider: number;
      }

      data = data.map((item: ExcelCarData) => {
        console.log(item);

        return {
          offer: item.Offre,
          brand: item.Marque,
          model: item.Modèle,
          carBody: item.Carrosserie,
          doorsNumber: item['Nombre de portes'],
          version: item.Version,
          registration: item.Immatriculation,
          fuelType: item.Carburant,
          power: item.Puissance,
          transmission: item.Transmission,
          kmEstimated: item['Kilométrage estimé'],
          autoscoutModel: item['Modèle Choisi'],
          autoscoutMinPrice: item['Prix minimum'],
          calculatedPrice: item['prix min divisé par 1,25'],
          calculatedMargin: item.Marge,
          status: item.Statut,
          message: item.Message,
          validation: item.Valider,
        };
      });

      const savedData = await this.carModel.create(data);
      return savedData;
    } catch (error) {
      console.error(error);
      return `error in service ${error}`;
    }
  }

  async findAll(): Promise<CreateCarDto[]> {
    try {
      const cars = await this.carModel.find();
      return cars;
    } catch (error) {
      return error;
    }
  }

  async findOne(id): Promise<CreateCarDto> {
    try {
      const car = await this.carModel.findById({ _id: id });
      return car;
    } catch (error) {}
  }
}
