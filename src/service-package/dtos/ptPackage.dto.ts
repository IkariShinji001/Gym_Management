import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePtPackagesDto {
  @IsNotEmpty()
  @Min(1)
  maxClients: number;

  ptId: number;
}

export class UpdatePtPackageDto {
  maxClients: number;

  ptId: number;

  servicePackageId: number;
}
