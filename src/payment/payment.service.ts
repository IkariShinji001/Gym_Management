import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'qs';

@Injectable()
export class PaymentService {
  private vnp_TmnCode = process.env.VNPAY_TMNCODE; // Mã website tại VNPay
  public vnp_HashSecret = process.env.VNPAY_HASHSECRET; // Chuỗi bí mật để tạo checksum
  private vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // URL thanh toán của VNPay
  private vnp_ReturnUrl = 'https://yourwebsite.com/return'; // URL trả về sau khi thanh toán

  createPaymentUrl(ipAddr: string): string {
    const date = new Date();

    // Tạo mã đơn hàng ngẫu nhiên
    const orderId = date.getTime().toString();

    // Tạo timestamp theo định dạng YYYYMMDDHHmmss
    const createDate = date.toISOString().replace(/[-T:\.Z]/g, '').slice(0, 14);

    // Các tham số bắt buộc gửi đến VNPay
    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: 1000000 * 100, // Giá trị thanh toán (đơn vị VND) * 100
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    // Thêm thời gian hết hạn cho đơn hàng (optional)
    const expireDate = new Date(date.getTime() + 5 * 60 * 1000); // 15 phút
    vnp_Params['vnp_ExpireDate'] = expireDate.toISOString().replace(/[-T:\.Z]/g, '').slice(0, 14);

    // Sắp xếp các tham số theo thứ tự alphabet
    vnp_Params = this.sortObject(vnp_Params);

    // Tạo query string từ tham số
    const signData = qs.stringify(vnp_Params, { encode: false });

    // Tạo chuỗi hash với SHA512
    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const secureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Thêm chuỗi hash vào tham số vnp_SecureHash
    vnp_Params['vnp_SecureHash'] = secureHash;

    // Tạo URL thanh toán hoàn chỉnh
    const paymentUrl = this.vnp_Url + '?' + qs.stringify(vnp_Params, { encode: true });

    return paymentUrl;
  }

  // Hàm sắp xếp object theo key
  sortObject(obj: any): any {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach((key) => {
      sorted[key] = obj[key];
    });
    return sorted;
  }
}
