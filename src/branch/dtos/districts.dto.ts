import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
    @IsString()
    name: string;

    @IsNumber()
    provinceId: number;
}

export class DistrictDto {
    @IsString()
    name: string;
}

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}