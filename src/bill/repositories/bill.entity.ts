import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BillDetail } from './billDetail.entity';
import * as moment from 'moment';

export enum BillStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}
@Entity()
export class Bills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  totalAmount: number;

  @Column({ default: 0 })
  discountAmount: number;

  @Column()
  finalAmount: number;

  @Column({
    type: 'enum',
    enum: BillStatus,
    default: BillStatus.PENDING,
  })
  status: BillStatus;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value, // Không thay đổi khi lưu
      from: (value: Date) =>
        moment(value).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss'), // Chuyển đổi khi lấy
    },
  })
  createAt: Date;

  @OneToMany(() => BillDetail, (BillDetail) => BillDetail.bill)
  billDetails: BillDetail[];
}
