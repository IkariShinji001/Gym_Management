import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplementProduct } from '../repositories/supplementProduct.entity';
import { Repository } from 'typeorm';
import { ISupplementProductService } from '../interfaces/supplementProduct.service.interface';
import {
  CreateSupplementProductDto,
  updateSupplementProductDto,
} from '../dtos/supplementProduct.dto';
import { SProductType } from '../repositories/sProductType.entity';

@Injectable()
export class SupplementProductService implements ISupplementProductService {
  constructor(
    @InjectRepository(SupplementProduct)
    private supplementProductRepository: Repository<SupplementProduct>,

    @InjectRepository(SProductType)
    private sProductTypeRepository: Repository<SProductType>,
  ) {}

  async findByName(name: string): Promise<SupplementProduct[]> {
    const supplement = await this.supplementProductRepository.find({
      where: { name },
    });
    return supplement;
  }

  async findAll(): Promise<any[]> {
    const products = await this.supplementProductRepository
      .createQueryBuilder('supplementProduct')
      .leftJoinAndSelect('supplementProduct.type', 'type')
      .leftJoin('supplementProduct.soldProducts', 'soldProduct')
      .addSelect('SUM(soldProduct.quantity)', 'totalSold')
      .groupBy('supplementProduct.id')
      .addGroupBy('type.id')
      .getRawAndEntities();

    // Map products with totalSold values
    const result = products.entities.map((product, index) => ({
      ...product,
      totalSold: parseInt(products.raw[index].totalSold, 10) || 0, // if totalSold is null, return 0
    }));

    return result;
  }

  async create(
    newSupplementProduct: CreateSupplementProductDto,
  ): Promise<SupplementProduct> {
    const type = await this.sProductTypeRepository.findOne({
      where: { id: newSupplementProduct.typeId },
    });

    if (!type) {
      throw new NotFoundException('Deo co thai!');
    }
    const supplementProduct = this.supplementProductRepository.create({
      ...newSupplementProduct,
      type,
    });

    return await this.supplementProductRepository.save(supplementProduct);
  }

  async update(
    id: number,
    updateSupplementProduct: updateSupplementProductDto,
  ): Promise<SupplementProduct> {
    const { name, price, imageUrl, typeId } = updateSupplementProduct;
    const supplement = await this.supplementProductRepository.findOneBy({ id });
    if (!supplement) {
      throw new NotFoundException(`Supplement product with id ${id} not found`);
    }
    if (typeId) {
      const type = await this.sProductTypeRepository.findOne({
        where: { id: typeId },
      });
      if (!type) {
        throw new NotFoundException(`Chua co thai ${typeId}`);
      }
      supplement.type = type;
    }

    Object.assign(supplement, updateSupplementProduct);

    return await this.supplementProductRepository.save(supplement);
  }

  async delete(id: number): Promise<void> {
    this.supplementProductRepository.delete(id);
  }

  async findOne(id: number) {
    return await this.supplementProductRepository.findOne({ where: { id } });
  }

  async findByType(typeId: number): Promise<SupplementProduct[]> {
    const type = await this.sProductTypeRepository.findOne({
      where: { id: typeId },
    });
    return await this.supplementProductRepository.find({
      where: { type },
    });
  }
}
