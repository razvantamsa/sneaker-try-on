import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { BrandModel } from './brand.model';

import { CreateBrandDto } from './createBrand.dto';
import { UpdateBrandDto } from './updateBrand.dto';

import { BrandsService } from './brands.service';

@Controller()
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern({ cmd: 'get_brand' })
  async getBrand(brandId: string): Promise<BrandModel> {
    this.logger.log(`Fetching brand ${brandId}...`);
    return await this.brandsService.getBrand(brandId);
  }

  @MessagePattern({ cmd: 'get_brands' })
  async getBrands(): Promise<BrandModel[]> {
    this.logger.log(`Fetching all brands...`);
    return await this.brandsService.getAllBrands();
  }

  @MessagePattern({ cmd: 'create_brand' })
  async createBrand(createBrandDto: CreateBrandDto): Promise<BrandModel> {
    this.logger.log(`Creating brand...`);
    return await this.brandsService.createBrand(createBrandDto);
  }

  @MessagePattern({ cmd: 'update_brand' })
  async updateBrand({ brandId, updateBrandDto }): Promise<BrandModel> {
    this.logger.log(`Updating brand ${brandId}...`);
    return await await this.brandsService.updateBrand(brandId, updateBrandDto);
  }

  @MessagePattern({ cmd: 'delete_brand' })
  async deleteBrand(brandId: string): Promise<BrandModel> {
    this.logger.log(`Deleting brand ${brandId}...`);
    return await this.brandsService.deleteBrand(brandId);
  }
}
