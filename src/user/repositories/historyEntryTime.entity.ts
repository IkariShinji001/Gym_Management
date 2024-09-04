import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import * as moment from 'moment-timezone';

@Entity()
export class HistoryEntryTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value, // Không thay đổi khi lưu
      from: (value: Date) =>
        moment(value).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss'), // Chuyển đổi khi lấy
    },
  })
  entry_time: string;

  @ManyToOne(() => User, (User) => User.historyEntryTimes)
  user: User;
}
