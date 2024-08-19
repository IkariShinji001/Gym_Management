import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServicePackagePrice } from './servicePackagePrice.entity';

@Entity()
export class ServicePackages {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @OneToMany(
    () => ServicePackagePrice,
    (servicePackagePrice) => servicePackagePrice.servicePackage,
  )
  servicePackagePrices: ServicePackagePrice[];
}
