import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ImageProcessingService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  public async verifyStance(file: Express.Multer.File): Promise<boolean> {
    this.logger.log(`Image name: ${file.originalname}`);
    return Promise.resolve(true);
  }

  public async editSneaker(
    file: Express.Multer.File,
    sneakerId: string,
  ): Promise<boolean> {
    this.logger.log(
      `Image name: ${file.originalname} and sneaker Id: ${sneakerId}`,
    );
    return Promise.resolve(true);
  }
}
