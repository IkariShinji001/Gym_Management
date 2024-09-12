import { UserService } from './user.service';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from '../repositories/voucher.entity';
import { Repository } from 'typeorm';
import { DiscountType } from '../repositories/voucher.entity';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class VoucherService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'));
  }

  async findVoucherByCode(code: string): Promise<Voucher> {
    return await this.voucherRepository.findOne({ where: { code } });
  }

  async findVoucherById(id: number): Promise<Voucher> {
    return await this.voucherRepository.findOne({ where: { id } });
  }

  async createCoupon(discountType: string, discount: number) {
    if (discountType === 'fixed') {
      return await this.stripe.coupons.create({
        amount_off: discount,
        currency: 'vnd',
        duration: 'once',
      });
    } else {
      return await this.stripe.coupons.create({
        percent_off: discount,
        currency: 'vnd',
        duration: 'once',
      });
    }
  }

  async createVoucher(
    userId: number,
    voucher: {
      discount: number;
      endDate: string;
      discountType: DiscountType;
      minAmount: number;
    },
  ) {
    const user = await this.userService.findOneByUserId(userId);

    if (!user) {
      throw new BadRequestException('Không tồn tại user');
    }

    const coupon = await this.createCoupon(
      voucher.discountType,
      voucher.discount,
    );

    const newVoucher = this.voucherRepository.create({
      ...voucher,
      couponStripeId: coupon.id,
    });
    await this.voucherRepository.save(newVoucher);
    return newVoucher;
  }

  async checkVoucherIsValid(
    userId: number,
    voucherId: number,
    voucherCode: string,
  ): Promise<boolean> {
    const voucher = await this.voucherRepository.findOne({
      where: { id: voucherId },
      relations: ['user'],
    });
    if (!voucher) {
      return false;
    }

    if (userId !== voucher.user.id) {
      return false;
    }
    const now = new Date(Date.now());
    const endDate = new Date(voucher.endDate);

    if (voucher.isUsed || endDate < now) {
      return false;
    }

    if (voucher.code !== voucherCode) {
      return false;
    }

    return true;
  }
}
