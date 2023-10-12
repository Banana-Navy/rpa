import { Module } from '@nestjs/common';
import { InitDataService } from './init-data.service';
import { InitDataController } from './init-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { initDataSchema } from './schema/init-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'initData', schema: initDataSchema }]),
  ],
  controllers: [InitDataController],
  providers: [InitDataService],
})
export class InitDataModule {}
