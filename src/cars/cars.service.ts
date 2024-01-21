import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CarDocument } from './schema/cars.schema';
import { Model } from 'mongoose';
import * as XLSX from 'xlsx';
import { initDataDocument } from 'src/init-data/schema/init-data.schema';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel('Car')
    private readonly carModel: Model<CarDocument>,
    @InjectModel('initData')
    private readonly initdataModel: Model<initDataDocument>,
  ) {}

  async create(file) {
    try {
      const userId = '65195cde8aebd78605140087';

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
        Interieur: string;
        Proprietaires: string;
        'Numero de chassi': string;
        'Nombre de cles': string;
        Couleur: string;
        Marge: string;
        Statut: string;
        Message: string;
        Valider: number;
        initData: string;
      }

      for (const item of data) {
        const carId = item['Offre'];
        const existingCar = await this.carModel.find({ carId: carId });
        const prixMinimum = item['Prix minimum'];

        const cleanedPrixMinimum =
          typeof prixMinimum === 'string'
            ? prixMinimum.replace(/[^0-9]/g, '')
            : prixMinimum;

        const autoscoutMinPrice =
          typeof cleanedPrixMinimum === 'string'
            ? parseInt(cleanedPrixMinimum, 10)
            : cleanedPrixMinimum;

        const prixMoyen = item['Prix moyen']
          ? parseFloat(item['Prix moyen']).toFixed(2)
          : null;

        const carData = {
          carId,
          brand: item['Marque'],
          model: item['Modèle'],
          carBody: item['Carrosserie'],
          doorsNumber: item['Nombre de portes'].trim(),
          version: item['Version'],
          registration: item['Immatriculation'],
          fuelType: item['Carburant'],
          power: item['Puissance'],
          transmission: item['Transmission'],
          kmEstimated: item['Kilométrage estimé'],
          autoscoutModel: item['Modèle Choisi'],
          autoscoutMinPrice: autoscoutMinPrice,
          calculatedPrice: item['Prix minimum divisé'],
          avgPrice: prixMoyen,
          calculatedMargin: item['Marge'],
          interior: data['Interieur'],
          chassiNumber: data['Numero de chassi'],
          keyNumber: data['Nombre de cles'],
          owners: data['Proprietaires'],
          color: data['Couleur'],
          status: item['Statut'],
          message: item['Message'],
          validation: item['Valider'],
          initData: null,
        };

        const initData = await this.initdataModel.find({ userId: userId });

        if (initData) {
          carData.initData = initData[0]._id;
        }

        if (existingCar.length == 0) {
          await this.carModel.create(carData);
        } else {
          await this.carModel.updateOne({ carId: carId }, { $set: carData });
        }
      }
    } catch (error) {
      console.error(error);
      return `error in service ${error}`;
    }
  }

  async addOneCar(data) {
    try {
      console.log('addOneCar');

      const userId = '65195cde8aebd78605140087';

      const initData = await this.initdataModel.find({ userId: userId });

      const existingCar = await this.carModel.find({ carId: data.Offre });

      console.log(existingCar.length);

      const prixMinimum = data['Prix minimum'];

      const cleanedPrixMinimum =
        typeof prixMinimum === 'string'
          ? prixMinimum.replace(/[^0-9]/g, '')
          : prixMinimum;

      const autoscoutMinPrice =
        typeof cleanedPrixMinimum === 'string'
          ? parseInt(cleanedPrixMinimum, 10)
          : cleanedPrixMinimum;

      const prixMoyen = data['Prix moyen']
        ? parseFloat(data['Prix moyen']).toFixed(2)
        : null;

      if (existingCar.length == 0) {
        const res = await this.carModel.create({
          carId: data.Offre,
          brand: data.Marque,
          model: data['Modèle'],
          carBody: data['Carrosserie'],
          doorsNumber: data['Nombre de portes'],
          version: data.Version,
          registration: data.Immatriculation,
          fuelType: data.Carburant,
          power: data.Puissance,
          transmission: data.Transmission,
          kmEstimated: data['Kilométrage estimé'],
          autoscoutModel: data['Modele Choisi'],
          autoscoutMinPrice: autoscoutMinPrice,
          calculatedPrice: data['Prix minimum divisé'],
          avgPrice: prixMoyen,
          calculatedMargin: data['Marge'],
          interior: data['Interieur'],
          chassiNumber: data['Numero de chassi'],
          keyNumber: data['Nombre de cles'],
          owners: data['Proprietaires'],
          color: data['Couleur'],
          status: data['status'],
          message: data['Message'],
          validation: data['Valider'],
          initData: initData[0]._id,
        });
      } else {
        const res = await this.carModel.updateOne(
          { carId: data.Offre },
          {
            $set: {
              carId: data.Offre,
              brand: data.Marque,
              model: data['Modèle'],
              carBody: data['Carrosserie'],
              doorsNumber: data['Nombre de portes'],
              version: data.Version,
              registration: data.Immatriculation,
              fuelType: data.Carburant,
              power: data.Puissance,
              transmission: data.Transmission,
              kmEstimated: data['Kilométrage estimé'],
              autoscoutModel: data['Modele Choisi'],
              autoscoutMinPrice: autoscoutMinPrice,
              calculatedPrice: data['Prix minimum divisé'],
              avgPrice: data['Prix moyen'],
              calculatedMargin: data['Marge'],
              interior: data['Interieur'],
              chassiNumber: data['Numero de chassi'],
              keyNumber: data['Nombre de cles'],
              owners: data['Proprietaires'],
              color: data['Couleur'],
              status: data['status'],
              message: data['Message'],
              validation: data['Valider'],
              initData: initData[0]._id,
            },
          },
        );
      }
    } catch (error) {
      return error;
    }
  }

  async updateAutoOneCarByCarId(data) {
    try {
      const userId = '65195cde8aebd78605140087';

      const initData = await this.initdataModel.find({ userId: userId });

      await this.carModel.updateOne(
        { carId: data.carId },
        {
          $set: {
            carId: data.carId,
            brand: data.brand,
            model: data.model,
            carBody: data.carBody,
            doorsNumber: data.doorsNumber,
            version: data.version,
            registration: data.registration,
            fuelType: data.fuelType,
            power: data.power,
            transmission: data.transmission,
            kmEstimated: data.kmEstimated,
            autoscoutModel: data.autoscoutModel,
            autoscoutMinPrice: data.autoscoutMinPrice,
            calculatedPrice: data.calculatedPrice,
            avgPrice: data.avgPrice,
            calculatedMargin: data.calculatedMargin,
            interior: data.interior,
            chassiNumber: data.chassiNumber,
            keyNumber: data.keyNumber,
            owners: data.owners,
            color: data.color,
            status: data.status,
            autoOnePrice: data.autoOnePrice,
            message: data.message,
            validation: data.validation,
            initData: initData[0]._id,
          },
        },
      );
    } catch (error) {
      return error;
    }
  }

  async getCars(weeks = 1): Promise<any> {
    try {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - weeks * 7);

      const cars = await this.carModel
        .find({
          createdAt: { $gte: startDate, $lte: currentDate },
        })
        .sort({ createdAt: -1 })
        .populate('initData');

      return cars;
    } catch (error) {
      return error;
    }
  }

  async getTodayCars(): Promise<any> {
    try {
      const todayDate = new Date();
      const todayCars = await this.carModel.find({
        createdAt: {
          $gte: new Date(todayDate.setHours(0, 0, 0, 0)),
          $lt: new Date(todayDate.setHours(23, 59, 59, 999)),
        },
      });
      return todayCars;
    } catch (error) {
      console.log(error);
    }
  }

  async getCar(carId): Promise<any> {
    try {
      const car = await this.carModel
        .findOne({ carId: carId })
        .populate('initData');
      return car;
    } catch (error) {}
  }
  async autoOnePendingCars(): Promise<any> {
    try {
      const car = await this.carModel.find({ status: 'AutoOnePending' });
      return car;
    } catch (error) {}
  }
}
