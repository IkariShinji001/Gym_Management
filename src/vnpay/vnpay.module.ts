import { Module } from '@nestjs/common';
import { VNpayService } from './services/vnpay.service';
import { VNpayController } from './controllers/vnpay.controller';
import { ignoreLogger } from 'vnpay';
import { VnpayModule } from 'nestjs-vnpay';
@Module({
  imports: [
    VnpayModule.register({
      tmnCode: 'QOFP5H5O',
      secureSecret: 'APE3P6W5Z56ECDT46E8AY1PQ4D8K38L3',
      vnpayHost: 'https://sandbox.vnpayment.vn',
      testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
      enableLog: true, // tùy chọn
      loggerFn: ignoreLogger, // tùy chọn
    }),
  ],
  controllers: [VNpayController],
  providers: [VNpayService],
})
export class VNpayModule {}
