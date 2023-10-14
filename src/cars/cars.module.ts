import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarSchema } from './schema/cars.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { initDataSchema } from 'src/init-data/schema/init-data.schema';
import { InitDataService } from 'src/init-data/init-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Car', schema: CarSchema },
      { name: 'initData', schema: initDataSchema },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService, InitDataService],
})
export class CarsModule {}
