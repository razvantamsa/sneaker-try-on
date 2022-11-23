import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandModel } from './brand.model';

import { BrandsService } from './brands.service';

import { BrandsController } from './brands.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BrandModel])],
  providers: [BrandsService, Logger],
  controllers: [BrandsController],
})
export class BrandsModule {}
