import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePackageDurationDto,
  UpdatePackageDurationDto,
} from '../dtos/packageDuration.dto';
import { IPackageDurationService } from '../interfaces/packageDuration.service.interface';
import { PackageDuration } from '../repositories/packageDuration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PackageDurationService implements IPackageDurationService {
  constructor(
    @InjectRepository(PackageDuration)
    private packageDurationRepository: Repository<PackageDuration>,
  ) {}
  async findAll(): Promise<PackageDuration[]> {
    return await this.packageDurationRepository.find();
  }

  async findOneById(id: number): Promise<PackageDuration> {
    return await this.packageDurationRepository.findOneBy({ id });
  }
  async createPackageDuration(
    createPackageDurationDto: CreatePackageDurationDto,
  ): Promise<PackageDuration> {
    const createdDuration = this.packageDurationRepository.create(
      createPackageDurationDto,
    );
    return await this.packageDurationRepository.save(createdDuration);
  }
  async updatePackageDuration(
    packageDurationId: number,
    updatePackageDurationDto: UpdatePackageDurationDto,
  ): Promise<PackageDuration> {
    const existedDuration = await this.packageDurationRepository.findOneBy({
      id: packageDurationId,
    });
    if (!existedDuration) {
      throw new NotFoundException(
        `package Duration with ID: ${packageDurationId} not found`,
      );
    }
    Object.assign(existedDuration, updatePackageDurationDto);
    return await this.packageDurationRepository.save(existedDuration);
  }
  async deletePackageDuration(packageDurationId: number): Promise<void> {
    await this.packageDurationRepository.delete({ id: packageDurationId });
  }
}
