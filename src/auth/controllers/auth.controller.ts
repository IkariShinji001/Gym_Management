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

  @Public()
  @Post('/admin/login')
  async loginAdmin(
    @Body() adminInfo: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      // console.log(adminInfo);
      const accessToken = await this.authService.signInAdmin(
        adminInfo.email,
        adminInfo.password,
      );

      res.cookie('admin_access_token', accessToken, {
        httpOnly: true,
        maxAge: 3600000,
      });

      res.status(200).json({
        message: 'Đăng nhập thành công',
        ...accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  @Public()
  @Post('/verify/user')
  async verifyUser(@Body() data: { accessToken: string }) {
    const { accessToken } = data;
    const user = await this.authService.verifyUser(accessToken);
    return user;
  }

  @Public()
  @Post('/verify/access/face-reconition')
  async verifyAccessFace(@Body() data: { username: string; password: string }) {
    const { username, password } = data;
    return await this.authService.verifyAccessFace(username, password);
  }
  @Public()
  @Post('/user/login')
  async loginUser(
    @Body() userInfo: { username: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const accessToken = await this.authService.signInUser(
        userInfo.username,
        userInfo.password,
      );

      res.cookie('user_access_token', accessToken, {
        httpOnly: true,
        maxAge: 3600000,
      });

      res.status(200).json(accessToken);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}
