import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { SneakerModule } from './sneaker.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SneakerModule, {
    transport: Transport.TCP,
    options: { port: 3002 },
  });
  await app.listen();
}
bootstrap();
