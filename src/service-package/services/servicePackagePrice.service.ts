import { HttpException, Injectable } from '@nestjs/common';
import { CreateServicePackageDto } from '../dtos/servicePackage.dto';
import {
  CreateServicePackagePriceDto,
  UpdateServicePackagePriceDto,
} from '../dtos/servicePackagePrice.dto';
import { IServicePackagePriceService } from '../interfaces/servicePackagePrice.service.interface';
import { ServicePackagePrice } from '../repositories/servicePackagePrice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicePackages } from '../repositories/servicePackage.entity';
import { PackageDurationService } from './packageDuration.service';

@Injectable()
export class ServicePackagePriceService implements IServicePackagePriceService {
  constructor(
    @InjectRepository(ServicePackagePrice)
    private packagePriceRepository: Repository<ServicePackagePrice>,

    private packageDurationService: PackageDurationService,
  ) {}

  async findAll(): Promise<ServicePackagePrice[]> {
    return await this.packagePriceRepository.find({
      relations: ['servicePackage', 'packageDuration'],
    });
  }
  findByServicePackage(
    servicePackageId: number,
  ): Promise<ServicePackagePrice[]> {
    throw new Error('Method not implemented.');
  }

  async createPackagePrice(
    createPackagePriceDto: CreateServicePackagePriceDto,
    servicePackage: ServicePackages,
  ): Promise<ServicePackagePrice> {
    const packageDuration = await this.packageDurationService.findOneById(
      createPackagePriceDto.packageDurationId,
    );
    const createdPP = await this.packagePriceRepository.create(
      createPackagePriceDto,
    );
    return await this.packagePriceRepository.save({
      ...createdPP,
      servicePackage,
      packageDuration,
    });
  }

  async updatePackagePrice(
    packagePriceId: number,
    updatePackagePriceDto: UpdateServicePackagePriceDto,
    existedSP: ServicePackages,
  ): Promise<ServicePackagePrice> {
    const existedPrice = await this.packagePriceRepository.findOne({
      where: { id: packagePriceId },
    });
    if (!existedPrice) {
      console.log(
        `--- Price with ID: ${packagePriceId} not found ---`,
      );
      throw new HttpException(
        `Price with ID: ${packagePriceId} not found`,
        400,
      );
    }

    const existedDuration = await this.packageDurationService.findOneById(
      updatePackagePriceDto.packageDurationId,
    );
    if (!existedDuration) {
      console.log(
        `--- Duration with ID: ${updatePackagePriceDto.packageDurationId} not found ---`,
      );
      throw new HttpException(
        `Duration with ID: ${updatePackagePriceDto.packageDurationId} not found`,
        400,
      );
    }
    Object.assign(existedPrice, updatePackagePriceDto);
    return await this.packagePriceRepository.save({
      ...existedPrice,
      packageDuration: existedDuration,
      servicePackage: existedSP,
    });
  }
  async deletePackagePrice(packagePriceId: number): Promise<void> {
    await this.packagePriceRepository.delete(packagePriceId);
  }

  async deleteBySP(servicePackageId: number): Promise<void> {
    await this.packagePriceRepository.delete({
      servicePackage: { id: servicePackageId },
    });
  }
}
