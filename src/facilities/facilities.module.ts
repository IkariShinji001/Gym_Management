import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facilities } from './repositories/facilities.entity';
import { FacilitiesController } from './controllers/facilities.controller';
import { FacilitiesService } from './services/facilities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Facilities])],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
