import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN',
        transport: Transport.GRPC,
        options: {
          package: 'ADMIN',
          protoPath: join(__dirname, '../admin/protos/admin.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
