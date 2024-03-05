import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { initDataSchema } from 'src/init-data/schema/init-data.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'initData', schema: initDataSchema },

        ]),

    ],
    providers: [
        TasksService
    ],
})
export class TasksModule {}
