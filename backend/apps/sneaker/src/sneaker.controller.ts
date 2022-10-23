import { Controller, Get } from '@nestjs/common';
import { SneakerService } from './sneaker.service';

@Controller()
export class SneakerController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Get()
  getHello(): string {
    return this.sneakerService.getHello();
  }
}
