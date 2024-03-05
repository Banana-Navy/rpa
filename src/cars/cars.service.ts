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

    

      for (const item of data) {
        console.log(item)
        console.log("****************")
        console.log(data)
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

        const prixMoyen = item['autoscoutMinPrice']
          ? parseFloat(item['autoscoutMinPrice']).toFixed(2)
          : null;

        const carData = {
          carId,
          brand: item['brand'],
          model: item['model'],
          carBody: item['carBody'],
          doorsNumber: item['doorsNumber'].trim(),
          version: item['version'],
          registration: item['registration'],
          fuelType: item['fuelType'],
          power: item['power'],
          transmission: item['transmission'],
          kmEstimated: item['kmEstimated'],
          autoscoutModel: item['autoscoutModel'],
          autoscoutMinPrice: autoscoutMinPrice,
          calculatedPrice: item['calculatedPrice'],
          avgPrice: prixMoyen,
          calculatedMargin: item['marge'],
          interior: data['interior'],
          chassiNumber: data['chassiNumber'],
          keyNumber: data['keyNumber'],
          owners: data['owners'],
          color: data['color'],
          message: item['message'],
          validation: item['validation'],
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

      console.log('################');
      console.log(data);
      console.log('################');

      const userId = '65195cde8aebd78605140087';

      const initData = await this.initdataModel.find({ userId: userId });

      const existingCar = await this.carModel.find({ carId: data.carId });

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

      const prixMoyen = data['autoscoutMinPrice']
        ? parseFloat(data['autoscoutMinPrice']).toFixed(2)
        : null;

      if (existingCar.length == 0) {
        const res = await this.carModel.create({
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
          autoscoutMinPrice: autoscoutMinPrice,
          calculatedPrice: data.calculatedPrice,
          avgPrice: prixMoyen,
          calculatedMargin: data.calculatedMargin,
          interior: data['interior'],
          chassiNumber: data['chassiNumber'],
          keyNumber: data['keyNumber'],
          owners: data['owners'],
          color: data['color'],
          status: data['status'],
          autoOneStatus: data.autoOneStatus,
          autoScoutStatus: data.autoScoutStatus,
          message: data['message'],
          validation: data['validation'],
          initData: initData[0]._id,
        });
      } else {
        const res = await this.carModel.updateOne(
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
              autoscoutMinPrice: autoscoutMinPrice,
              calculatedPrice: data.calculatedPrice,
              avgPrice: data['autoscoutMinPrice'],
              calculatedMargin: data.calculatedMargin,
              interior: data['interior'],
              chassiNumber: data['chassiNumber'],
              keyNumber: data['keyNumber'],
              owners: data['owners'],
              color: data['color'],
              status: data['status'],
              autoOneStatus: data.autoOneStatus,
              autoScoutStatus: data.autoScoutStatus,
              message: data['message'],
              validation: data['validation'],
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
            autoOneStatus: data.autoOneStatus,
            autoScoutStatus: data.autoScoutStatus,
            status: data.status,
            autoOnePrice: data.autoOnePrice,
            message: data.message,
            validation: data.validation,
            initData: initData[0]._id,
          },
        },
      );
    
    let updateted = await this.initdataModel.findOneAndUpdate({ autoOneRequestCount: initData[0].autoOneRequestCount });
      console.log(updateted);
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

  async getTodayCars(status): Promise<any> {
    try {
      if (status == 'TODAY') {
        const todayDate = new Date();
        const todayCars = await this.carModel.find({
          createdAt: {
            $gte: new Date(todayDate.setHours(0, 0, 0, 0)),
            $lt: new Date(todayDate.setHours(23, 59, 59, 999)),
          },
          autoOneStatus: '',
        });
        return todayCars;
      } else if (status == 'PENDING') {
        const todayDate = new Date();
        const todayCars = await this.carModel.find({
          createdAt: {
            $gte: new Date(todayDate.setHours(0, 0, 0, 0)),
            $lt: new Date(todayDate.setHours(23, 59, 59, 999)),
          },
          autoOneStatus: 'PENDING',
        });
        return todayCars;
      }
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
