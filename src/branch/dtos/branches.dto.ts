import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  phoneNumber: string;

  @IsString()
  openTime: string;

  @IsString()
  closedTime: string;

  @IsNumber()
  districtId: number;
}

export class UpdateBrachDto extends PartialType(CreateBranchDto) {}
