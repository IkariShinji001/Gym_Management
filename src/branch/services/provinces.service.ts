import { Injectable } from '@nestjs/common';
import { IProvinceService } from '../interfaces/provinces.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Provinces } from '../repositories/provinces.entity';
import { Repository } from 'typeorm';
import { CreateProvinceDto, UpdateProvinceDto } from '../dtos/provinces.dto';

@Injectable()
export class ProvincesService implements IProvinceService {
  constructor(
    @InjectRepository(Provinces)
    private provincesRepository: Repository<Provinces>,
  ) {}
  async findAll(): Promise<Provinces[]> {
    return await this.provincesRepository.find();
  }
  async findOne(id: number): Promise<Provinces> {
    return await this.provincesRepository.findOne({ where: { id } });
  }
  async create(province: CreateProvinceDto): Promise<Provinces> {
    const newProvince = await this.provincesRepository.create(province);
    return await this.provincesRepository.save(newProvince);
  }
  async update(
    id: number,
    updateProvince: UpdateProvinceDto,
  ): Promise<Provinces> {
    await this.provincesRepository.update(id, updateProvince);
    return await this.provincesRepository.findOne({ where: { id } });
  }
  async delete(id: number): Promise<void> {
    const province = await this.provincesRepository.findOne({ where: { id } });
    await this.provincesRepository.delete(province);
  }
}
