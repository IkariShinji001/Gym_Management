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
import { PtService } from './services/pt.services';
import { PtImagesController } from './controllers/ptImages.controller';
import { PtImagesService } from './services/ptImages.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, PtImages, Managers, Employees, Pt]),
  ],
  controllers: [ProfileController,PtController, PtImagesController],
  providers: [ProfileService,PtService, PtImagesService],
})
export class AdminModule {}
