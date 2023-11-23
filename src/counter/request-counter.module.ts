import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { initDataSchema } from 'src/init-data/schema/init-data.schema';
import { InitDataService } from 'src/init-data/init-data.service';
import { RequestCounterController } from './request-counter.controller';
import { RequestCounterService } from './request-counter.service';
import { RequestCounterSchema } from './schema/request-counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'initData', schema: initDataSchema }]),
  ],
  controllers: [RequestCounterController],
  providers: [RequestCounterService, InitDataService],
  exports: [RequestCounterService], // Make sure to export the service
})
export class RequestCounterModule {}
