import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HistoryEntryTime } from './historyEntryTime.entity';
import { v4 as uuidv4 } from 'uuid';
import { Voucher } from './voucher.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  gender: boolean;

  @Column({ nullable: true })
  dateBirth: Date;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  customerStripeId: string;

  @Column({ type: 'uuid', unique: true })
  referralCode: string;

  @BeforeInsert()
  @BeforeInsert()
  generateCode() {
    this.referralCode = uuidv4();
  }

  @OneToMany(
    () => HistoryEntryTime,
    (HistoryEntryTime) => HistoryEntryTime.user,
  )
  historyEntryTimes: HistoryEntryTime[];

  @OneToMany(() => Voucher, (Voucher) => Voucher.user)
  vouchers: Voucher[];
}
