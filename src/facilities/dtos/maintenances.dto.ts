import { IsBoolean, IsDate, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Facilities } from '../repositories/facilities.entity';


export class CreateMaintenanceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
  
  @IsDate()
  date: Date;

  @IsBoolean()
  isFinished: boolean;

  facility: Facilities;
}

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
