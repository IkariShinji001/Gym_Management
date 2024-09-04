import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { IFitnessPackageService } from '../interfaces/fitnessPackage.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FitnessPackage } from '../repositories/fitnessPackage.entity';
import { ServicePackagesService } from './servicePackage.service';
import {
  CreateAllFitnessServicePackageDto,
  UpdateAllFitnessServicePackageDto,
} from '../dtos/allFitnessServicePackage.dto';
import { ServicePackagePriceService } from './servicePackagePrice.service';
import { PackageBenefitService } from './packageBenefit.service';
import { FitnessBenefitService } from './fitnessBenefit.service';

@Injectable()
export class FitnessPackageService implements IFitnessPackageService {
  constructor(
    @InjectRepository(FitnessPackage)
    private fitnessPackageRepository: Repository<FitnessPackage>,
    private servicePackageService: ServicePackagesService,
    private packagePriceService: ServicePackagePriceService,
    private benefitService: PackageBenefitService,
    private fitnessBefefitService: FitnessBenefitService,
  ) {}

  async findAll(): Promise<FitnessPackage[]> {
    return this.fitnessPackageRepository.find({
      relations: ['servicePackage'],
    });
  }
  async getAllFitnessPackagesWithDetails() {
    const fitnessPackages = await this.fitnessPackageRepository
      .createQueryBuilder('fitnessPackage')
      .leftJoinAndSelect('fitnessPackage.servicePackage', 'servicePackage')
      .leftJoinAndSelect(
        'servicePackage.servicePackagePrices',
        'servicePackagePrice',
      )
      .leftJoinAndSelect(
        'servicePackagePrice.packageDuration',
        'packageDuration',
      )
      .leftJoinAndSelect('fitnessPackage.fitnessBenefits', 'fitnessBenefits')
      .leftJoinAndSelect('fitnessBenefits.packageBenefit', 'packageBenefit')
      .getMany();

    return fitnessPackages;
  }

  async findOneFitness(fitnessId: number): Promise<FitnessPackage> {
    const res = await this.fitnessPackageRepository.findOne({
      where: { id: fitnessId },
      relations: ['servicePackage'],
    });
    if (!res) {
      throw new HttpException(
        `Fitness Packages with ID: ${fitnessId} not found`,
        400,
      );
    }
    return res;
  }

  // ======== FIND BY TYPE =========
  async findByType(typeId: number): Promise<FitnessPackage[]> {
    return await this.fitnessPackageRepository.find({
      relations: ['servicePackage', 'servicePackage.serviceType'],
      where: { servicePackage: { serviceType: { id: typeId } } },
    });
  }

  // ======== CREATE METHOD =========

  // tạo duration vs servicePackage(fitness) trc  VD: spId:1
  // xong mới cho tạo các giá vs servicePackageId vs durationId
  // VD: spId=1, duration: 1mon => 100$
  // VD: spId=1, duration: 3mon => 250$
  // VD: spId=1, duration: 6mon => 450$

  async create(
    createAllFitnessDto: CreateAllFitnessServicePackageDto,
  ): Promise<FitnessPackage> {
    const {
      createFitnessPackageDto,
      createServicePackageDto,
      createPackagePriceDto,
      createNewBenefitList,
      updateBenefitList,
    } = createAllFitnessDto;
    const savedSP = await this.servicePackageService.create(
      createServicePackageDto,
    );

    const createdFitness = this.fitnessPackageRepository.create({
      ...createFitnessPackageDto,
      servicePackage: savedSP,
    });

    if (createPackagePriceDto) {
      for (var i = 0; i < createPackagePriceDto.length; i++) {
        const res = await this.packagePriceService.createPackagePrice(
          createPackagePriceDto[i],
          savedSP,
        );
      }
    }

    const savedFitness =
      await this.fitnessPackageRepository.save(createdFitness);

    if (updateBenefitList) {
      for (var i = 0; i < updateBenefitList.length; i++) {
        const savedBenefit = await this.benefitService.findOneById(
          updateBenefitList[i].id,
        );
        await this.fitnessBefefitService.createFB(savedFitness, savedBenefit);
      }
    }
    if (createNewBenefitList) {
      for (var i = 0; i < createNewBenefitList.length; i++) {
        const savedBenefit = await this.benefitService.create(
          createNewBenefitList[i],
        );
        await this.fitnessBefefitService.createFB(savedFitness, savedBenefit);
      }
    }
    return savedFitness;
  }

  // ======== UPDATE METHOD =========
  async updateFitness(
    fitnessId: number,
    updateAllFitnessDto: UpdateAllFitnessServicePackageDto,
  ): Promise<FitnessPackage> {
    const {
      priceId,
      updateFitnessPackageDto,
      updateServicePackageDto,
      updatePackagePriceDto,
      updateBenefitList,
      updateNewBenefitList,
    } = updateAllFitnessDto;
    const updatedSP = await this.servicePackageService.update(
      updateFitnessPackageDto.servicePackageId,
      updateServicePackageDto,
    );
    const existedFitness = await this.findOneFitness(fitnessId);
    if (!existedFitness) {
      console.log('!existedFitness:' + existedFitness);
      throw new HttpException(
        `fitness package with ID: ${fitnessId} not found`,
        400,
      );
    }

    Object.assign(existedFitness, updateFitnessPackageDto);

    const savedFitness = await this.fitnessPackageRepository.save({
      ...existedFitness,
      servicePackage: updatedSP,
    });

   

    if (updatePackagePriceDto) {
      for (var i = 0; i < updatePackagePriceDto.length; i++) {
        const packagePrice = await this.packagePriceService.updatePackagePrice(
          updatePackagePriceDto[i].priceId,
          updatePackagePriceDto[i],
          updatedSP,
        );
      }
    }

    if (updateBenefitList) {
      for (var i = 0; i < updateBenefitList.length; i++) {
        const savedBenefit = await this.benefitService.findOneById(
          updateBenefitList[i].id,
        );
        await this.fitnessBefefitService.createFB(savedFitness, savedBenefit);
      }
    }

    if (updateNewBenefitList) {
      for (var i = 0; i < updateNewBenefitList.length; i++) {
        const savedBenefit = await this.benefitService.create(
          updateNewBenefitList[i],
        );
        await this.fitnessBefefitService.createFB(savedFitness, savedBenefit);
      }
    }

    return savedFitness;
  }

  // ======== DELETE METHOD =========
  async delete(fitnessId: number): Promise<void> {
    const existedFitness = await this.findOneFitness(fitnessId);
    const servicePackageId = existedFitness.servicePackage.id;
    await this.fitnessBefefitService.deleteFB(fitnessId);
    await this.fitnessPackageRepository.delete(fitnessId);
    await this.servicePackageService.delete(servicePackageId);
  }
}
