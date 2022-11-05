import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagePattern } from '@nestjs/microservices';

import { BrandModel } from '../models/brand.model';

import { CreateBrandDto } from '../interfaces/createBrand.dto';
import { UpdateBrandDto } from '../interfaces/updateBrand.dto';

import { BrandService } from '../services/brand.service';

@Resolver(() => BrandModel)
export class BrandResolver {
  constructor(
    private readonly brandService: BrandService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ cmd: 'get_brand' })
  @Query((returns) => BrandModel)
  async getBrand(@Args('brandId') brandId: string): Promise<BrandModel> {
    this.logger.log(`Fetching brand ${brandId}...`);
    return await this.brandService.getBrand(brandId);
  }

  @MessagePattern({ cmd: 'get_brands' })
  @Query((returns) => [BrandModel])
  async getBrands(): Promise<BrandModel[]> {
    this.logger.log(`Fetching all brands...`);
    return await this.brandService.getAllBrands();
  }

  @MessagePattern({ cmd: 'create_brand' })
  @Mutation((returns) => BrandModel, { name: 'createBrand', nullable: true })
  async createBrand(
    @Args('createBrandDto') createBrandDto: CreateBrandDto,
  ): Promise<BrandModel> {
    this.logger.log(`Creating brand...`);
    return await this.brandService.createBrand(createBrandDto);
  }

  @MessagePattern({ cmd: 'update_brand' })
  @Mutation((returns) => BrandModel, { name: 'updateBrand', nullable: true })
  async updateBrand(
    @Args('brandId') brandId: string,
    @Args('updateBrandDto') updateBrandDto: UpdateBrandDto,
  ): Promise<BrandModel> {
    this.logger.log(`Updating brand ${brandId}...`);
    return await await this.brandService.updateBrand(brandId, updateBrandDto);
  }

  @MessagePattern({ cmd: 'delete_brand' })
  @Mutation((returns) => BrandModel, { name: 'deleteBrand', nullable: true })
  async deleteBrand(@Args('brandId') brandId: string): Promise<BrandModel> {
    this.logger.log(`Deleting brand ${brandId}...`);
    return await this.brandService.deleteBrand(brandId);
  }
}
