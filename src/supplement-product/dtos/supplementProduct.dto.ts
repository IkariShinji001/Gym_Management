import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { SProductType } from '../repositories/sProductType.entity';

export class CreateSupplementProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  typeId: number;
}

export class updateSupplementProductDto extends PartialType(
  CreateSupplementProductDto,
) {}
