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
        name: 'SERVER',
        transport: Transport.GRPC,
        options: {
          package: 'SERVER',
          protoPath: [
            join(__dirname, '../admin/protos/admin.proto'),
            join(__dirname, '../user/protos/user.proto'),
          ],
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
