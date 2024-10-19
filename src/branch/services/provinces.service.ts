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

  async findOneByCode(codeProvince: number) {
    console.log(codeProvince)
    const province = await this.provincesRepository.findOne({
      where: { id_external: codeProvince },
    });
    return province;
  }

  async checkProvinceExisted(codeProvince: number) {
    const province = await this.provincesRepository.findOne({
      where: { id_external: codeProvince },
    });
    if (province) {
      return 1;
    } else {
      return 0;
    }
  }

  async create(province: CreateProvinceDto): Promise<Provinces> {
    console.log(province);
    const result = await this.checkProvinceExisted(province.id_external);
    if (result === 1) {
      const provinceExisted = await this.provincesRepository.findOne({
        where: { id_external: province.id_external },
      });
      return provinceExisted;
    } else {
      const newProvince = await this.provincesRepository.create(province);
      return await this.provincesRepository.save(newProvince);
    }
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
