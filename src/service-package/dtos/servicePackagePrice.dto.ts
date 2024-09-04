import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreateServicePackagePriceDto {
  @IsNumber()
  price: number;

  @IsNumber()
  servicePackageId: number;

  @IsNumber()
  packageDurationId: number;
}

export class UpdateServicePackagePriceDto {
  priceId: Partial<number>;
  price: Partial<number>;
  servicePackageId: Partial<number>;
  packageDurationId: Partial<number>;
}
