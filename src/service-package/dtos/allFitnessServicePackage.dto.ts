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
  createNewBenefitList: Partial<CreatePackageBenefitsDto[]>;
}

export class UpdateAllFitnessServicePackageDto {
  updateFitnessPackageDto: Partial<UpdateFitnessPackageDto>;
  updateServicePackageDto: Partial<UpdateServicePackageDto>;
  updatePackagePriceDtoList: Partial<UpdateServicePackagePriceDto[]>;
  updateNewBenefitList: Partial<CreatePackageBenefitsDto[]>;
}
