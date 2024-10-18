import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UserService } from './../services/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { parseDateFromMMDDYYYY } from '../../shared/formatDate';
import { ListUsersId } from '../interfaces/userService.interface';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'FindOneUserByUsername')
  async FindOneUserByUsername(username: { username: string }) {
    return await this.userService.findOneByUsername(username.username);
  }

  @GrpcMethod('UserService', 'FindOneUserById')
  async FindOneUserByUserId(userId: { userId: number }) {
    return await this.userService.findOneByUserId(userId.userId);
  }

  @GrpcMethod('UserService', 'FindListUsersNameByListUsersId')
  async FindListUsersNameByListUsersId(listUsersId: ListUsersId) {
    return await this.userService.FindListUsersNameByListUsersId(listUsersId);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    console.log(id);
    return await this.userService.findOneByUserId(id);
  }

  @Get('/username')
  async getUserByUsername(@Query('username') username: string) {
    return await this.userService.findOneByUsername(username);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    console.log(newUser);
    return await this.userService.createUser(newUser);
  }

  @Get('/:id/entry-times')
  async getAllEntriesTimesByUserId(
    @Param('id') id: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    console.log(startDate, endDate);
    return this.userService.getAllEntryTimeByUserId(
      id,
      new Date(startDate),
      new Date(endDate),
    );
  }
  
  @Post('/reset-password')
  async resetPassword(@Body() payload: { email: string }) {
    const { email } = payload;
    return await this.userService.sendMailResetPassword(email);
  }
  @Patch('/change-password/:id')
  async changePassword(@Param('id') id: number, @Body() data: { password: string, newPassword: string }) {
    return await this.userService.changePassword(id, data.password, data.newPassword);
  }
  @Post('/update-password-with-token')
  async updatePasswordWithToken(@Query('token') token: string, @Body() payload: { newPassword: string }) {
    const { newPassword } = payload;
    return await this.userService.updatePasswordWithToken(token, newPassword);
  }

}
