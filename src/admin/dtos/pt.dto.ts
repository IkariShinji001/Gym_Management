import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreatePtDto {
  @IsString()
  weight: string;

  @IsString()
  height: string;

  @IsString()
  bust: string;

  @IsString()
  waist: string;

  @IsString()
  hips: string;
  
  @IsString()
  fbLink: string;
  
}

export class UpdatePtDto extends PartialType(CreatePtDto) {}