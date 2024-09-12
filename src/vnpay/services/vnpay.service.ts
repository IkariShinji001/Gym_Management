import { Injectable } from '@nestjs/common';
import { VnpayService } from 'nestjs-vnpay';
@Injectable()
export class VNpayService {
  constructor(private vnpayService: VnpayService) {}
  async getBankList() {
    return this.vnpayService.getBankList();
  }
}
