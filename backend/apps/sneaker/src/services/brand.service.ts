import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BrandModel } from '../models/Brand.model';

import { CreateBrandDto } from '../interfaces/createBrand.dto';
import { UpdateBrandDto } from '../interfaces/updateBrand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandModel)
    private readonly brandRepository: Repository<BrandModel>,
    private readonly logger: Logger,
  ) {}

  public getHello(): string {
    return 'Hello World!';
  }

  async getBrand(id: string): Promise<BrandModel> {
    this.logger.log(`Fetching brand ${id}...`);
    return await this.brandRepository.findOne({ where: { id } });
  }

  async getAllBrands(): Promise<BrandModel[]> {
    this.logger.log(`Fetching all brands..`);
    return await this.brandRepository.find();
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<BrandModel> {
    this.logger.log(`Creating brand...`);

    const newBrand = new BrandModel();
    newBrand.name = createBrandDto.name;

    return await this.brandRepository.save(newBrand);
  }

  async updateBrand(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<BrandModel> {
    this.logger.log(`Updating brand ${id}...`);

    const brand = await this.getBrand(id);
    await this.brandRepository.update(id, { ...updateBrandDto });
    return brand;
  }

  async deleteBrand(id: string): Promise<BrandModel> {
    this.logger.log(`Deleting brand ${id}...`);
    const deletedBrand = await this.getBrand(id);
    await this.brandRepository.delete(id);
    return deletedBrand;
  }
}
