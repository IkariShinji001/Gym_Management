import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './repositories/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.services';
import { PtImages } from './repositories/ptImages.entity';
import { Managers } from './repositories/manager.entity';
import { Employees } from './repositories/employee.entity';
import { Pt } from './repositories/pt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, PtImages, Managers, Employees, Pt]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class AdminModule {}
