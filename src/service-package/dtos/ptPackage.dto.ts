import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreatePtPackagesDto {
  @IsNumber()
  maxClients: number;

  @IsNumber()
  servicePackageId: number;

  @IsNumber()
  ptId: number;
}

export class UpdatePtPackageDto extends PartialType(CreatePtPackagesDto) {}
