import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ServicePackages } from './servicePackage.entity';

@Entity()
export class PtPackages {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  ptId: number;

  @Column({ nullable: false })
  maxClients: number;

  @OneToOne(() => ServicePackages)
  @JoinColumn()
  servicePackage: ServicePackages;
}
