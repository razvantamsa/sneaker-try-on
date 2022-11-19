import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

import { CreateSneakerDto } from './createSneaker.dto';
import { UpdateSneakerDto } from './updateSneaker.dto';
import { SneakerModel } from './sneaker.model';

@Resolver((of) => SneakerModel)
export class SneakersResolver {
  constructor(
    @Inject('SNEAKERS') private readonly sneakerClient: ClientProxy,
    private readonly logger: Logger,
  ) {}

  @Query((returns) => SneakerModel)
  getSneaker(@Args('sneakerId') sneakerId: string) {
    this.logger.log(`Fetching sneaker ${sneakerId}...`);
    return this.sneakerClient.send({ cmd: 'get_sneaker' }, sneakerId);
  }

  @Query((returns) => [SneakerModel])
  getSneakers() {
    this.logger.log(`Fetching all sneakers...`);
    return this.sneakerClient.send({ cmd: 'get_sneakers' }, {});
  }

  @Mutation((returns) => SneakerModel)
  createSneaker(@Args('createSneakerDto') createSneakerDto: CreateSneakerDto) {
    this.logger.log(`Creating sneaker...`);
    return this.sneakerClient.send({ cmd: 'create_sneaker' }, createSneakerDto);
  }

  @Mutation((returns) => SneakerModel)
  updateSneaker(
    @Args('sneakerId') sneakerId: string,
    @Args('updateSneakerDto') updateSneakerDto: UpdateSneakerDto,
  ) {
    this.logger.log(`Updating sneaker ${sneakerId}...`);
    return this.sneakerClient.send(
      { cmd: 'update_sneaker' },
      { sneakerId, updateSneakerDto },
    );
  }

  @Mutation((returns) => SneakerModel)
  deleteSneaker(@Args('sneakerId') sneakerId: string) {
    this.logger.log(`Deleting sneaker ${sneakerId}...`);
    return this.sneakerClient.send({ cmd: 'update_sneaker' }, sneakerId);
  }
}
