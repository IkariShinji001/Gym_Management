import { Injectable, NotFoundException } from '@nestjs/common';
import { ISoldProductService } from '../interfaces/soldProduct.service.interface';
import { CreateSoldProductDto } from '../dtos/soldProduct.dto';
import { SoldProduct } from '../repositories/soldProduct.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplementProduct } from '../repositories/supplementProduct.entity';
import { Profile } from 'src/admin/repositories/profile.entity';

@Injectable()
export class SoldProductService implements ISoldProductService {
  constructor(
    @InjectRepository(SoldProduct)
    private soldProductRepository: Repository<SoldProduct>,
    @InjectRepository(SupplementProduct)
    private supplementProductRepository: Repository<SupplementProduct>,

    @InjectRepository(Profile)
    private profileReposity: Repository<Profile>,
  ) {}
  async findAll(): Promise<SoldProduct[]> {
    return await this.soldProductRepository.find({
      relations: ['supplementProduct', 'profile'],
    });
  }

  async create(newSoldProduct: CreateSoldProductDto): Promise<SoldProduct> {
    const supplementProduct = await this.supplementProductRepository.findOne({
      where: { id: newSoldProduct.supplementProductId },
    });

    const profile = await this.profileReposity.findOne({
      where: { id: newSoldProduct.profileId },
    });
    if (!supplementProduct) {
      throw new NotFoundException(
        `Supplement product with ID: ${newSoldProduct.supplementProductId} not found`,
      );
    }

    if (!profile) {
      throw new NotFoundException(
        `User with ID: ${newSoldProduct.profileId} not found`,
      );
    }

    const product = this.soldProductRepository.create({
      ...newSoldProduct,
      supplementProduct,
      profile,
    });

    return await this.soldProductRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    this.soldProductRepository.delete({ id });
  }
}
