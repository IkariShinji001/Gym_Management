import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateFitnessPackageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  coverImageUrl: string;
}

export class UpdateFitnessPackageDto {
  @IsString()
  coverImageUrl: Partial<string>;

  @IsNumber()
  @IsNotEmpty()
  servicePackageId: number;
}
