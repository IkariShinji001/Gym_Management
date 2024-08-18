import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFacilityDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  maintenanceDate: Date;

  @IsString()
  imageUrl: string;
}

export class updateFacilityDto extends PartialType(CreateFacilityDto) {}
