import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ServicePackages } from './servicePackage.entity';

@Entity()
export class FitnessPackages {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  coverImageUrl: string;

  @OneToOne(() => ServicePackages)
  @JoinColumn()
  servicePackage: ServicePackages;
}
