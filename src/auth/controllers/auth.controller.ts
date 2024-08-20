import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AdminEmail } from 'src/shared/interfaces/grpc/admin/adminService.interface';
import { Public } from 'src/constant';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async getDataAdmin(@Body() email: AdminEmail) {
    return this.authService.getDataAdmin(email);
  }

  // @Public()
  @Post('/admin/login')
  async loginAdmin(
    @Body() adminInfo: { email: string; password: string },
    @Res() res: Response,
  ) {
    try { 
      console.log(adminInfo)
      const accessToken = await this.authService.signInAdmin(
        adminInfo.email,
        adminInfo.password,
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 3600000,
      });

      res.status(200).json({ message: 'Đăng nhập thành công' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }
}
