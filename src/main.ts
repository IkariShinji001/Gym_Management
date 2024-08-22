import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './config/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'ADMIN',
      protoPath: join(__dirname, './admin/protos/admin.proto'),
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'USER',
      protoPath: join(__dirname, './user/protos/user.proto'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
