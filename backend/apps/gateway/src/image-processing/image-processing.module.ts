import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ImageProcessingController } from './image-processing.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IMAGE_PROCESSING',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
  ],
  controllers: [ImageProcessingController],
})
export class ImageProcessingModule {}
