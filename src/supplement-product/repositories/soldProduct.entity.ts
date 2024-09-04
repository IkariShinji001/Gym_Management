import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SupplementProduct } from './supplementProduct.entity';
import { Profile } from 'src/admin/repositories/profile.entity';

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
}
