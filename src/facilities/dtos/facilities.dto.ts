import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFacilityDto {
  @IsString()
  name: string;

  @IsString()
  description: number;

  maintenanceDate: Date;

  @IsString()
  imageUrl: number;
}

export class updateFacilityDto extends PartialType(CreateFacilityDto) {}
