import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
  Decimal128,
} from 'typeorm';
import { ServicePackages } from './servicePackage.entity';
import { PackageDuration } from './packageDuration.entity';

@Entity()
@Unique(['packageDuration', 'servicePackage'])
export class ServicePackagePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal',{nullable: false})
  price: number;

  @ManyToOne(
    () => ServicePackages,
    (servicePackage) => servicePackage.servicePackagePrices,
  )
  servicePackage: ServicePackages;

  @ManyToOne(
    () => PackageDuration,
    (packageDuration) => packageDuration.servicePackagePrices,
  )
  packageDuration: PackageDuration;
}
