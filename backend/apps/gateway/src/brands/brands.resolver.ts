import { Inject, Logger } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

import { BrandModel } from './brand.model';

import { CreateBrandDto } from './createBrand.dto';
import { UpdateBrandDto } from './updateBrand.dto';

@Resolver((of) => BrandModel)
export class BrandsResolver {
  private logger: Logger;

  constructor(@Inject('BRANDS') private readonly brandClient: ClientProxy) {
    this.logger = new Logger();
  }

  @Query((returns) => BrandModel)
  getBrand(brandId: string) {
    this.logger.log(`Fetching brand ${brandId}...`);
    return this.brandClient.send({ cmd: 'get_brand' }, brandId);
  }

  @Query((returns) => BrandModel)
  getBrands() {
    this.logger.log(`Fetching all brands...`);
    return this.brandClient.send({ cmd: 'get_brands' }, {});
  }

  @Mutation((returns) => BrandModel)
  createBrand(createBrandDto: CreateBrandDto) {
    this.logger.log(`Creating brand...`);
    return this.brandClient.send({ cmd: 'create_brand' }, createBrandDto);
  }

  @Mutation((returns) => BrandModel)
  updateBrand(brandId: string, updateBrandDto: UpdateBrandDto) {
    this.logger.log(`Updating brand ${brandId}...`);
    return this.brandClient.send(
      { cmd: 'update_brand' },
      { brandId, updateBrandDto },
    );
  }

  @Mutation((returns) => BrandModel)
  deleteBrand(brandId: string) {
    this.logger.log(`Deleting brand ${brandId}...`);
    return this.brandClient.send({ cmd: 'update_brand' }, brandId);
  }
}
