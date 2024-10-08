import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branches } from './repositories/branches.entity';
import { BranchesController } from './controllers/branches.controller';
import { BranchesService } from './services/branches.service';
import { ProvincesController } from './controllers/provinces.controller';
import { ProvincesService } from './services/provinces.service';
import { Provinces } from './repositories/provinces.entity';
import { Districts } from './repositories/districts.entity';
import { DistrictsController } from './controllers/districts.controller';
import { DistrictsService } from './services/districts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Branches, Provinces, Districts])],
    controllers: [BranchesController, ProvincesController, DistrictsController],
    providers: [BranchesService, ProvincesService, DistrictsService]
})
export class BranchModule {}
