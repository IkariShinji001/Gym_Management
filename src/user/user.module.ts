import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repositories/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { HistoryEntryTime } from './repositories/historyEntryTime.entity';
import { HistoryEntryTimeController } from './controllers/historyEntryTime.controller';
import { HistoryEntryTimeService } from './services/historyEntryTime.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, HistoryEntryTime])],
  controllers: [UserController, HistoryEntryTimeController],
  providers: [UserService, HistoryEntryTimeService],
})
export class UserModule {}
