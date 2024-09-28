import { VoucherService } from './../services/voucher.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DiscountType } from '../repositories/voucher.entity';

@Controller('/vouchers')
export class VoucherController {
  constructor(private voucherService: VoucherService) {}
  @GrpcMethod('VoucherService', 'FindVoucherById')
  async getVoucherById(data: { id: number }) {
    const { id } = data;
    return await this.voucherService.findVoucherById(id);
  }

  @Post('/users/:id')
  async createVoucher(
    @Param('id') id: number,
    @Body()
    voucher: {
      discount: number;
      endDate: string;
      discountType: DiscountType;
      minAmount: number;
    },
  ) {
    return await this.voucherService.createVoucher(id, voucher);
  }

  @Get('/users/:id')
  async getVoucherByUserId(@Param('id') id: number) {
    return await this.voucherService.getVoucherByUserId(id);
  }
}
