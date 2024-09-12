import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryEntryTime } from './../repositories/historyEntryTime.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryEntryTimeService {
  constructor(
    @InjectRepository(HistoryEntryTime)
    private historyEntryTimeRepository: Repository<HistoryEntryTime>,
    private userService: UserService,
  ) {}

  async createEntryTime(userId: number) {
    const user = await this.userService.findOneByUserId(userId);
    const entryTime = this.historyEntryTimeRepository.create({
      user,
    });
    return await this.historyEntryTimeRepository.save(entryTime);
  }

  async getAllEntriesTime(startDate: Date, endDate: Date) {
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const results = await this.historyEntryTimeRepository
      .createQueryBuilder('entry')
      .where('entry.entry_time >= :startDate', {
        startDate: startDate.toISOString(),
      })
      .andWhere('entry.entry_time <= :endDate', {
        endDate: endOfDay.toISOString(),
      })
      .getMany();
    return results;
  }
}
