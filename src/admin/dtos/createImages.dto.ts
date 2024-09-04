import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";


export class createImagesDto {

    @IsString()
    imageUrl: string;
};

export class updateImagesDto extends PartialType(createImagesDto) {}
