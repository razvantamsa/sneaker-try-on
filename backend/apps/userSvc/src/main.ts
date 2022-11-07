import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    package: 'user',
    options: {
      port: process.env.USER_PORT,
      host: 'localhost',
    },
  });
  await app.listen();
}
bootstrap();
