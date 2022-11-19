import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    package: 'brand',
    options: { port: process.env.BRAND_PORT },
  });
  await app.listen();
}
bootstrap();
