import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PackageBenefits } from './packageBenefit.entity';
import { FitnessPackage } from './fitnessPackage.entity';

@Entity()
@Unique(['fitnessPackage', 'packageBenefit'])
export class FitnessBenefits {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => PackageBenefits,
    (packageBenefits) => packageBenefits.fitnessBenefits,
    { onDelete: 'CASCADE' },
  )
  packageBenefit: PackageBenefits;

  @ManyToOne(() => FitnessPackage, (fitness) => fitness.fitnessBenefits)
  fitnessPackage: FitnessPackage;
}
