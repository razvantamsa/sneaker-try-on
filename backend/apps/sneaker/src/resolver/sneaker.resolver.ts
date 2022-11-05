import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagePattern } from '@nestjs/microservices';

import { SneakerModel } from '../models/sneaker.model';

import { CreateSneakerDto } from '../interfaces/createSneaker.dto';
import { UpdateSneakerDto } from '../interfaces/updateSneaker.dto';

import { SneakerService } from '../services/sneaker.service';

@Resolver(() => SneakerModel)
export class SneakerResolver {
  constructor(
    private readonly sneakerService: SneakerService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ cmd: 'get_sneaker' })
  @Query((returns) => SneakerModel)
  async getSneaker(
    @Args('sneakerId') sneakerId: string,
  ): Promise<SneakerModel> {
    this.logger.log(`Fetching sneaker ${sneakerId}...`);
    return await this.sneakerService.getSneaker(sneakerId);
  }

  @MessagePattern({ cmd: 'get_sneakers' })
  @Query((returns) => [SneakerModel])
  async getSneakers(): Promise<SneakerModel[]> {
    this.logger.log(`Fetching all sneakers...`);
    return await this.sneakerService.getAllSneakers();
  }

  @MessagePattern({ cmd: 'create_sneaker' })
  @Mutation((returns) => SneakerModel, {
    name: 'createSneaker',
    nullable: true,
  })
  async createSneaker(
    @Args('createSneakerDto') createSneakerDto: CreateSneakerDto,
  ): Promise<SneakerModel> {
    this.logger.log(`Creating sneaker...`);
    return await this.sneakerService.createSneaker(createSneakerDto);
  }

  @MessagePattern({ cmd: 'update_sneaker' })
  @Mutation((returns) => SneakerModel, {
    name: 'createSneaker',
    nullable: true,
  })
  async updateSneaker(
    @Args('sneakerId') sneakerId: string,
    @Args('updateSneakerDto') updateSneakerDto: UpdateSneakerDto,
  ): Promise<SneakerModel> {
    this.logger.log(`Updating sneaker ${sneakerId}...`);
    return await await this.sneakerService.updateSneaker(
      sneakerId,
      updateSneakerDto,
    );
  }

  @MessagePattern({ cmd: 'delete_sneaker' })
  @Mutation((returns) => SneakerModel, {
    name: 'createSneaker',
    nullable: true,
  })
  async deleteSneaker(
    @Args('sneakerId') sneakerId: string,
  ): Promise<SneakerModel> {
    this.logger.log(`Deleting sneaker ${sneakerId}...`);
    return await this.sneakerService.deleteSneaker(sneakerId);
  }
}
