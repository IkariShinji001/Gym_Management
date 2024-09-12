import { HttpException, Injectable } from '@nestjs/common';
import { IFitnessBenefitService } from '../interfaces/fitnessBenefit.service.interface';
import { FitnessBenefits } from '../repositories/fitnessBenefit.entity';
import { FitnessPackage } from '../repositories/fitnessPackage.entity';
import { PackageBenefits } from '../repositories/packageBenefit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { create } from 'domain';
import {
  CreateFitnessBenefitDto,
  DeleteFitnessBenefitDto,
  UpdateFitnessBenefitDto,
} from '../dtos/fitnessBenefit.dto';

@Injectable()
export class FitnessBenefitService implements IFitnessBenefitService {
  constructor(
    @InjectRepository(FitnessBenefits)
    private fitnessBenefitRepository: Repository<FitnessBenefits>,

    @InjectRepository(FitnessPackage)
    private fitnessPackageService: Repository<FitnessPackage>,

    @InjectRepository(PackageBenefits)
    private packageBenefitsService: Repository<PackageBenefits>,
  ) {}
  async findAll(): Promise<FitnessBenefits[]> {
    return await this.fitnessBenefitRepository.find({
      relations: ['packageBenefit', 'fitnessPackage'],
    });
  }
  async createFB(
    fitnessPackage: FitnessPackage,
    packageBenefit: PackageBenefits,
  ): Promise<FitnessBenefits> {
    const createdFB = this.fitnessBenefitRepository.create({
      fitnessPackage: fitnessPackage,
      packageBenefit: packageBenefit,
    });

    return await this.fitnessBenefitRepository.save(createdFB);
  }

  async createListFB(
    createFitnessBenefitDtoList: CreateFitnessBenefitDto[],
  ): Promise<FitnessBenefits[]> {
    var savedFitnessBenefitList = [];
    if (createFitnessBenefitDtoList.length > 0)
      for (var i = 0; i < createFitnessBenefitDtoList.length; i++) {
        const createdFB = this.fitnessBenefitRepository.create(
          createFitnessBenefitDtoList[i],
        );
        const savedFB = await this.fitnessBenefitRepository.save(createdFB);
        savedFitnessBenefitList.push(savedFB);
      }
    return savedFitnessBenefitList;
  }

  async updateFB(
    updateFitnessBenefit: UpdateFitnessBenefitDto,
  ): Promise<FitnessBenefits> {
    const { fitnessId, benefitId } = updateFitnessBenefit;
    const existedFitness = await this.fitnessPackageService.findOne({
      where: { id: fitnessId },
    });
    if (!existedFitness) {
      console.log(`Fitness with ID: ${fitnessId} not found`);
      throw new HttpException(`Fitness with ID: ${fitnessId} not found`, 400);
    }
    const existedBenefit = await this.packageBenefitsService.findOne({
      where: { id: benefitId },
    });
    if (!existedBenefit) {
      console.log(`Benefit with ID: ${benefitId} not found`);
      throw new HttpException(`Benefit with ID: ${benefitId} not found`, 400);
    }

    return;
  }

  async delete(id: number) {
    await this.fitnessBenefitRepository.delete(id);
  }
  async deleteFB(fitnessId: number) {
    await this.fitnessBenefitRepository.delete({
      fitnessPackage: { id: fitnessId },
    });
  }

  async deleteList(deleteFitnessBenefitDtoList: DeleteFitnessBenefitDto[]) {
    const length = deleteFitnessBenefitDtoList.length;
    if (length > 0) {
      for (var i = 0; i < length; i++) {
        await this.fitnessBenefitRepository.delete({
          fitnessPackage: {
            id: deleteFitnessBenefitDtoList[i].fitnessPackageId,
          },
          packageBenefit: {
            id: deleteFitnessBenefitDtoList[i].packageBenefitId,
          },
        });
      }
    }
  }
}
