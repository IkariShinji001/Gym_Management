import { GrpcMethod } from '@nestjs/microservices';
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
import { PageOptionsDto } from 'src/shared/dto/page.options.dto';
import { User } from '../repositories/user.entity';
import { PageDto } from 'src/shared/dto/page.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/all-emails-per-page')
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return this.userService.getAllUserEmailPerPage(pageOptionsDto);
  }

  @Get('all-emails-per-page-by-gender')
  async getAllUserEmailPerPageByGender(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('gender') gender: boolean,
  ): Promise<PageDto<User>> {
    return await this.userService.getAllUserEmailPerPageByGender(
      pageOptionsDto,
      gender,
    );
  }

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
}
