import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SupplementProduct } from './supplementProduct.entity';
import { Profile } from 'src/admin/repositories/profile.entity';
import * as moment from 'moment-timezone';

@Entity()
export class SoldProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SupplementProduct, (product) => product.soldProducts)
  supplementProduct: SupplementProduct;

  @ManyToOne(() => Profile, (profile) => profile.soldProducts)
  profile: Profile;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) =>
        moment(value).utcOffset('+07:00').format('DD/MM/YYYY HH:mm:ss'),
    },
  })
  createdAt: Date;
}
