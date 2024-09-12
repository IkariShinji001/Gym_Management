export interface VoucherId {
  id: number;
}

export interface Voucher {
  id: number;
  code: string;
  isUsed: boolean;
  endDate: string;
  discount: number;
  discountType: string;
  minAmount: number;
  couponStripeId: string;
}
