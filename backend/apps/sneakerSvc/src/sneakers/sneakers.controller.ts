import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SneakerModel } from './sneaker.model';

import { CreateSneakerDto } from './createSneaker.dto';
import { UpdateSneakerDto } from './updateSneaker.dto';

import { SneakersService } from './sneakers.service';

@Controller()
export class SneakersController {
  constructor(
    private readonly sneakersService: SneakersService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ cmd: 'get_sneaker' })
  async getSneaker(sneakerId: string): Promise<SneakerModel> {
    this.logger.log(`Fetching sneaker ${sneakerId}...`);
    return await this.sneakersService.getSneaker(sneakerId);
  }

  @MessagePattern({ cmd: 'get_sneakers' })
  async getSneakers(): Promise<SneakerModel[]> {
    this.logger.log(`Fetching all sneakers...`);
    return await this.sneakersService.getAllSneakers();
  }

  @MessagePattern({ cmd: 'create_sneaker' })
  async createSneaker(
    createSneakerDto: CreateSneakerDto,
  ): Promise<SneakerModel> {
    this.logger.log(`Creating sneaker...`);
    return await this.sneakersService.createSneaker(createSneakerDto);
  }

  @MessagePattern({ cmd: 'update_sneaker' })
  async updateSneaker({ sneakerId, updateSneakerDto }): Promise<SneakerModel> {
    this.logger.log(`Updating sneaker ${sneakerId}...`);
    return await await this.sneakersService.updateSneaker(
      sneakerId,
      updateSneakerDto,
    );
  }

  @MessagePattern({ cmd: 'delete_sneaker' })
  async deleteSneaker(sneakerId: string): Promise<SneakerModel> {
    this.logger.log(`Deleting sneaker ${sneakerId}...`);
    return await this.sneakersService.deleteSneaker(sneakerId);
  }
}
