import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HistoryEntryTime } from './historyEntryTime.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: boolean;

  @Column()
  dateBirth: Date;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(
    () => HistoryEntryTime,
    (HistoryEntryTime) => HistoryEntryTime.user,
  )
  historyEntryTimes: HistoryEntryTime[];
}
