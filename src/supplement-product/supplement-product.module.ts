import { Module } from '@nestjs/common';
import { SupplementProductController } from './controllers/supplementProduct.controller';
import { SupplementProductService } from './services/supplementProduct.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplementProduct } from './repositories/supplementProduct.entity';
import { SProductType } from './repositories/sProductType.entity';
import { SProductTypeController } from './controllers/sProductType.controller';
import { SProductTypeService } from './services/sProductType.service';
import { SoldProduct } from './repositories/soldProduct.entity';
import { SoldProductService } from './services/soldProduct.service';
import { SoldProductController } from './controllers/soldProduct.controller';
import { Profile } from 'src/admin/repositories/profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SupplementProduct, SProductType, SoldProduct, Profile])],
    controllers:[SupplementProductController, SProductTypeController, SoldProductController],
    providers: [SupplementProductService, SProductTypeService, SoldProductService]
})
export class SupplementProductModule {}
