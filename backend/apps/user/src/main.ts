import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: { port: 3001 },
  });
  await app.listen();
}
bootstrap();
