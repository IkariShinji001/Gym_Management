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
  async getProfiles(): Promise<Profile[]> {
    return await this.profileService.findAll();
  }
  @Get(':id')
  async findOneProfile(@Param('id') id: number): Promise<Profile> {
    return await this.profileService.findOne(id);
  }
  @Post()
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.create(createProfileDto);
  }

  @Patch(':id')
  async updateProfile(
    @Param('id') id: number,
    @Body() updateProfileDto: updateProfileDto,
  ) {
    return await this.profileService.update(id, updateProfileDto);
  }
  @Delete(':id')
  async deleteProfile(@Param('id') id: number) {
    return await this.profileService.delete(id);
  }
  @Get('/phone/:phoneNumber')
  async findByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<Profile[]> {
    return await this.profileService.findByPhoneNumber(phoneNumber);
  }
  @Patch('/password/:id')
  async changePassword(
    @Param('id') id: number,
    @Body() data: { password: string, newPassword: string },
  ) {
    return await this.profileService.changePassword(id, data.password, data.newPassword);
  }

  @GrpcMethod('AdminService', 'FindAdminByEmail')
  async findProfileByEmail(data: { email: string }) {
    return await this.profileService.findOneByEmail(data);
  }
}
