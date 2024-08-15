import { IsString, IsNumber, IsEmail, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: number;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  fullName: number;

  @IsString()
  role: string;
}

export class updateAdminDto extends PartialType(CreateAdminDto) {}
