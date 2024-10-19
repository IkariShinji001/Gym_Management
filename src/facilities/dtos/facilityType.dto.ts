import { IsString } from "class-validator";

export class CreateFacilityTypeDto {
    @IsString()
    name: string;
}