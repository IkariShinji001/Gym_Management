import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from './repositories/facilities.entity';
import { FacilitiesController } from './controllers/facilities.controller';
import { FacilitiesService } from './services/facilities.service';
import { Maintenances } from './repositories/maintenances.entity';
import { MaintenancesController } from './controllers/maintenances.controller';
import { MaintenancesService } from './services/maintenances.service';
@Module({
  imports: [TypeOrmModule.forFeature([Facilities, Maintenances])],
  controllers: [FacilitiesController, MaintenancesController],
  providers: [FacilitiesService, MaintenancesService],
})
export class FacilitiesModule {}
