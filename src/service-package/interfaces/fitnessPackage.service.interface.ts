import {
  CreateAllFitnessServicePackageDto,
  UpdateAllFitnessServicePackageDto,
} from '../dtos/allFitnessServicePackage.dto';
import { CreateFitnessPackageDto } from '../dtos/fitnessPackage.dto';
import { FitnessPackage } from '../repositories/fitnessPackage.entity';

export interface IFitnessPackageService {
  findAll(): Promise<FitnessPackage[]>;
  create(
    createAllFitnessDto: CreateAllFitnessServicePackageDto
  ): Promise<FitnessPackage>;

  updateFitness(
    fitnessId: number,
    updateAllFitnessDto: UpdateAllFitnessServicePackageDto,
  ): Promise<FitnessPackage>;
  delete(id: number): Promise<void>;
}
