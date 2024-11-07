import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';

export class CreateServicePackagePriceDto {
  @IsNotEmpty()
  @Min(0, { message: 'Price must be greater than 0' })
  price: number;

  @IsNotEmpty()
  packageDurationId: number;
}

export class UpdateServicePackagePriceDto {
  priceId: Partial<number>;
  price: Partial<number>;
  packageDurationId: Partial<number>;
}
