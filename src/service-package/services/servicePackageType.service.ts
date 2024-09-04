import { Injectable } from '@nestjs/common';
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
    return await this.serviceTypeRepository.find({
      relations:['servicePackages']
    });
  }

  async findOneById(typeId: number): Promise<ServicePackageType> {
    return await this.serviceTypeRepository.findOneBy({id: typeId });
  }

  async create(
    createServiceTypeDto: CreateServiceTypeDto,
  ): Promise<ServicePackageType> {
    const createdType =  this.serviceTypeRepository.create(createServiceTypeDto)
    return await this.serviceTypeRepository.save(createdType)
  }
  update(
    typeId: number,
    updateServiceTypeDto: UpdateServiceTypeDto,
  ): Promise<ServicePackageType> {
    throw new Error('Method not implemented.');
  }
  async delete(typeId: number): Promise<void> {
    await this.serviceTypeRepository.delete(typeId)
  }
}
