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
      .leftJoinAndSelect('servicePackage.serviceType', 'ServicePackageType')

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

  async getAllFitnessPackagesWithDetailsById(
    id: number,
  ): Promise<FitnessPackage> {
    const fitnessPackage = await this.fitnessPackageRepository
      .createQueryBuilder('fitnessPackage')
      .leftJoinAndSelect('fitnessPackage.servicePackage', 'servicePackage')
      .leftJoinAndSelect('servicePackage.serviceType', 'serviceType')
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
      .where('fitnessPackage.id = :id', { id })
      .getOne();

    if (!fitnessPackage) {
      throw new NotFoundException(`Fitness Package with ID ${id} not found`);
    }

    return fitnessPackage;
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
  // ======== CREATE METHOD =========
  async create(
    createAllFitnessDto: CreateAllFitnessServicePackageDto,
  ): Promise<FitnessPackage> {
    const {
      createFitnessPackageDto,
      createServicePackageDto,
      createPackagePriceDtoList,
    } = createAllFitnessDto;

    const savedSP = await this.servicePackageService.create(
      createServicePackageDto,
    );

    const createdFitness = this.fitnessPackageRepository.create({
      ...createFitnessPackageDto,
      servicePackage: savedSP,
    });

    if (createPackagePriceDtoList) {
      for (var i = 0; i < createPackagePriceDtoList.length; i++) {
        const res = await this.packagePriceService.createPackagePrice(
          createPackagePriceDtoList[i],
          savedSP,
        );
      }
    }

    const savedFitness =
      await this.fitnessPackageRepository.save(createdFitness);

    const resultDetail = await this.getAllFitnessPackagesWithDetailsById(
      savedFitness.id,
    );
    return resultDetail;
  }

  // ======== UPDATE METHOD =========
  // ======== UPDATE METHOD =========
  async updateFitness(
    fitnessId: number,
    updateAllFitnessDto: UpdateAllFitnessServicePackageDto,
  ): Promise<FitnessPackage> {
    const {
      updateFitnessPackageDto,
      updateServicePackageDto,
      updatePackagePriceDtoList,
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

    if (updatePackagePriceDtoList) {
      for (var i = 0; i < updatePackagePriceDtoList.length; i++) {
        const packagePrice = await this.packagePriceService.updatePackagePrice(
          updatePackagePriceDtoList[i].priceId,
          updatePackagePriceDtoList[i],
          updatedSP,
        );
      }
    }

    const resultDetail = await this.getAllFitnessPackagesWithDetailsById(
      savedFitness.id,
    );
    return resultDetail;
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
