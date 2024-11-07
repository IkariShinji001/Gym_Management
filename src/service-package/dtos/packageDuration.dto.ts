import { IsEnum, IsNumber } from 'class-validator';
import { DurationType } from '../repositories/packageDuration.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePackageDurationDto {
  duration: number;

  durationType: DurationType;
}

export class UpdatePackageDurationDto extends PartialType(
  CreatePackageDurationDto,
) {}
