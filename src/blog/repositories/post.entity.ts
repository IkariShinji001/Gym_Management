import * as moment from 'moment-timezone';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  cover_image: string

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) =>
        moment(value).utcOffset('+07:00').format('DD-MM-YYYY HH:mm:ss'),
    },
  })
  createdAt: Date;
}
