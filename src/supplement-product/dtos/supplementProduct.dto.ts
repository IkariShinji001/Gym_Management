import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSupplementProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;
}

export class updateSupplementProductDto extends PartialType(
  CreateSupplementProductDto,
) {}
