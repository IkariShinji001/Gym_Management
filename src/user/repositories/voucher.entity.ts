import { v4 as uuidv4 } from 'uuid';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as moment from 'moment';
import { User } from './user.entity';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  code: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column({
    type: 'timestamp with time zone',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) =>
        moment(value).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss'),
    },
  })
  endDate: string;

  @Column()
  discount: number;

  @Column({ default: 0 })
  minAmount: number;

  @Column()
  couponStripeId: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
  })
  discountType: DiscountType;

  @ManyToOne(() => User, (User) => User.vouchers)
  user: User;

  @BeforeInsert()
  generateCode() {
    this.code = uuidv4();
  }
}
