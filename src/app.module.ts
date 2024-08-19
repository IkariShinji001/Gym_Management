import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BillModule } from './bill/bill.module';
import { PackageServiceModule } from './package-service/package-service.module';
import { AdminModule } from './admin/admin.module';
import { SupplementProductModule } from './supplement-product/supplement-product.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseConfigService } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/jwt-auth.guard';
import { ServicePackageModule } from './service-package/service-package.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    UserModule,
    BillModule,
    PackageServiceModule,
    AdminModule,
    SupplementProductModule,
    FacilitiesModule,
    SharedModule,
    AuthModule,
    ServicePackageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
