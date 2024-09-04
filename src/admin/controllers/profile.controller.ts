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
import { Profile } from '../repositories/profile.entity';
import { ProfileService } from '../services/profile.services';
import { CreateProfileDto, updateProfileDto } from '../dtos/profile.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async getAdmins(): Promise<Profile[]> {
    return await this.profileService.findAll();
  }
  @Get()
  async findOneAdmin(@Param('id') id: number): Promise<Profile> {
    return await this.profileService.findOne(id);
  }
  @Post()
  async createAdmin(
    @Body() createAdminDto: CreateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.create(createAdminDto);
  }
  @Patch(':id')
  async updateAdmin(
    @Param('id') id: number,
    @Body() updateAdminDto: updateProfileDto,
  ) {
    return await this.profileService.update(id, updateAdminDto);
  }
  @Delete(':id')
  async deleteAdmin(@Param('id') id: number) {
    return await this.profileService.delete(id);
  }
  @Get('/phone/:phoneNumber')
  async findByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<Profile[]> {
    return await this.profileService.findByPhoneNumber(phoneNumber);
  }

  @GrpcMethod('AdminService', 'FindAdminByEmail')
  async findAdminByEmail(data: { email: string }) {
    return await this.profileService.findOneByEmail(data);
  }
}
