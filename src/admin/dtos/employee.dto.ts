import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  position: string;


  hireDate: Date;

  @IsNumber()
  managerId: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
