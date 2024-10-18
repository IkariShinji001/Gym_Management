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
import {
  CreatePackageBenefitsDto,
  UpdatePackageBenefitsDto,
} from './benefitPackage.dto';

export class CreateAllFitnessServicePackageDto {
  createFitnessPackageDto: CreateFitnessPackageDto;
  createServicePackageDto: CreateServicePackageDto;
  createPackagePriceDtoList: CreateServicePackagePriceDto[];
}

export class UpdateAllFitnessServicePackageDto {
  updateFitnessPackageDto: Partial<UpdateFitnessPackageDto>;
  updateServicePackageDto: Partial<UpdateServicePackageDto>;
  updatePackagePriceDtoList: Partial<UpdateServicePackagePriceDto[]>;
}
