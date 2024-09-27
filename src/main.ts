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
  app.enableCors({
    origin: [
      'http://localhost:9999',
      'http://localhost:8989',
      'http://localhost:6868',
    ],
    credentials: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'SERVER',
      protoPath: [
        join(__dirname, './admin/protos/admin.proto'),
        join(__dirname, './user/protos/user.proto'),
        join(__dirname, './user/protos/voucher.proto'),
        join(__dirname, './service-package/protos/servicePackage.proto'),
        join(__dirname, './branch/protos/branch.proto'),
      ],
      url: 'localhost:5000',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
