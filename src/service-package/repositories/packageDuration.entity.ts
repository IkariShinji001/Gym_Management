import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ServicePackagePrice } from './servicePackagePrice.entity';

enum DurationType {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

@Entity()
export class PackageDuration {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false, type: 'enum', enum: DurationType })
  durationType: DurationType;

  @OneToMany(
    () => ServicePackagePrice,
    (servicePackagePrice) => servicePackagePrice.packageDuration,
  )
  servicePackagePrices: ServicePackagePrice[];
}
