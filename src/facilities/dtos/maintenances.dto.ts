import {
  IsBoolean,
  IsArray,
  IsDate,
  IsNumber,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Facilities } from '../repositories/facilities.entity';

export class CreateMaintenanceDto {
  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsBoolean()
  isFinished: boolean;

  @IsArray()
  facilityIds: number[];
}

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
