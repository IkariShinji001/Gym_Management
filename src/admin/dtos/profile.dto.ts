import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  fullName: string;
}

export class updateProfileDto extends PartialType(CreateProfileDto) {}
