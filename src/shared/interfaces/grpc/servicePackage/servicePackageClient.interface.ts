import { Observable } from 'rxjs';
import {
  ServicePackagePriceList,
  ServicePackagePriceListIds,
} from './servicePackage.interface';

export interface SerivcePackageClient {
  FindServicePackagePriceByListIds(
    listId: ServicePackagePriceListIds,
  ): Observable<ServicePackagePriceList>;
}
