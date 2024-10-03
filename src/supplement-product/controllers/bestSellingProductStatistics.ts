import { Controller, Get, Query } from '@nestjs/common';
import { BestSellingProductStatisticsService } from '../services/bestSellingProductStatistics';

@Controller('/bestSellingProductStatistics')
export class BestSellingProductStatisticsController {
    constructor (private bestSellingProductStatisticsService: BestSellingProductStatisticsService) {}

    @Get()
    async bestSellingProductStatistics(@Query('startDay') startDay: Date, @Query('endDay') endDay: Date) {
        return this.bestSellingProductStatisticsService.bestSellingProductStatistics(startDay, endDay);
    }
}