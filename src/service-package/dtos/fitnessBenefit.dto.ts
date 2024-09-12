import { FitnessPackage } from '../repositories/fitnessPackage.entity';
import { PackageBenefits } from '../repositories/packageBenefit.entity';

export class CreateFitnessBenefitDto {
  fitnessPackage: FitnessPackage;
  packageBenefit: PackageBenefits;
}

export class UpdateFitnessBenefitDto {
  fitnessId: Partial<number>;
  benefitId: Partial<number>;
}

export class DeleteFitnessBenefitDto {
  // fitnessBenefitId: Partial<number>;
  fitnessPackageId: Partial<number>;
  packageBenefitId: Partial<number>;
}
