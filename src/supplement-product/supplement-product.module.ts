import { Module } from '@nestjs/common';
import { SupplementProductController } from './controllers/supplementProduct.controller';
import { SupplementProductService } from './services/supplementProduct.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplementProduct } from './repositories/supplementProduct.entity';
import { SProductType } from './repositories/sProductType.entity';
import { SProductTypeController } from './controllers/sProductType.controller';
import { SProductTypeService } from './services/sProductType.service';

@Module({
    imports: [TypeOrmModule.forFeature([SupplementProduct, SProductType])],
    controllers:[SupplementProductController, SProductTypeController],
    providers: [SupplementProductService, SProductTypeService]
})
export class SupplementProductModule {}
