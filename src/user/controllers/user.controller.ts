import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './../services/user.service';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'FindUserByUsername')
  async findAdminByEmail(data: { email: string }) {
    return await this.userService.findOneByUsername(data.email);
  }

  async createUser(newUser: CreateUserDto) {
    return await this.userService.createUser(newUser);
  }
}
