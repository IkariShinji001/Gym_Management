import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { IServicePackageService } from '../interfaces/servicePackage.service.interface';
import { ServicePackages } from '../repositories/servicePackage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateServicePackageDto,
  UpdateServicePackageDto,
} from '../dtos/servicePackage.dto';
import { ServicePackagePriceService } from './servicePackagePrice.service';
import { ServiceTypeService } from './servicePackageType.service';

@Injectable()
export class ServicePackagesService implements IServicePackageService {
  constructor(
    @InjectRepository(ServicePackages)
    private servicePackageRepository: Repository<ServicePackages>,
    private packagePriceService: ServicePackagePriceService,
    private typeService: ServiceTypeService,
  ) {}

  async findAll(): Promise<ServicePackages[]> {
    // return await this.servicePackageRepository.find({
    //   relations: ['servicePackagePrices'],
    // });
    const servicePackageList = await this.servicePackageRepository
      .createQueryBuilder('servicePackage')
      .leftJoinAndSelect(
        'servicePackage.servicePackagePrices',
        'servicePackagePrices',
      )
      .leftJoinAndSelect(
        'servicePackagePrices.packageDuration',
        'packageDuration',
      )
      .getMany();
    return servicePackageList;
  }

  async findOneById(id: number): Promise<ServicePackages> {
    return await this.servicePackageRepository.findOne({
      where: { id: id },
      relations: ['servicePackagePrices'],
    });
  }

  async create(
    newServicePackage: CreateServicePackageDto,
  ): Promise<ServicePackages> {
    const existedType = await this.typeService.findOneById(
      newServicePackage.typeId,
    );
    if (!existedType) {
      throw new HttpException(
        `Type with ID: ${newServicePackage.typeId} not found`,
        400,
      );
    }

    const servicePackage = this.servicePackageRepository.create({
      ...newServicePackage,
      serviceType: existedType,
    });

    return await this.servicePackageRepository.save(servicePackage);
  }

  async update(
    servicePackageId: number,
    updateServicePackage: UpdateServicePackageDto,
  ): Promise<ServicePackages> {
    if (servicePackageId === undefined || servicePackageId === null) {
      console.log('Have no servicePackageId is passed');
      throw new HttpException('Service package ID is missing', 400);
    }

    const existedSP = await this.servicePackageRepository.findOne({
      where: { id: servicePackageId },
    });

    if (!existedSP) {
      console.log(
        `--- servicePackage with ID: ${servicePackageId} not found ---`,
      );
      throw new HttpException(
        `servicePackage with ID: ${servicePackageId} not found`,
        400,
      );
    }

    const existedType = await this.typeService.findOneById(
      updateServicePackage.typeId,
    );
    if (!existedType) {
      console.log(
        `--- Type with ID: ${updateServicePackage.typeId} not found ---`,
      );
      throw new HttpException(
        `Type with ID: ${updateServicePackage.typeId} not found`,
        400,
      );
    }

    Object.assign(existedSP, updateServicePackage);
    return await this.servicePackageRepository.save({
      ...existedSP,
      serviceType: existedType,
    });
  }

  async delete(servicePackageId: number): Promise<void> {
    await this.packagePriceService.deleteBySP(servicePackageId);
    await this.servicePackageRepository.delete(servicePackageId);
  }
}
