import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AdminEmail } from 'src/shared/interfaces/grpc/admin/adminService.interface';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async getDataAdmin(@Body() email: AdminEmail) {
    return this.authService.getDataAdmin(email);
  }
}
