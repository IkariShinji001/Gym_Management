import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServicePackagePrice } from './servicePackagePrice.entity';
import { ServicePackageType } from './servicePackageType.entity';

@Entity()
export class ServicePackages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @OneToMany(
    () => ServicePackagePrice,
    (servicePackagePrice) => servicePackagePrice.servicePackage,
  )
  servicePackagePrices: ServicePackagePrice[];

  @ManyToOne(()=> ServicePackageType, (serviceType) => serviceType.servicePackages)
  serviceType: ServicePackageType
}
