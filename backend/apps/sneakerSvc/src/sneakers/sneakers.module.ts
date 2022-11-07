import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SneakerModel } from './sneaker.model';

import { SneakersService } from './sneakers.service';

import { SneakersController } from './sneakers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SneakerModel])],
  providers: [SneakersService, Logger],
  controllers: [SneakersController],
})
export class SneakersModule {}
