import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateServiceTypeDto,
  UpdateServiceTypeDto,
} from '../dtos/servicePackageType.dto';
import { IServiceTypeService } from '../interfaces/servicePackageType.service.interface';
import { ServicePackageType } from '../repositories/servicePackageType.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceTypeService implements IServiceTypeService {
  constructor(
    @InjectRepository(ServicePackageType)
    private serviceTypeRepository: Repository<ServicePackageType>,
  ) {}
  async findAll(): Promise<ServicePackageType[]> {
    console.log('servicepkt findall');
    return await this.serviceTypeRepository.find({
      relations: ['servicePackages'],
    });
  }

  async getListTypeByServicePackageId(listIds: number[]) {
    const res = [];
    for (let i = 0; i < listIds.length; i++) {
      const pkg = await this.serviceTypeRepository.find({
        where: { servicePackages: { id: listIds[i] } },
      });
      res.push(pkg);
    }
    return res;
  }

  async findOneById(id: number): Promise<ServicePackageType> {
    return await this.serviceTypeRepository.findOne({
      where: { id },
      relations: ['servicePackages'],
    });
  }

  async create(
    createServiceTypeDto: CreateServiceTypeDto,
  ): Promise<ServicePackageType> {
    const createdType = this.serviceTypeRepository.create(createServiceTypeDto);
    return await this.serviceTypeRepository.save(createdType);
  }

  async update(
    typeId: number,
    updateTypeDto: UpdateServiceTypeDto,
  ): Promise<ServicePackageType> {
    const existedType = await this.serviceTypeRepository.findOne({
      where: { id: typeId },
    });
    if (!existedType) {
      throw new HttpException(
        `servicePackage Type with ID: ${typeId} not found`,
        400,
      );
    }
    Object.assign(existedType, updateTypeDto);
    return await this.serviceTypeRepository.save(existedType);
  }

  async delete(typeId: number): Promise<void> {
    await this.serviceTypeRepository.delete(typeId);
  }
}
