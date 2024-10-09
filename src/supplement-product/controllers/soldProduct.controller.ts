import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SoldProductService } from '../services/soldProduct.service';
import { SoldProduct } from '../repositories/soldProduct.entity';
import { CreateSoldProductDto } from '../dtos/soldProduct.dto';

@Controller('/sold-products')
export class SoldProductController {
  constructor(private soldProductService: SoldProductService) {}

  @Get()
  async getAllSoldProduct(): Promise<SoldProduct[]> {
    return await this.soldProductService.findAll();
  }

  @Get('/date-revenue')
  async getDateRevenue(@Query('date') date: Date): Promise<number> {
    console.log(date);
    return await this.soldProductService.getRevenueByDay(date);
  }

  @Get('/sold-product-on-date')
  async getAllSoldProductOnDate(
    @Query('date') date: Date,
  ): Promise<SoldProduct[]> {
    return await this.soldProductService.getAllSoldProductOnDate(date);
  }

  @Get('/allday-month-revenue')
  async getMonthRevenue(
    @Query('month') month: number,
    @Query('year') year: number,
  ): Promise<{ day: number; revenue: number }[]> {
    const revenue = await this.soldProductService.getAllDayOfMonthRevenue(
      month,
      year,
    );

    return revenue;
  }

  @Get('/yearly-revenue')
  async getYearlyRevenue(
    @Query('year') year: number,
  ): Promise<{ month: number; revenue: number }[]> {
    return await this.soldProductService.getYearlyRevenue(year);
  }

  @Get('/total-sold/:productId')
  async getTotalProductSold(
    @Param('productId') productId: number,
  ): Promise<number> {
    return this.soldProductService.countNumberOfProductSoldById(productId);
  }

  @Post()
  async createSoldProduct(
    @Body() newSoldProduct: CreateSoldProductDto,
  ): Promise<SoldProduct> {
    return await this.soldProductService.create(newSoldProduct);
  }

  @Delete('/:id')
  async deleteSoldProduct(@Param('id') id: number) {
    await this.soldProductService.delete(id);
  }
}
