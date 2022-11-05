import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ImageProcessingModule } from './image-processing.module';

async function bootstrap() {
  const app = await NestFactory.create(ImageProcessingModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3002,
    },
  });
  app.startAllMicroservices();
  await app.listen(3102);
}
bootstrap();
