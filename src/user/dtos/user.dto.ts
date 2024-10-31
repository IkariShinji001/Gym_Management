import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  gender: boolean;

  dateBirth: Date;

  phoneNumber: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
