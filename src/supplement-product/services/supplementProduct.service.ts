import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplementProduct } from '../repositories/supplementProduct.entity';
import { Repository } from 'typeorm';
import { ISupplementProductService } from '../interfaces/supplementProduct.service.interface';
import {
  CreateSupplementProductDto,
  updateSupplementProductDto,
} from '../dtos/supplementProduct.dto';

@Injectable()
export class SupplementProductService implements ISupplementProductService {
  constructor(
    @InjectRepository(SupplementProduct)
    private supplementProductRepository: Repository<SupplementProduct>,
  ) {}

  async create(
    newSupplementProduct: CreateSupplementProductDto,
  ): Promise<SupplementProduct> {
    const supplementProduct =
      this.supplementProductRepository.create(newSupplementProduct);
    return await this.supplementProductRepository.save(supplementProduct);
  }

  async update(
    id: number,
    updateSupplementProduct: updateSupplementProductDto,
  ): Promise<SupplementProduct> {
    const supplement = await this.supplementProductRepository.findOneBy({ id });
    Object.assign(supplement, updateSupplementProduct)
  
    return this.supplementProductRepository.save(supplement);
  }

  async delete(id: number): Promise<void> {
    this.supplementProductRepository.delete(id);
  }

  async findByName(name: string): Promise<SupplementProduct[]> {
    const supplement = await this.supplementProductRepository.find({
      where: { name },
    });
    if (supplement.length == 0) {
      throw new NotFoundException(
        'No SupplementProducts found with name ${name}',
      );
    }
    return supplement;
  }

  async findAll() {
    return await this.supplementProductRepository.find();
  }

  async findOne(id: number) {
    return await this.supplementProductRepository.findOne({ where: { id } });
  }
}
