import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './repositories/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.services';
import { PtImages } from './repositories/ptImages.entity';
import { Managers } from './repositories/manager.entity';
import { Employees } from './repositories/employee.entity';
import { Pt } from './repositories/pt.entity';
import { PtController } from './controllers/pt.controller';
import { PtImagesController } from './controllers/ptImages.controller';
import { PtImagesService } from './services/ptImages.services';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.services';
import { ManagerController } from './controllers/manager.controller';
import { ManagerService } from './services/manager.services';
import { PtService } from './services/pt.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, PtImages, Managers, Employees, Pt]),
  ],
  controllers: [ProfileController,PtController, PtImagesController, EmployeeController, ManagerController],
  providers: [ProfileService, PtImagesService, EmployeeService, ManagerService, PtService],
  exports:[PtService]
})
export class AdminModule {}
