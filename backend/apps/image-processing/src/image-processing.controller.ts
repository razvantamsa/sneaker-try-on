import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ImageProcessingService } from './image-processing.service';

@Controller()
export class ImageProcessingController {
  constructor(
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  @Get('healthcheck')
  healthCheck() {
    return 'Image Processing microservice is working...';
  }

  @MessagePattern({ cmd: 'verify_stance' })
  async verifyStance(file: Express.Multer.File): Promise<boolean> {
    return this.imageProcessingService.verifyStance(file);
  }

  @MessagePattern({ cmd: 'edit_sneaker' })
  async editSneaker({
    file,
    sneakerId,
  }: {
    file: Express.Multer.File;
    sneakerId: string;
  }): Promise<boolean> {
    return this.imageProcessingService.editSneaker(file, sneakerId);
  }
}
