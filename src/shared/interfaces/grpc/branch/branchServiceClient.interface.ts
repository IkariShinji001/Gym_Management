import { Observable } from "rxjs";
import { Branch, BranchId } from "./branchService.interface";

export interface BranchServiceClient {
    findBranchById(data: BranchId): Observable<Branch>;
}