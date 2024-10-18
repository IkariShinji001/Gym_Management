import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from './repositories/facilities.entity';
import { FacilitiesController } from './controllers/facilities.controller';
import { FacilitiesService } from './services/facilities.service';
import { Maintenances } from './repositories/maintenances.entity';
import { MaintenancesController } from './controllers/maintenances.controller';
import { MaintenancesService } from './services/maintenances.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FacilityType } from './repositories/facilityType.entity';
import { FacilityTypeController } from './controllers/facilityTpye.controller';
import { FacilityTypeService } from './services/facilityType.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVER',
        transport: Transport.GRPC,
        options: {
          package: 'SERVER',
          protoPath: join(__dirname, '../branch/protos/branch.proto'),
        },
      },
    ]),
    TypeOrmModule.forFeature([Facilities, Maintenances, FacilityType]),
  ],
  controllers: [FacilitiesController, MaintenancesController, FacilityTypeController],
  providers: [FacilitiesService, MaintenancesService, FacilityTypeService],
})
export class FacilitiesModule {}
