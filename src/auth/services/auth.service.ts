import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AdminEmail } from 'src/shared/interfaces/grpc/admin/adminService.interface';
import { AdminServiceClient } from 'src/shared/interfaces/grpc/admin/adminServiceClient.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  private adminService: AdminServiceClient;

  constructor(@Inject('ADMIN') private client: ClientGrpc) {}

  onModuleInit() {
    this.adminService =
      this.client.getService<AdminServiceClient>('AdminService');
  }

  async getDataAdmin(email: AdminEmail) {
    return this.adminService.findAdminByEmail(email);
  }
}
