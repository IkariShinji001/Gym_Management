import { IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsArray()
  packages: PackageDto[];
}

class PackageDto {
  @IsNumber()
  packagePriceId: number;
}
