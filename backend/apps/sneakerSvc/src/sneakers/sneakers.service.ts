import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SneakerModel } from './sneaker.model';

import { CreateSneakerDto } from './createSneaker.dto';
import { UpdateSneakerDto } from './updateSneaker.dto';

@Injectable()
export class SneakersService {
  constructor(
    @InjectRepository(SneakerModel)
    private readonly sneakerRepository: Repository<SneakerModel>,
    private readonly logger: Logger,
  ) {}

  async getSneaker(id: string): Promise<SneakerModel> {
    this.logger.log(`Fetching sneaker ${id}...`);
    return await this.sneakerRepository.findOne({ where: { id } });
  }

  async getAllSneakers(): Promise<SneakerModel[]> {
    this.logger.log(`Fetching all sneakers..`);
    return await this.sneakerRepository.find();
  }

  async createSneaker(
    createSneakerDto: CreateSneakerDto,
  ): Promise<SneakerModel> {
    this.logger.log(`Creating sneaker...`);

    const newSneaker = new SneakerModel();

    newSneaker.brandId = createSneakerDto.brandId;
    newSneaker.name = createSneakerDto.name;

    return await this.sneakerRepository.save(newSneaker);
  }

  async updateSneaker(
    id: string,
    updateSneakerDto: UpdateSneakerDto,
  ): Promise<SneakerModel> {
    this.logger.log(`Updating sneaker ${id}...`);

    const sneaker = await this.getSneaker(id);
    await this.sneakerRepository.update(id, { ...updateSneakerDto });
    return sneaker;
  }

  async deleteSneaker(id: string): Promise<SneakerModel> {
    this.logger.log(`Deleting sneaker ${id}...`);
    const deletedSneaker = await this.getSneaker(id);
    await this.sneakerRepository.delete(id);
    return deletedSneaker;
  }
}
