import { Module } from '@nestjs/common';
import { SupplementProductController } from './controllers/supplementProduct.controller';
import { SupplementProductService } from './services/supplementProduct.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplementProduct } from './repositories/supplementProduct.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SupplementProduct])],
    controllers:[SupplementProductController],
    providers: [SupplementProductService]
})
export class SupplementProductModule {}
