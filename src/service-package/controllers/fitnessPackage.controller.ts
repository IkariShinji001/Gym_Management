import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FitnessPackageService } from '../services/fitnessPackage.service';
import { FitnessPackage } from '../repositories/fitnessPackage.entity';
import {
  CreateAllFitnessServicePackageDto,
  UpdateAllFitnessServicePackageDto,
} from '../dtos/allFitnessServicePackage.dto';
import { UpdatePackageDurationDto } from '../dtos/packageDuration.dto';
import { PackageDuration } from '../repositories/packageDuration.entity';
import {
  CreateFitnessPackageDto,
  UpdateFitnessPackageDto,
} from '../dtos/fitnessPackage.dto';
import { UpdateServicePackageDto } from '../dtos/servicePackage.dto';

@Controller('/fitness-packages')
export class FitnessPackageController {
  constructor(private fitnessPackageService: FitnessPackageService) {}

  @Get()
  async getAllServicePackage(): Promise<FitnessPackage[]> {
    return this.fitnessPackageService.findAll();
  }
  
  @Get('/detail')
  async getAllDetail() {
    return this.fitnessPackageService.getAllFitnessPackagesWithDetails();
  }

  @Get('/by-type/:typeId')
  async getByType(@Param('typeId') typeId: number): Promise<FitnessPackage[]> {
    return await this.fitnessPackageService.findByType(typeId);
  }

  @Post()
  async createServicePackage(
    @Body() createAllFitnessDto: CreateAllFitnessServicePackageDto,
  ): Promise<FitnessPackage> {
    return this.fitnessPackageService.create(createAllFitnessDto);
  }

  @Patch('/:fitnessId')
  async updateCoverImage(
    @Param('fitnessId') fitnessId: number,
    @Body() updateAllFitnessDto: UpdateAllFitnessServicePackageDto,
  ): Promise<FitnessPackage> {
    return await this.fitnessPackageService.updateFitness(
      fitnessId,
      updateAllFitnessDto,
    );
  }

  @Delete('/:fitnessId')
  async deleteFitness(@Param('fitnessId') fitnessId: number) {
    await this.fitnessPackageService.delete(fitnessId);
  }
}
