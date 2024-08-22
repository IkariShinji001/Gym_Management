import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFacilityDto {
  @IsString()
  name: string;

  @IsNumber()
  branchId: number;

  @IsDate()
  purchaseDate: Date;

  @IsDate()
  warrantyStartDate: Date;

  @IsDate()
  warrantyEndDate: Date;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;
}

export class updateFacilityDto extends PartialType(CreateFacilityDto) {}
