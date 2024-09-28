import { Controller, Get, Query } from '@nestjs/common';
import { RevenueBillsService } from '../services/revenueBills.service';
import { ChartData } from '../interfaces/revenueBills.service.interface';

@Controller()
export class RevenueBillsController {
  constructor(private readonly revenueBillsService: RevenueBillsService) {}

  @Get('/revenue-by-day-from-bills')
  async revenueByDayFromBills(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<ChartData> {
    return await this.revenueBillsService.revenueByDayFromBills(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('/revenue-by-year-from-bills')
  async revenueByYearFromBills(
    @Query('year') year: number,
  ): Promise<ChartData> {
    return await this.revenueBillsService.revenueByYearFromBills(year);
  }

  @Get('get-top-10-users-by-spending-of-year')
  async getTop10UsersBySpendingOfYear(
    @Query('year') year: number,
  ) {
    return await this.revenueBillsService.getTop10UsersBySpendingOfYear(year);
  }

  @Get('get-top-10-users-by-spending-of-month')
  async getTop10UsersBySpendingOfMonth(
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return await this.revenueBillsService.getTop10UsersBySpendingOfMonth(
      month,
      year,
    );
  }

  @Get('get-top-purchased-packages-of-year')
  async getTopPurchasedPackagesOfYear(
    @Query('year') year: number,
  ) {
    return await this.revenueBillsService.getTopPurchasedPackagesOfYear(year);
  }

  @Get('get-top-purchased-packages-of-month')
  async getTopPurchasedPackagesOfMonth(
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return await this.revenueBillsService.getTopPurchasedPackagesOfMonth(
      month,
      year,
    );
  }
}
