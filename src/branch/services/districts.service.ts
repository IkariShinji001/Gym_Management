import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Districts } from '../repositories/districts.entity';
import { Repository } from 'typeorm';
import { IDistrictService } from '../interfaces/districts.service.interface';
import { CreateDistrictDto, UpdateDistrictDto } from '../dtos/districts.dto';

@Injectable()
export class DistrictsService implements IDistrictService {
  constructor(
    @InjectRepository(Districts)
    private districtsRepository: Repository<Districts>,
  ) {}
  async findAll(): Promise<Districts[]> {
    return await this.districtsRepository.find();
  }
  async findOne(id: number): Promise<Districts> {
    return await this.districtsRepository.findOne({ where: { id } });
  }
  async create(district: CreateDistrictDto): Promise<Districts> {
    const newDistrict = this.districtsRepository.create(district);
    return await this.districtsRepository.save(newDistrict);
  }
  async update(id: number, district: UpdateDistrictDto): Promise<Districts> {
    await this.districtsRepository.update(id, district);
    return await this.districtsRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    const district = await this.districtsRepository.findOne({ where: { id } });
    await this.districtsRepository.delete(district);
  }
}
