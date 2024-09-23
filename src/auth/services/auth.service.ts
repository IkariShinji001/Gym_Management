import { UserService } from './../../user/services/user.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Admin,
  AdminEmail,
} from 'src/shared/interfaces/grpc/admin/adminService.interface';
import { AdminServiceClient } from 'src/shared/interfaces/grpc/admin/adminServiceClient.interface';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Username } from 'src/shared/interfaces/grpc/user/userService.interface';
import { UserServiceClient } from 'src/shared/interfaces/grpc/user/userServiceClient.interface';
import { jwtConstants } from 'src/constant';

@Injectable()
export class AuthService implements OnModuleInit {
  private adminService: AdminServiceClient;
  private userService: UserServiceClient;

  constructor(
    @Inject('SERVER') private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.adminService =
      this.client.getService<AdminServiceClient>('AdminService');
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async getDataAdmin(email: AdminEmail) {
    return this.adminService.findAdminByEmail(email);
  }

  async getDataUser(username: Username) {
    return this.userService.FindOneUserByUsername(username);
  }

  async verifyAccessFace(username: string, password: string) {
    const user = await firstValueFrom(await this.getDataUser({ username }));

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }

  async signInUser(username: string, password: string) {
    const user = await firstValueFrom(await this.getDataUser({ username }));

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken, id: user.id };
  }

  async signInAdmin(email: string, password: string) {
    const admin = await firstValueFrom(await this.getDataAdmin({ email }));
    if (!admin) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatchPassword = await bcrypt.compare(password, admin.password);

    if (!isMatchPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }

  async verifyUser(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.secret,
      });

      const user = await firstValueFrom(
        await this.getDataUser({ username: payload.username }),
      );

      if (!user) {
        throw new HttpException(
          'Không tồn tại người dùng',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      console.log(error);
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token đã hết hạn', HttpStatus.UNAUTHORIZED);
      } else if (error.name === 'JsonWebTokenError') {
        throw new HttpException('Token không hợp lệ', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(
          error.message || 'Lỗi không xác định',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
