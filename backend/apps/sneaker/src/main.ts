import { NestFactory } from '@nestjs/core';
import { SneakerModule } from './sneaker.module';

async function bootstrap() {
  const app = await NestFactory.create(SneakerModule);
  await app.listen(3000);
}
bootstrap();
