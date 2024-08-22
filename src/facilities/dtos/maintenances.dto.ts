import { IsDate, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Facilities } from '../repositories/facilities.entity';

export class CreateMaintenanceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsString()
  imageUrl: string;

  facility: Facilities;
}

export class updateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
