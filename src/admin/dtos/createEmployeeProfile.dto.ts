import { CreateEmployeeDto } from "./employee.dto";
import { CreateProfileDto } from "./profile.dto";
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

export class CreateEmployeeProfileDto {
    @IsDefined()
    @ValidateNested()
    @Type(() => CreateProfileDto)
    createProfileDto: CreateProfileDto;

    @IsDefined()
    @ValidateNested()
    @Type(() => CreateEmployeeDto)
    createEmployeeDto: CreateEmployeeDto;
}

export class UpdateEmployeeProfileDto extends PartialType(CreateEmployeeProfileDto) {}
