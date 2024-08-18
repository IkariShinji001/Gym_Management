import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant';

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
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
