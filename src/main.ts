import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(process.env.PORT);
}

// 2WNw392Qb5V1VbYmSIbNzFphd5x_52HsCrKRKe4sPZ1ZUngEL : API key
bootstrap();
