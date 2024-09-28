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
import {
  IServicePackagePrice,
  ServicePackagePriceList,
  ServicePackagePriceListIds,
} from 'src/shared/interfaces/grpc/servicePackage/servicePackage.interface';

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

  async getAllByListIds(
    listIds: ServicePackagePriceListIds,
  ): Promise<ServicePackagePriceList> {
    const res: IServicePackagePrice[] = [];
    let final; // Initialize res as an array of ServicePackagePrice

    for (const listId of listIds.servicePackagePriceListIds) {
      const servicePackagePrices = await this.findByServicePackage(listId.id);

      const mappedPrices = servicePackagePrices.map((spr) => ({
        id: spr.id,
        price: spr.price,
        servicePackageName: spr.servicePackage.name,
        duration: spr.packageDuration.duration,
        durationType: spr.packageDuration.durationType, // Cast to DurationType
      }));

      // Push mapped prices to the res array
      res.push(...mappedPrices);
      final = { servicePackagePriceList: res };
    }

    return final; // Return the final result
  }
  async findByServicePackage(
    servicePackageId: number,
  ): Promise<ServicePackagePrice[]> {
    return await this.packagePriceRepository.find({
      where: { id: servicePackageId },
      relations: ['servicePackage', 'packageDuration'],
    });
  }
  async findByServicePackageId(
    servicePackageId: number,
  ): Promise<ServicePackagePrice[]> {
    return await this.packagePriceRepository.find({
      where: { servicePackage: { id: servicePackageId } },
      relations: ['servicePackage', 'packageDuration'],
    });
  }

  async createPackagePrice(
    createPackagePriceDto: CreateServicePackagePriceDto,
    servicePackage: ServicePackages,
  ): Promise<ServicePackagePrice> {
    const packageDuration = await this.packageDurationService.findOneById(
      createPackagePriceDto.packageDurationId,
    );
    if (!packageDuration) {
      console.log(
        `--- Duration with ID: ${createPackagePriceDto.packageDurationId} not found ---`,
      );
      throw new HttpException(
        `Duration with ID: ${createPackagePriceDto.packageDurationId} not found`,
        400,
      );
    }

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
      return await this.createPackagePrice(updatePackagePriceDto, existedSP)
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
