import { UpdateFitnessBenefitDto } from '../dtos/fitnessBenefit.dto';
import { FitnessBenefits } from '../repositories/fitnessBenefit.entity';
import { FitnessPackage } from '../repositories/fitnessPackage.entity';
import { PackageBenefits } from '../repositories/packageBenefit.entity';

export interface IFitnessBenefitService {
  findAll(): Promise<FitnessBenefits[]>;
  createFB(
    fitnessPackage: FitnessPackage,
    packageBenefit: PackageBenefits,
  ): Promise<FitnessBenefits>;

  updateFB(
    updateFitnessBenefit: UpdateFitnessBenefitDto,
  ): Promise<FitnessBenefits>;
  deleteFB(fitnessId: number): Promise<void>;
}
