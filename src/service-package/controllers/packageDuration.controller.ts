import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PackageDurationService } from '../services/packageDuration.service';
import { PackageDuration } from '../repositories/packageDuration.entity';
import {
  CreatePackageDurationDto,
  UpdatePackageDurationDto,
} from '../dtos/packageDuration.dto';

@Controller('/package-durations')
export class PackageDurationController {
  constructor(private packageDurationSerivce: PackageDurationService) {}

  @Get()
  async getAllPackageDuration(): Promise<PackageDuration[]> {
    return await this.packageDurationSerivce.findAll();
  }

  @Post()
  async createPackageDuration(
    @Body() createPackageDurationDto: CreatePackageDurationDto,
  ): Promise<PackageDuration> {
    return await this.packageDurationSerivce.createPackageDuration(
      createPackageDurationDto,
    );
  }

  @Patch('/:id')
  async updatePackageDuration(
    @Param('id') packageDurationId: number,
    @Body()updatePackageDurationDto: UpdatePackageDurationDto,
  ): Promise<PackageDuration> {
    return await this.packageDurationSerivce.updatePackageDuration(
      packageDurationId,
      updatePackageDurationDto,
    );
  }

  @Delete('/:id')
  async deletePackageDuration(
    @Param('id') packageDurationId: number,
  ): Promise<void> {
    await this.packageDurationSerivce.deletePackageDuration(packageDurationId);
  }
}
