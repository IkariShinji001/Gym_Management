import { IsString, IsNumber, IsEmail, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../repositories/admin.entity';
export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  fullName: string;

  @IsString()
  role: Role;
}

export class updateAdminDto extends PartialType(CreateAdminDto) {}
