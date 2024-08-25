import { IsString, IsEmail, IsPhoneNumber, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../repositories/profile.entity';
export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  fullName: string;

  @IsEnum(Role)
    role: Role;  
}

export class updateProfileDto extends PartialType(CreateProfileDto) {}
