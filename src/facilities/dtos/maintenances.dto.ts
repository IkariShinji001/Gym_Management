import { IsDate, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMaintenanceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
  
  @IsDate()
  date: Date;

  @IsString()
  imageUrl: string;
}

export class updateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
