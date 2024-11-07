import { IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSupplementProductDto {
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @MinLength(1)
  imageUrl: string;

  @IsNotEmpty()
  typeId: number;
}

export class updateSupplementProductDto extends PartialType(
  CreateSupplementProductDto,
) {}
