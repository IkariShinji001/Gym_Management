import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { ServicePackages } from './servicePackage.entity';
import { PackageDuration } from './packageDuration.entity';

@Entity()
@Unique(['packageDuration', 'servicePackage'])
export class ServicePackagePrice {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  coverImageUrl: string;

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
