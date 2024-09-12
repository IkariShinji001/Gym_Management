import { IsArray,  IsDate, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateMaintenanceDto {
  @IsString()
  description: string;

  @IsDate()
  date: Date;

  isFinished: boolean;

  @IsArray()
  facilityIds: number[];
}

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
