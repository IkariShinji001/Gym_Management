import { CreateEmployeeDto } from "./employee.dto";
import { CreateProfileDto } from "./profile.dto";
import { PartialType } from '@nestjs/mapped-types';

export class CreateEmployeeProfileDto {
    createProfileDto: CreateProfileDto;
    createEmployeeDto: CreateEmployeeDto;
}

export class UpdateEmployeeProfileDto extends PartialType(CreateEmployeeProfileDto) {}
