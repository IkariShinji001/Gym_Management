import { ValidateNested } from 'class-validator';
import {
  CreateFitnessPackageDto,
  UpdateFitnessPackageDto,
} from './fitnessPackage.dto';
import {
  CreateServicePackageDto,
  UpdateServicePackageDto,
} from './servicePackage.dto';
import {
  CreateServicePackagePriceDto,
  UpdateServicePackagePriceDto,
} from './servicePackagePrice.dto';
import { Type } from 'class-transformer';

export class CreateAllFitnessServicePackageDto {
  @ValidateNested()
  @Type(() => CreateFitnessPackageDto)
  createFitnessPackageDto: CreateFitnessPackageDto;

  @ValidateNested()
  @Type(() => CreateServicePackageDto)
  createServicePackageDto: CreateServicePackageDto;

  @ValidateNested({ each: true })
  @Type(() => CreateServicePackagePriceDto)
  createPackagePriceDtoList: CreateServicePackagePriceDto[];
}

export class UpdateAllFitnessServicePackageDto {
  updateFitnessPackageDto: Partial<UpdateFitnessPackageDto>;
  updateServicePackageDto: Partial<UpdateServicePackageDto>;
  updatePackagePriceDtoList: Partial<UpdateServicePackagePriceDto[]>;
}
