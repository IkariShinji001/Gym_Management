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
  UpdateExistedBenefitsDto,
} from './benefitPackage.dto';

export class CreateAllFitnessServicePackageDto {
  createFitnessPackageDto: CreateFitnessPackageDto;
  createServicePackageDto: CreateServicePackageDto;
  createPackagePriceDtoList: CreateServicePackagePriceDto[];
  updateBenefitList: Partial<UpdateExistedBenefitsDto[]>;
  createNewBenefitList: Partial<CreatePackageBenefitsDto[]>;
}

export class UpdateAllFitnessServicePackageDto {
  priceId: Partial<number>;
  updateFitnessPackageDto: Partial<UpdateFitnessPackageDto>;
  updateServicePackageDto: Partial<UpdateServicePackageDto>;
  updatePackagePriceDto: Partial<UpdateServicePackagePriceDto[]>;
  updateBenefitList: Partial<UpdateExistedBenefitsDto[]>;
  updateNewBenefitList: Partial<CreatePackageBenefitsDto[]>;
}
