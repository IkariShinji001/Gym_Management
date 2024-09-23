import { DiscountType } from './../../user/repositories/voucher.entity';
import {
  CustomerStripeId,
  UserId,
} from './../../shared/interfaces/grpc/user/userService.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ServicePackagePriceList,
  ServicePackagePriceListIds,
} from 'src/shared/interfaces/grpc/servicePackage/servicePackage.interface';
import { SerivcePackageClient } from 'src/shared/interfaces/grpc/servicePackage/servicePackageClient.interface';
import { UserServiceClient } from 'src/shared/interfaces/grpc/user/userServiceClient.interface';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bills, BillStatus } from '../repositories/bill.entity';
import { Repository } from 'typeorm';
import { VoucherServiceClient } from 'src/shared/interfaces/grpc/user/voucherServiceClient.interface';
import { Voucher } from 'src/shared/interfaces/grpc/user/voucherService.interface';
import { BillDetail } from '../repositories/billDetail.entity';

@Injectable()
export class BillService {
  private userService;
  private servicePackage;
  private voucherService;
  private stripe: Stripe;
  constructor(
    @InjectRepository(Bills)
    private billRepository: Repository<Bills>,
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
    @Inject('SERVER') private client: ClientGrpc,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'));
  }

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
    this.servicePackage = this.client.getService<SerivcePackageClient>(
      'ServicePackageService',
    );
    this.voucherService =
      this.client.getService<VoucherServiceClient>('VoucherService');
  }

  async getVoucherById(id: number) {
    return this.voucherService.FindVoucherById({ id });
  }

  async getCustomerStripeId(userId: number) {
    return this.userService.FindOneUserById({ userId: userId });
  }

  async getPackagePriceByListIds(listIds: ServicePackagePriceListIds) {
    return this.servicePackage.FindServicePackagePriceByListIds(listIds);
  }

  applyVoucher(
    totalAmount: number,
    discountType: string,
    discountAmount: number,
  ): number {
    if (discountAmount < 0) {
      throw new Error('Discount amount cannot be negative.');
    }

    let finalAmount = totalAmount;

    if (discountType === 'fixed') {
      finalAmount = totalAmount - discountAmount;
    } else if (discountType === 'percentage') {
      finalAmount = totalAmount - (totalAmount * discountAmount) / 100;
    } else {
      throw new Error('Invalid discount type.');
    }

    return finalAmount > 0 ? finalAmount : 0;
  }

  getVoucherName(discountType: string, discount: number) {
    if (discountType === 'percentage') {
      return 'Khuyến mãi giảm  ' + discount + ' %';
    } else {
      return 'Khuyến giảm -' + discount + 'đ';
    }
  }

  getDiscountAmount(
    discountType: string,
    discount: number,
    totalAmount: number,
  ) {
    if (discountType === 'percentage') {
      return totalAmount - (totalAmount * discount) / 100;
    } else {
      return discount;
    }
  }

  async getAllBillDetailIsActive(userId: number) {
    const now = new Date();

    const results = await this.billRepository
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.billDetails', 'billDetail')
      .where('bill.userId = :userId', { userId })
      .andWhere('bill.status = :status', { status: BillStatus.PAID })
      .andWhere("billDetail.startEffective <= TIMEZONE('Asia/Bangkok', :now)", {
        now,
      })
      .andWhere("billDetail.endEffective >= TIMEZONE('Asia/Bangkok', :now)", {
        now,
      })
      .getMany();

    if (results.length === 0) {
      return [];
    }
    const billDetailActive = results.flatMap((bill) => bill.billDetails);
    const listId = billDetailActive.map((billDetail) => {
      return {
        id: billDetail.servicePackagePriceId,
      };
    });
    const packagePrice: ServicePackagePriceList = await firstValueFrom(
      await this.getPackagePriceByListIds({
        servicePackagePriceListIds: listId,
      }),
    );

    const enrichedBillDetails = billDetailActive.map((billDetail) => {
      const matchingPackage = packagePrice.servicePackagePriceList.find(
        (pkg) => pkg.id === billDetail.servicePackagePriceId,
      );

      return {
        ...billDetail,
        package: matchingPackage || null, // Thêm thuộc tính package nếu tìm thấy
      };
    });

    return enrichedBillDetails;
  }

  async cancelFitness(packageServicePriceId: number) {
    const billDetail = await this.billDetailRepository.findOne({
      where: { id: packageServicePriceId },
    });

    billDetail.endEffective = new Date(Date.now());

    await this.billDetailRepository.save(billDetail);

    console.log(billDetail);
  }

  async updateStatusBill(id: number, status) {
    const updatedBill = await this.billRepository.update(id, {
      status,
    });
    return updatedBill;
  }

  async createBill(
    userId: number,
    priceListIds: { id: number }[],
    voucherId: number,
  ) {
    const user: CustomerStripeId = await firstValueFrom(
      await this.getCustomerStripeId(userId),
    );

    const packagePrice: ServicePackagePriceList = await firstValueFrom(
      await this.getPackagePriceByListIds({
        servicePackagePriceListIds: priceListIds,
      }),
    );

    const getVNMonth = (month) => {
      switch (month) {
        case 'month':
          return 'tháng';
        case 'year':
          return 'năm';
        case 'day':
          return 'ngày';
      }
    };

    const getTimeNow = (): string => {
      const now = new Date();

      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const getEndTime = (
      timeNow: Date,
      durationType: string,
      duration: number,
      typeDate: string,
    ) => {
      const endTime = new Date(timeNow);

      if (durationType.includes('month')) {
        endTime.setMonth(endTime.getMonth() + duration);
      } else if (durationType.includes('year')) {
        endTime.setFullYear(endTime.getFullYear() + duration);
      } else {
        endTime.setDate(endTime.getDate() + duration);
      }

      const day = String(endTime.getDate()).padStart(2, '0');
      const month = String(endTime.getMonth() + 1).padStart(2, '0');
      const year = endTime.getFullYear();

      if (typeDate === 'DD/MM/YYYY') return `${day}-${month}-${year}`;
      else return `${year}-${month}-${day}`;
    };

    const totalAmount = packagePrice.servicePackagePriceList.reduce(
      (sum, item) => sum + item.price,
      0,
    );

    const lineItemsTest = packagePrice.servicePackagePriceList.map((item) => ({
      price_data: {
        currency: 'vnd',
        product_data: {
          name:
            item.servicePackageName +
            ' - Thời hạn : ' +
            item.duration +
            ' ' +
            getVNMonth(item.durationType) +
            ' - Ngày bắt đầu: ' +
            getTimeNow() +
            ' - Ngày kết thúc: ' +
            getEndTime(
              new Date(),
              item.durationType,
              item.duration,
              'DD/MM/YYYY',
            ),
        },
        unit_amount: item.price,
      },
      quantity: 1,
    }));

    let session;

    try {
      if (voucherId) {
        const voucher: Voucher = await firstValueFrom(
          await this.getVoucherById(voucherId),
        );

        const coupon = await this.stripe.coupons.retrieve(
          voucher.couponStripeId,
        );

        if (coupon) {
          session = await this.stripe.checkout.sessions.create({
            line_items: lineItemsTest,
            mode: 'payment',
            discounts: [{ coupon: coupon.id }], // Sử dụng coupon id
            payment_intent_data: {
              setup_future_usage: 'on_session',
            },
            customer: user.customerStripeId,
            success_url:
              'http://localhost:8989' +
              '/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
            cancel_url:
              'http://localhost:3000' + '/pay/failed/checkout/session',
          });

          const bill = this.billRepository.create({
            userId,
            totalAmount,
            discountAmount: this.getDiscountAmount(
              voucher.discountType,
              voucher.discount,
              totalAmount,
            ),
            finalAmount:
              totalAmount -
              this.getDiscountAmount(
                voucher.discountType,
                voucher.discount,
                totalAmount,
              ),
          });

          await this.billRepository.save(bill);

          for (
            let i = 0;
            i < packagePrice.servicePackagePriceList.length;
            i++
          ) {
            const billDetail = this.billDetailRepository.create({
              servicePackagePriceId: packagePrice.servicePackagePriceList[i].id,
              price: packagePrice.servicePackagePriceList[i].price,
              startEffective: new Date(Date.now()),
              endEffective: new Date(
                getEndTime(
                  new Date(),
                  packagePrice.servicePackagePriceList[i].durationType,
                  packagePrice.servicePackagePriceList[i].duration,
                  'YYYY/MM/DD',
                ),
              ),
              bill,
            });

            await this.billDetailRepository.save(billDetail);
          }

          return session;
        }
      }

      const bill = this.billRepository.create({
        userId,
        totalAmount,
        discountAmount: 0,
        finalAmount: totalAmount,
      });

      await this.billRepository.save(bill);

      for (let i = 0; i < packagePrice.servicePackagePriceList.length; i++) {
        const billDetail = this.billDetailRepository.create({
          servicePackagePriceId: packagePrice.servicePackagePriceList[i].id,
          price: packagePrice.servicePackagePriceList[i].price,
          startEffective: new Date(getTimeNow()),
          endEffective: new Date(
            getEndTime(
              new Date(),
              packagePrice.servicePackagePriceList[i].durationType,
              packagePrice.servicePackagePriceList[i].duration,
              'YYYY/MM/DD',
            ),
          ),
          bill,
        });

        await this.billDetailRepository.save(billDetail);
      }

      session = await this.stripe.checkout.sessions.create({
        line_items: lineItemsTest,
        mode: 'payment',
        payment_intent_data: {
          setup_future_usage: 'on_session',
        },
        customer: user.customerStripeId,
        success_url:
          'http://localhost:8989' +
          '/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000' + '/pay/failed/checkout/session',
      });

      return session;
    } catch (error) {
      console.error('Error creating bill: ', error);
      throw new Error('Failed to create bill.');
    }
  }
}
