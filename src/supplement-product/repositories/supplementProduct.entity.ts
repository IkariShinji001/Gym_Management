import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SProductType } from './sProductType.entity';

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

  @ManyToOne(() => SProductType, (type) => type.supplementProducts)
  type: SProductType
}
