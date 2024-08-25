import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistoryExcercises {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  entryTime: Date;
}
