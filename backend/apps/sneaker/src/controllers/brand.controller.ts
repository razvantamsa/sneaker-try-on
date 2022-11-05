import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateBrandDto } from '../interfaces/createBrand.dto';
import { UpdateBrandDto } from '../interfaces/updateBrand.dto';

@Controller()
export class BrandController {
  private logger: Logger;

  constructor(@Inject('BRANDS') private readonly brandClient: ClientProxy) {
    this.logger = new Logger();
  }

  getBrand(brandId: string) {
    this.logger.log(`Fetching brand ${brandId}...`);
    return this.brandClient.send({ cmd: 'get_brand' }, { brandId });
  }

  getBrands() {
    this.logger.log(`Fetching all brands...`);
    return this.brandClient.send({ cmd: 'get_brands' }, {});
  }

  createBrand(createBrandDto: CreateBrandDto) {
    this.logger.log(`Creating brand...`);
    return this.brandClient.send({ cmd: 'create_brand' }, { createBrandDto });
  }

  updateBrand(brandId: string, updateBrandDto: UpdateBrandDto) {
    this.logger.log(`Updating brand ${brandId}...`);
    return this.brandClient.send(
      { cmd: 'update_brand' },
      { brandId, updateBrandDto },
    );
  }

  deleteBrand(brandId: string) {
    this.logger.log(`Deleting brand ${brandId}...`);
    return this.brandClient.send({ cmd: 'update_brand' }, { brandId });
  }
}
