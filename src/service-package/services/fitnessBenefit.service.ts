import { Injectable } from '@nestjs/common';
import { IFitnessBenefitService } from '../interfaces/fitnessBenefit.service.interface';
import { FitnessBenefits } from '../repositories/fitnessBenefit.entity';
import { FitnessPackage } from '../repositories/fitnessPackage.entity';
import { PackageBenefits } from '../repositories/packageBenefit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { create } from 'domain';

@Injectable()
export class FitnessBenefitService implements IFitnessBenefitService {
  constructor(
    @InjectRepository(FitnessBenefits)
    private fitnessBenefitRepository: Repository<FitnessBenefits>,
  ) {}
  async findAll(): Promise<FitnessBenefits[]> {
    return await this.fitnessBenefitRepository.find({
      relations: ['packageBenefit', 'fitnessPackage'],
    });
  }
  async findBenefitByFitnessPackageId(fitnessPackageId: number): Promise<FitnessBenefits[]> {
    return await this.fitnessBenefitRepository.find({
      where: { fitnessPackage:{ id: fitnessPackageId} },
      relations: ['packageBenefit', 'fitnessPackage'],
    });
  }
  async createFB(
    fitnessPackage: FitnessPackage,
    packageBenefit: PackageBenefits,
  ): Promise<FitnessBenefits> {
    const createdFB = await this.fitnessBenefitRepository.create({
      fitnessPackage: fitnessPackage,
      packageBenefit: packageBenefit,
    });

    return await this.fitnessBenefitRepository.save(createdFB);
  }

  async deleteFB(fitnessId: number) {
    await this.fitnessBenefitRepository.delete({
      fitnessPackage: { id: fitnessId }
    });
  }
  
}
