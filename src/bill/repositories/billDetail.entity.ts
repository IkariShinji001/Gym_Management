import * as moment from 'moment';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Bills } from './bill.entity';

@Entity()
@Unique(['bill', 'servicePackagePriceId']) // Composite unique constraint
export class BillDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  servicePackagePriceId: number;

  @Column()
  price: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value, // Không thay đổi khi lưu
      from: (value: Date) =>
        moment(value).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss'), // Chuyển đổi khi lấy
    },
  })
  startEffective: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value, // Không tahay đổi khi lưu
      from: (value: Date) =>
        moment(value).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss'), // Chuyển đổi khi lấy
    },
  })
  endEffective: Date;

  @ManyToOne(() => Bills, (Bills) => Bills.billDetails)
  bill: Bills;
}
