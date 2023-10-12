import { Injectable } from '@nestjs/common';
import { CreateInitDatumDto } from './dto/create-init-datum.dto';
import { UpdateInitDatumDto } from './dto/update-init-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as XLSX from 'xlsx';
import { Model } from 'mongoose';
import { initDataDocument } from './schema/init-data.schema';

@Injectable()
export class InitDataService {
  constructor(
    @InjectModel('initData')
    private readonly initdataModel: Model<initDataDocument>,
  ) {}
  async create(file) {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Define the expected data structure
      interface ExcelData {
        key: string;
        value: any;
      }

      const data: ExcelData[] = XLSX.utils.sheet_to_json(worksheet, {
        header: ['key', 'value'],
      });

      // Create an empty object to store the transformed data
      const myData = {};

      for (const item of data) {
        myData[item.key] = item.value;
      }

      const initData = {
        address: myData['Adresse'] || '',
        password: myData['Mot de passe'] || '',
        carsNumber: myData['Nombre du voiture'] || 0,
        maxKilometers: myData['Kilométrage (max)'] || '',
        maxAvailability: myData['Disponibilité maximale'] || '',
        year: myData['Année (min)'] || '',
        TTC: myData['TTC'] || '',
      };
      await this.initdataModel.create(initData);
    } catch (error) {
      console.error(error);
      return `Error: ${error}`;
    }
  }

  async getRatio() {
    try {
      const data = await this.initdataModel.find();
      return data[0].TTC;
    } catch (error) {
      return;
    }
  }
}
