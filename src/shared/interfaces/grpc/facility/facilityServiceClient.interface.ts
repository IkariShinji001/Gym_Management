import { Observable } from 'rxjs';
import { BranchId } from '../branch/branchService.interface';

export interface FacilityServiceClient {
  deleteFacilitiesByBranchId(branchId: BranchId): Observable<{ msg: string }>;
}