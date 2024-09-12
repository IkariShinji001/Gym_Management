import { Controller, Get, Query, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import * as crypto from 'crypto';
import * as qs from 'qs';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('create_payment_url')
  createPaymentUrl(@Req() req): any {
    const ipAddr = req.ip || '127.0.0.1';
    const paymentUrl = this.paymentService.createPaymentUrl(ipAddr);
    return { paymentUrl };
  }

  @Get('return')
  returnPayment(@Query() query: any, @Req() req): string {
    const vnp_Params = query;

    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    const vnp_HashSecret = process.env.VNPAY_HASHSECRET;

    // Sắp xếp tham số theo thứ tự alphabet
    const sortedParams = this.paymentService.sortObject(vnp_Params);

    // Tạo hash để kiểm tra tính toàn vẹn của dữ liệu
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', vnp_HashSecret);
    const checkSum = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Kiểm tra checksum
    if (secureHash === checkSum) {
      // Xác thực giao dịch thành công
      return 'Giao dịch thành công!';
    } else {
      // Giao dịch không hợp lệ
      return 'Giao dịch không hợp lệ!';
    }
  }
}
