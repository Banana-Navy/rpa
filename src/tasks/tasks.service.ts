import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { initDataDocument } from 'src/init-data/schema/init-data.schema';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel('initData')
        private readonly initdataModel: Model<initDataDocument>,
    ) {}
    private readonly logger = new Logger(TasksService.name);

    //! TODO: https://stackoverflow.com/questions/70168350/prevent-multiple-cron-running-in-nest-js-on-docker

    @Cron('0 0 1 * *') // Run at midnight on the first day of every month
    //  @Cron('45 * * * * *')
    async handleSuggestionsCron() {
        console.log("the cron it works");
        const userId = '65195cde8aebd78605140087';
        const initData = await this.initdataModel.findOneAndUpdate({ userId: userId },{autoOneRequestCount: 250 });

    }
}
