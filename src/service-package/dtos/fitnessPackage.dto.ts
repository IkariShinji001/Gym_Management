import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateFitnessPackageDto {
  @IsString()
  coverImageUrl: string;

  @IsNumber()
  servicePackageId: number;
}

export class UpdateFitnessPackageDto {
  coverImageUrl: Partial<string>;
  servicePackageId: Partial<number>;
}
