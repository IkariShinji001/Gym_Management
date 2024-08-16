import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Admin } from '../repositories/admin.entity';
import { AdminService } from '../services/admin.services';
import { CreateAdminDto, updateAdminDto } from '../dtos/admin.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAdmins(): Promise<Admin[]> {
    return await this.adminService.findAll();
  }
  @Get()
  async findOneAdmin(@Param('id') id: number): Promise<Admin> {
    return await this.adminService.findOne(id);
  }
  @Post()
  async createAdmin(@Body() CreateAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminService.create(CreateAdminDto);
  }
  @Patch(':id')
  async updateAdmin(
    @Param('id') id: number,
    @Body() updateAdminDto: updateAdminDto,
  ) {
    return await this.adminService.update(id, updateAdminDto);
  }
  @Delete(':id')
  async deleteAdmin(@Param('id') id: number) {
    return await this.adminService.delete(id);
  }
  @Get('phone/:phoneNumber')
  async findByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<Admin[]> {
    return await this.adminService.findByPhoneNumber(phoneNumber);
  }

  @GrpcMethod('AdminService', 'FindAdminByEmail')
  async findAdminByEmail(data: { email: string }) {
    return await this.adminService.findOneByEmail(data);
  }
}
