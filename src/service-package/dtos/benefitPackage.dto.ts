import { IsString } from 'class-validator';

export class CreatePackageBenefitsDto {
  @IsString()
  description: string;
}

export class UpdateExistedBenefitsDto {
  id: Partial<number>;
  description: Partial<string>;
}
