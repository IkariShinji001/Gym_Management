import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AdminEmail } from 'src/shared/interfaces/grpc/admin/adminService.interface';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async getDataAdmin(@Body() email: AdminEmail) {
    return this.authService.getDataAdmin(email);
  }

  @Post('/admin/login')
  async loginAdmin(
    @Body() adminInfo: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const accessToken = await this.authService.signInAdmin(
        adminInfo.email,
        adminInfo.password,
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true, // Không cho phép JavaScript truy cập cookie
        maxAge: 3600000, // Thời gian sống của cookie (1 giờ)
      });
      return { message: 'Thành công' };
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
