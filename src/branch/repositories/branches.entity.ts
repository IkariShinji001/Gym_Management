import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Districts } from './districts.entity';

@Entity()
export class Branches {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ type: 'time', nullable: false })
  openTime: string;

  @Column({ type: 'time', nullable: false })
  closedTime: string;

  @Column({ nullable: false })
  districtId: number;

  @ManyToOne(() => Districts, (Districts) => Districts.branches, {onDelete: 'CASCADE' } )
  district: Districts;
}
