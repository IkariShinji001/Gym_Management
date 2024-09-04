import { HistoryEntryTimeService } from './../services/historyEntryTime.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('/entry-times')
export class HistoryEntryTimeController {
  constructor(private historyEntryTimeService: HistoryEntryTimeService) {}

  @Post()
  async createEntryTime(@Body() data: { userId: number }) {
    const { userId } = data;
    return await this.historyEntryTimeService.createEntryTime(userId);
  }

  @Get()
  async getAllEntriesTime(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    return await this.historyEntryTimeService.getAllEntriesTime(
      new Date(startDate),
      new Date(endDate),
    );
  }
}
