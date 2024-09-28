import { IsString } from 'class-validator';

export class CreatePackageBenefitsDto {
  @IsString()
  description: string;
}

export class UpdatePackageBenefitsDto {
  id: Partial<number>;
  description: Partial<string>;
}
