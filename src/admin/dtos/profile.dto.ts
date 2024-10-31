import { IsString, IsEmail, IsPhoneNumber, IsEnum, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../repositories/profile.entity';
export class CreateProfileDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(1)
  @IsString() 
  email: string;

  @IsString()
  password: string;

  phoneNumber: string;


  @IsString()
  fullName: string;

  @IsEnum(Role)
  role: Role;
}

export class updateProfileDto extends PartialType(CreateProfileDto) {}
