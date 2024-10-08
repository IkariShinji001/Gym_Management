import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repositories/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { HistoryEntryTime } from './repositories/historyEntryTime.entity';
import { HistoryEntryTimeController } from './controllers/historyEntryTime.controller';
import { HistoryEntryTimeService } from './services/historyEntryTime.service';
import { Voucher } from './repositories/voucher.entity';
import { VoucherController } from './controllers/voucher.controller';
import { VoucherService } from './services/voucher.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, HistoryEntryTime, Voucher])],
  controllers: [UserController, HistoryEntryTimeController, VoucherController],
  providers: [UserService, HistoryEntryTimeService, VoucherService],
})
export class UserModule {}
