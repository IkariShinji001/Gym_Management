import { Observable } from 'rxjs';
import { AdminEmail } from './adminService.interface';
import { Admin } from 'typeorm';

export interface AdminServiceClient {
  findAdminByEmail(data: AdminEmail): Observable<Admin>;
}
