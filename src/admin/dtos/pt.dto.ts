import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";

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

  @IsNumber()
  managerId: number;
  
}

export class UpdatePtDto extends PartialType(CreatePtDto) {}