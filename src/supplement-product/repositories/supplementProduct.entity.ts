import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SProductType } from './sProductType.entity';
import { SoldProduct } from './soldProduct.entity';

@Entity()
export class SupplementProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  imageUrl: string;

  @ManyToOne(() => SProductType, (type) => type.supplementProducts, {onDelete: 'CASCADE' })
  type: SProductType

  @OneToMany(() => SoldProduct, (soldProduct) => soldProduct.supplementProduct)
  soldProducts: SoldProduct[]
}
