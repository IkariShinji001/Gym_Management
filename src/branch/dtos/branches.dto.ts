import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateBranchDto {
    @IsString()
    name: string;

    @IsString()
    address: string;
}

export class UpdateBrachDto extends PartialType(CreateBranchDto) {}