import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SoldProduct } from '../repositories/soldProduct.entity';

@Injectable()
export class BestSellingProductStatisticsService {
  constructor(
    @Inject(SoldProduct)
    private bestSellingProductStatisticsRepository: Repository<SoldProduct>,
  ) {}

  async bestSellingProductStatistics(startDay: Date, endDay: Date) {
    
  }
}
