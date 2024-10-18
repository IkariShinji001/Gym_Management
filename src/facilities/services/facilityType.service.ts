import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityType } from '../repositories/facilityType.entity';
import { Repository } from 'typeorm';
import { CreateFacilityTypeDto } from '../dtos/facilityType.dto';

@Injectable()
export class FacilityTypeService {
  constructor(
    @InjectRepository(FacilityType)
    private facilityTypeRepository: Repository<FacilityType>,
  ) {}

  async findAll() {
    return await this.facilityTypeRepository.find();
  }

  async create(newFacility: CreateFacilityTypeDto) {
    const facilityType = await this.facilityTypeRepository.create(newFacility);
    console.log(facilityType)
    return await this.facilityTypeRepository.save(facilityType);
  }

  async findById(id: number) {
    return await this.facilityTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, FacilityTypeToUpdate: CreateFacilityTypeDto) {
    await this.facilityTypeRepository.update(id, FacilityTypeToUpdate);
    return this.facilityTypeRepository.findOne({ where: { id } });
  }
}
