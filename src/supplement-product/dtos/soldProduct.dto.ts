import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

export class CreateSoldProductDto {
  supplementProductId: number;

  profileId: number;

  quantity: number;

  price: number;
}

export class UpdateSoldProductDto extends PartialType(CreateSoldProductDto) {}
