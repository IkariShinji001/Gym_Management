import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePtPackagesDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  maxClients: number;

  @IsNumber()
  ptId: number;
}

export class UpdatePtPackageDto {
  @IsNumber()
  maxClients: number;

  @IsNumber()
  ptId: number;

  @IsNumber()
  servicePackageId: number;
}
