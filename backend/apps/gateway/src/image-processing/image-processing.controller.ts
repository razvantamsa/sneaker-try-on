import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditSneakerDto } from 'apps/common/dto/editSneaker.dto';

@Controller('ipr')
export class ImageProcessingController {
  private logger: Logger;

  constructor(
    @Inject('IMAGE_PROCESSING')
    private readonly imageProcessingClient: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  @Get('healthcheck')
  healthcheck() {
    this.logger.log('Healthcheck');
    return 'Healthcheck';
  }

  @Post('/verify-stance')
  @UseInterceptors(FileInterceptor('file'))
  verifyStance(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(`Image name: ${file.originalname}`);
    return this.imageProcessingClient.send({ cmd: 'verify_stance' }, file);
  }

  @Post('/edit-sneaker')
  @UseInterceptors(FileInterceptor('file'))
  editSneaker(
    @UploadedFile() file: Express.Multer.File,
    @Body() { sneakerId }: EditSneakerDto,
  ) {
    this.logger.log(
      `Image name: ${file.filename} and sneaker Id: ${sneakerId}`,
    );
    return this.imageProcessingClient.send(
      { cmd: 'edit_sneaker' },
      { file, sneakerId },
    );
  }
}
