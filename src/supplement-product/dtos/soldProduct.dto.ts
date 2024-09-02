import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreateSoldProductDto {
  @IsNumber()
  supplementProductId: number;

  @IsNumber()
  profileId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class UpdateSoldProductDto extends PartialType(CreateSoldProductDto) {}
