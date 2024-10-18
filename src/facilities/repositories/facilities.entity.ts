import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Maintenances } from './maintenances.entity';
import { FacilityType } from './facilityType.entity';

@Entity()
export class Facilities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  branchId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ type: 'timestamptz', nullable: false })
  purchaseDate: Date;

  @Column({ type: 'timestamptz', nullable: false })
  warrantyStartDate: Date;

  @Column({ type: 'timestamptz', nullable: false })
  warrantyEndDate: Date;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({ nullable: false })
  facilityTypeId: number;

  @OneToMany(() => Maintenances, (Maintenances) => Maintenances.facility)
  maintenances: Maintenances[];

  @ManyToOne(() => FacilityType, (FacilityType) => FacilityType.facilities)
  facilityType: FacilityType;
}