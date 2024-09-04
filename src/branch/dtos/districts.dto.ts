import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateDistrictDto {
    @IsString()
    name: string;
}

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}