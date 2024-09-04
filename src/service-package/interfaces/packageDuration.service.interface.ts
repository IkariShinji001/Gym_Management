import {
  CreatePackageDurationDto,
  UpdatePackageDurationDto,
} from '../dtos/packageDuration.dto';
import { PackageDuration } from '../repositories/packageDuration.entity';

export interface IPackageDurationService {
  findAll(): Promise<PackageDuration[]>;
  createPackageDuration(
    createPackageDurationDto: CreatePackageDurationDto,
  ): Promise<PackageDuration>;
  updatePackageDuration(
    packageDurationId: number,
    updatePackageDurationDto: UpdatePackageDurationDto,
  ): Promise<PackageDuration>;
  deletePackageDuration(packageDurationId: number): Promise<void>;
}
