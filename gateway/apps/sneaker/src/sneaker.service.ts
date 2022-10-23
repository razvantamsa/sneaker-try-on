import { Injectable } from '@nestjs/common';

@Injectable()
export class SneakerService {
  getHello(): string {
    return 'Hello World!';
  }
}
