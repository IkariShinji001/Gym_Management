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

  async getRevenueByDay(date: Date): Promise<number> {
    const result = await this.soldProductRepository
      .createQueryBuilder('soldProduct')
      .select('SUM(soldProduct.price)', 'total_revenue')
      .where('DATE(soldProduct.createdAt) = :date', {
        date: date,
      })
      .getRawOne();

    const totalRevenue = result.total_revenue
      ? parseFloat(result.total_revenue)
      : 0;

    return totalRevenue;
  }

  async getAllSoldProductOnDate(date: Date): Promise<SoldProduct[]> {
    const soldProductList = await this.soldProductRepository
      .createQueryBuilder('soldProduct')
      .leftJoinAndSelect('soldProduct.supplementProduct', 'supplementProduct')
      .leftJoinAndSelect('soldProduct.profile', 'profile')
      .where('DATE(soldProduct.createdAt) = :date', { date: date })
      .groupBy('supplementProduct.id')
      .select([
        'supplementProduct.id AS supplementProductId',
        'supplementProduct.name AS supplementProductName',
        'SUM(soldProduct.quantity) AS totalQuantity',
        'SUM(soldProduct.price) AS totalPrice',
      ])
      .getRawMany();
    return soldProductList;
  }

  async countNumberOfProductSoldById(productId: number): Promise<number> {
    const total = await this.soldProductRepository.count({
      where: {
        supplementProduct: { id: productId },
      },
    });
    return total;
  }

  // ========== Các ngày trong tháng ================
  async getAllDayOfMonthRevenue(
    month: number,
    year: number,
  ): Promise<{ day: number; revenue: number }[]> {
    const results = await this.soldProductRepository
      .createQueryBuilder('soldProduct')
      .select('EXTRACT(DAY FROM soldProduct.createdAt)', 'day')
      .addSelect('SUM(soldProduct.price)', 'total_revenue')
      .where('EXTRACT(YEAR FROM soldProduct.createdAt) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM soldProduct.createdAt) = :month', { month })
      .groupBy('day')
      .orderBy('day', 'ASC')
      .getRawMany();

    // Tạo danh sách doanh thu cho tất cả các ngày trong tháng
    const dailyRevenue = Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: 0,
    }));

    results.forEach((result) => {
      const day = parseInt(result.day, 10);
      const revenue = result.total_revenue
        ? parseFloat(result.total_revenue)
        : 0;
      dailyRevenue[day - 1].revenue = revenue;
    });

    return dailyRevenue.filter(
      (entry) => entry.revenue > 0 || entry.revenue === 0,
    );
  }

  // ========== Tất cả tháng trong NĂM ================
  async getYearlyRevenue(
    year: number,
  ): Promise<{ month: number; revenue: number }[]> {
    const results = await this.soldProductRepository
      .createQueryBuilder('soldProduct')
      .select('EXTRACT(MONTH FROM soldProduct.createdAt)', 'month')
      .addSelect('SUM(soldProduct.price)', 'total_revenue')
      .where('EXTRACT(YEAR FROM soldProduct.createdAt) = :year', { year })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      revenue: 0,
    }));

    results.forEach((result) => {
      const month = parseInt(result.month, 10);
      const revenue = result.total_revenue
        ? parseFloat(result.total_revenue)
        : 0;
      monthlyRevenue[month - 1].revenue = revenue;
    });

    return monthlyRevenue;
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
