import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        // mongodb+srv://okara:b20c2271@bananadev.u7tbh.mongodb.net/Banana_DEV?retryWrites=true&w=majority
        uri: 'mongodb+srv://mahmoudioomar7:9nBqRlfIAVQx0SWp@robocorpdev.9e5qvgr.mongodb.net/robocorp?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    UsersModule,
    AuthModule,
    CarsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
