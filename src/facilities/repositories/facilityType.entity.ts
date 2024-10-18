import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Facilities } from './facilities.entity';

@Entity()
export class FacilityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Facilities, (Facilities) => Facilities.facilityType)
  facilities: Facilities[];
}