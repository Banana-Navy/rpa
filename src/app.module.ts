import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CarsModule } from './cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { InitDataModule } from './init-data/init-data.module';
import { RequestCounter } from './counter/request-counter';
import { RequestCounterService } from './counter/request-counter.service';
import { RequestCounterModule } from './counter/request-counter.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    UsersModule,
    AuthModule,
    CarsModule,
    InitDataModule,
    RequestCounterModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly requestCounterService: RequestCounterService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestCounter).forRoutes('*');
  }
}
