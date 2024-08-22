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
import { access } from 'fs';
import { UserEmail } from 'src/shared/interfaces/grpc/user/userService.interface';
import { UserServiceClient } from 'src/shared/interfaces/grpc/user/userServiceClient.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  private adminService: AdminServiceClient;
  private userService: UserServiceClient;

  constructor(
    @Inject('ADMIN') private client: ClientGrpc,
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

  async getDataUser(username: UserEmail) {
    return this.userService.FindOneUserByEmail(email);
  }

  async signInUser(username: string, password: string) {
    const user = await firstValueFrom(await this.getDataUser({}));
  }

  async signInAdmin(email: string, password: string) {
    const admin = await firstValueFrom(await this.getDataAdmin({ email }));
    console.log(admin);
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

    // Successful login logic
    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }
}
