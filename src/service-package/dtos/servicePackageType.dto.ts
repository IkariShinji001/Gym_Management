import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateServiceTypeDto {
  @IsString()
  type: string;
}

export class UpdateServiceTypeDto extends PartialType(CreateServiceTypeDto) {}
