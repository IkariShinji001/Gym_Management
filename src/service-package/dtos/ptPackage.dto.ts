import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreatePtPackagesDto {
  @IsNumber()
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
