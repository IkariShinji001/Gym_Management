import { Injectable } from '@nestjs/common';
import { Facilities } from '../repositories/facilities.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IFacilitiesService } from '../interfaces/facilities.service.interface';
import { CreateFacilityDto, updateFacilityDto } from '../dtos/facilities.dto';

@Injectable()
export class FacilitiesService implements IFacilitiesService{
  constructor(
    @InjectRepository(Facilities)
    private facilitiesRepository: Repository<Facilities>,
  ) {}
  async findOne(id: number): Promise<Facilities> {
    return await this.facilitiesRepository.findOne({where: {id}});
  }
  async create(newFacility: CreateFacilityDto): Promise<Facilities> {
    const facility = await this.facilitiesRepository.create(newFacility);
    return await this.facilitiesRepository.save(facility);
  }
  update(id: number, updateFacility: updateFacilityDto): Promise<Facilities> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByName(name: string): Promise<Facilities[]> {
    throw new Error('Method not implemented.');
  }
  async findAll() {
    return await this.facilitiesRepository.find();
  }
}
