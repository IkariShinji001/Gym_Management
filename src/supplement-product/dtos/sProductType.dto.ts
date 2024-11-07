import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateSProductTypeDto {
  name: string;
}

export class UpdateSProductTypeDto extends PartialType(CreateSProductTypeDto) {}
