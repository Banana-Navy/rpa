// request-counter.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { initDataDocument } from 'src/init-data/schema/init-data.schema';

@Injectable()
export class RequestCounterService {
  constructor(
    @InjectModel('initData')
    private readonly initdataModel: Model<initDataDocument>,
  ) {}

  private async getInitDataDocument(): Promise<initDataDocument | null> {
    try {
      return await this.initdataModel.findOne({});
    } catch (error) {
      throw error;
    }
  }

  async increment() {
    try {
      const initData = await this.getInitDataDocument();
      if (initData) {
        initData.nomberOfRequest++;
        await initData.save();
      }
    } catch (error) {
      throw error;
    }
  }

  async getCount(): Promise<number> {
    try {
      const initData = await this.getInitDataDocument();
      return initData ? initData.nomberOfRequest : 0;
    } catch (error) {
      throw error;
    }
  }
}
