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
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryProvider } from './cloudinary/cloudinary';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServicePackageModule } from './service-package/service-package.module';
import { BranchModule } from './branch/branch.module';

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
    CloudinaryModule,
    ServicePackageModule,
    BranchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CloudinaryService,
    CloudinaryProvider,
    // // {
    // //   provide: APP_GUARD,
    // //   useClass: AuthGuard,
    // // },
  ],
})
export class AppModule {}
