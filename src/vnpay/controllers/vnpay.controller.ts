import { VNpayService } from './../services/vnpay.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/vnpay')
export class VNpayController {
  constructor(private vnpayService: VNpayService) {}

  @Get('/bank-list')
  async getBankList() {
    return await this.vnpayService.getBankList();
  }
}
