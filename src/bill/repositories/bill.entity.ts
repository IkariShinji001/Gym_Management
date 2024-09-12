import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BillDetail } from './billDetail.entity';

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

  @OneToMany(() => BillDetail, (BillDetail) => BillDetail.bill)
  billDetails: BillDetail[];
}
