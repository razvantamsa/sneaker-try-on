import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    package: 'sneaker',
    options: { port: process.env.SNEAKER_PORT },
  });
  await app.listen();
}
bootstrap();
