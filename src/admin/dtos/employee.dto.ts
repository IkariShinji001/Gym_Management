import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  position: string;

  @IsDate()
  hireDate: Date;

  @IsNumber()
  managerId: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
