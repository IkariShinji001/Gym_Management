import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateServicePackageDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  typeId: number;
}

export class UpdateServicePackageDto extends PartialType(
  CreateServicePackageDto,
) {}
