import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISProductTypeService } from '../interfaces/sProductType.service.interface';
import {
  CreateSProductTypeDto,
  UpdateSProductTypeDto,
} from '../dtos/sProductType.dto';
import { SupplementProductType } from '../repositories/sProductType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SProductTypeService implements ISProductTypeService {
  constructor(
    @InjectRepository(SupplementProductType)
    private sProductTypeRepository: Repository<SupplementProductType>,
  ) {}

  async findAll(): Promise<SupplementProductType[]> {
    return await this.sProductTypeRepository.find();
  }

  async findByName(name: string): Promise<SupplementProductType> {
    const productType = await this.sProductTypeRepository.findOneBy({ name });
    if (!productType) {
      throw new NotFoundException(`Product type with name ${name} not found`);
    }
    return productType;
  }
  async create(
    createSProductTypeDto: CreateSProductTypeDto,
  ): Promise<SupplementProductType> {

    const productType = await this.sProductTypeRepository.findOneBy({name: createSProductTypeDto.name});
    if (productType) {
      
    }
    const supplementProductType = this.sProductTypeRepository.create(
      createSProductTypeDto,
    );
    return await this.sProductTypeRepository.save(supplementProductType);
  }

  async update(
    id: number,
    updateSProductDto: UpdateSProductTypeDto,
  ): Promise<SupplementProductType> {
    const sProductType = await this.sProductTypeRepository.findOneBy({ id });
    if (!sProductType) {
      throw new NotFoundException('Khong tim thay thai');
    }
    Object.assign(sProductType, updateSProductDto);

    console.log("service:====")
console.log(sProductType)
    return await this.sProductTypeRepository.save(sProductType);
  }

  async delete(id: number): Promise<void> {
    const sProductType = await this.sProductTypeRepository.findOneBy({ id });
    if (!sProductType) {
      throw new NotFoundException('Khong tim thay thai');
    }
    this.sProductTypeRepository.delete({ id });
  }
}
