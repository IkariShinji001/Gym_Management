import { IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSupplementProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  typeId: number;
}

export class updateSupplementProductDto extends PartialType(
  CreateSupplementProductDto,
) {}
