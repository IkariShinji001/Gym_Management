import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SupplementProduct } from './supplementProduct.entity';

@Entity()
export class SupplementProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => SupplementProduct, (product) => product.type, {
    cascade: true,
  })
  supplementProducts: SupplementProduct[];
}
