import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSupplementProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  typeId: number;
}

export class updateSupplementProductDto extends PartialType(
  CreateSupplementProductDto,
) {}
