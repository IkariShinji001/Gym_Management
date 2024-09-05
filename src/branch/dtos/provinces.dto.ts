import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateProvinceDto {
    @IsString()
    name: string;
}

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}