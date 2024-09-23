import { HttpException, Injectable } from '@nestjs/common';
import {
  CreatePackageBenefitsDto,
  UpdatePackageBenefitsDto,
} from '../dtos/benefitPackage.dto';
import { IBenefitPackageService } from '../interfaces/benefitPackage.service.interface';
import { PackageBenefits } from '../repositories/packageBenefit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { assert } from 'console';

@Injectable()
export class PackageBenefitService implements IBenefitPackageService {
  constructor(
    @InjectRepository(PackageBenefits)
    private benefitRepository: Repository<PackageBenefits>,
  ) {}
  async findAll(): Promise<PackageBenefits[]> {
    return await this.benefitRepository.find();
  }
  async findOneById(id: number): Promise<PackageBenefits> {
    return await this.benefitRepository.findOneBy({ id });
  }

  async create(
    createBenefitDto: CreatePackageBenefitsDto,
  ): Promise<PackageBenefits> {
    const createdBenefit = this.benefitRepository.create(createBenefitDto);
    return await this.benefitRepository.save(createdBenefit);
  }

  async createList(
    createBenefitDtoList: CreatePackageBenefitsDto[],
  ): Promise<PackageBenefits[]> {
    const listBenefit: PackageBenefits[] = [];
    for (var i = 0; i < createBenefitDtoList.length; i++) {
      const createdBenefit = await this.benefitRepository.create(
        createBenefitDtoList[i],
      );
      const savedBenefit = await this.benefitRepository.save(createdBenefit);
      listBenefit.push(savedBenefit);
    }
    return listBenefit;
  }

  async update(
    benefitId: number,
    updatePackageBenefitDto: UpdatePackageBenefitsDto,
  ): Promise<PackageBenefits> {
    const existedBenefit = await this.benefitRepository.findOne({
      where: { id: benefitId },
    });
    if (!existedBenefit) {
      console.log(`Benefit with ID: ${benefitId} not found`);
      throw new HttpException(`Benefit with ID: ${benefitId} not found`, 400);
    }
    Object.assign(existedBenefit, updatePackageBenefitDto);

    return await this.benefitRepository.save(existedBenefit);
  }

  async deleteBenefit(id: number) {
    await this.benefitRepository.delete(id);
  }
}
