import { Observable } from 'rxjs';
import { Voucher, VoucherId } from './voucherService.interface';

export interface VoucherServiceClient {
  FindVoucherById(vouhcherId: VoucherId): Observable<Voucher>;
}
