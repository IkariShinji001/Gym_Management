import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateServicePackageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string;

  @IsNumber()
  typeId: number;
}

export class UpdateServicePackageDto extends PartialType(
  CreateServicePackageDto,
) {}
