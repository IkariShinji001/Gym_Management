import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ServicePackages } from './servicePackage.entity';
import { FitnessBenefits } from './fitnessBenefit.entity';

@Entity()
export class FitnessPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  coverImageUrl: string;

  @OneToOne(() => ServicePackages)
  @JoinColumn()
  servicePackage: ServicePackages;

  @OneToMany(()=> FitnessBenefits, (fitnessBenefits) => fitnessBenefits.fitnessPackage)
  fitnessBenefits: FitnessBenefits
}
