import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ServicePackages } from './servicePackage.entity';
import { Pt } from 'src/admin/repositories/pt.entity';

@Entity()
export class PtPackages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  maxClients: number;

  @Column({ default: 0 })
  currentClients: number;

  @OneToOne(() => ServicePackages)
  @JoinColumn()
  servicePackage: ServicePackages;

  @ManyToOne(() => Pt, (pt) => pt.ptPackages)
  pt: Pt; 
}
