import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";

export class CreateProvinceDto {
    @IsString()
    name: string;

    @IsNumber()
    id_external: number;
}

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}