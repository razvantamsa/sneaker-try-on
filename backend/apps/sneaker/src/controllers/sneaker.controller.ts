import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateSneakerDto } from '../interfaces/createSneaker.dto';
import { UpdateSneakerDto } from '../interfaces/updateSneaker.dto';

@Controller()
export class SneakerController {
  private logger: Logger;

  constructor(@Inject('SNEAKERS') private readonly sneakerClient: ClientProxy) {
    this.logger = new Logger();
  }

  getSneaker(sneakerId: string) {
    this.logger.log(`Fetching sneaker ${sneakerId}...`);
    return this.sneakerClient.send({ cmd: 'get_sneaker' }, { sneakerId });
  }

  getSneakers() {
    this.logger.log(`Fetching all sneakers...`);
    return this.sneakerClient.send({ cmd: 'get_sneakers' }, {});
  }

  createSneaker(createSneakerDto: CreateSneakerDto) {
    this.logger.log(`Creating sneaker...`);
    return this.sneakerClient.send(
      { cmd: 'create_sneaker' },
      { createSneakerDto },
    );
  }

  updateSneaker(sneakerId: string, updateSneakerDto: UpdateSneakerDto) {
    this.logger.log(`Updating sneaker ${sneakerId}...`);
    return this.sneakerClient.send(
      { cmd: 'update_sneaker' },
      { sneakerId, updateSneakerDto },
    );
  }

  deleteSneaker(sneakerId: string) {
    this.logger.log(`Deleting sneaker ${sneakerId}...`);
    return this.sneakerClient.send({ cmd: 'update_sneaker' }, { sneakerId });
  }
}
