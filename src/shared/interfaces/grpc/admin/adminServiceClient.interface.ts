import { Observable } from 'rxjs';
import { AdminEmail, Admin } from './adminService.interface';

export interface AdminServiceClient {
  findAdminByEmail(data: AdminEmail): Observable<Admin>;
}
