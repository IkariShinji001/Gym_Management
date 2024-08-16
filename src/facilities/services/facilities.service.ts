import { Injectable } from '@nestjs/common';
import { Facilities } from '../repositories/facilities.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IFacilitiesService } from '../interfaces/facilities.service.interface';
import { CreateFacilityDto, updateFacilityDto } from '../dtos/facilities.dto';

@Injectable()
export class FacilitiesService implements IFacilitiesService {
  constructor(
    @InjectRepository(Facilities)
    private facilitiesRepository: Repository<Facilities>,
  ) {}

  async findAll(): Promise<Facilities[]> {
    return await this.facilitiesRepository.find();
  }
  async create(newFacility: CreateFacilityDto): Promise<Facilities> {
    const facility = this.facilitiesRepository.create(newFacility);
    return await this.facilitiesRepository.save(facility);
  }
  
  async update(
    id: number,
    updateFacility: updateFacilityDto,
  ): Promise<Facilities> {
    await this.facilitiesRepository.update(id, updateFacility);
    return this.facilitiesRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Facilities[]> {
    const facilities = await this.facilitiesRepository.find({
      where: {
        name: Like(`%${name}%`), // Sử dụng toán tử ilike để tìm kiếm không phân biệt chữ hoa thường
      },
    });
    return facilities;
  }

  async findOne(id: number): Promise<Facilities> {
    return await this.facilitiesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const facility = await this.facilitiesRepository.findOne({ where: { id } });
    await this.facilitiesRepository.delete(facility);
  }
}
