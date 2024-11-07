import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateServicePackageDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  description: string;

  typeId: number;
}

export class UpdateServicePackageDto extends PartialType(
  CreateServicePackageDto,
) {}
