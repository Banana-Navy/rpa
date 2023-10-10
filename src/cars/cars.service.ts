import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CarDocument } from './schema/cars.schema';
import { Model } from 'mongoose';
import * as XLSX from 'xlsx';

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
        Marque: string;
        Modèle: string;
        Version: string;
        Immatriculation: string;
        Carburant: string;
        Puissance: string;
        Transmission: string;
        'Kilométrage estimé': string;
        'prix min divisé par 1,25': number;
        marge: number;
        message: string;
        statut: string;
        Valider: number;
      }

      data = data.map((item: ExcelCarData) => {
        console.log(item);

        return {
          Marque: item.Marque,
          Model: item.Modèle,
          Version: item.Version,
          Immatriculation: item.Immatriculation,
          Carburant: item.Carburant,
          Puissance: item.Puissance,
          Transmission: item.Transmission,
          KilometrageEstime: item['Kilométrage estimé'],
          PrixMinDiv: item['prix min divisé par 1,25'],
          Marge: item.marge,
          Degats: item['dégâts'],
          Message: item.message,
          Status: item.statut,
          Valider: item.Valider,
        };
      });

      const savedData = await this.carModel.create(data);
      return savedData;
    } catch (error) {
      console.error(error);
      return `error in service ${error}`;
    }
  }

  async findAll() {
    try {
      const cars = await this.carModel.find();
      return cars;
    } catch (error) {
      return error;
    }
  }

  async findOne(id) {
    try {
      const car = await this.carModel.findById({ _id: id });
      return car;
    } catch (error) {}
  }
}
