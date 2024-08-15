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

@Module({
  imports: [UserModule, BillModule, PackageServiceModule, AdminModule, SupplementProductModule, FacilitiesModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
