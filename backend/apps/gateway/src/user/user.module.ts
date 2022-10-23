import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    // Subscribe to microservices
    ClientsModule.register([
      { name: 'USERS', transport: Transport.TCP, options: { port: 3001 } },
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
