import { SoldProduct } from 'src/supplement-product/repositories/soldProduct.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  manager = 'manager',
  employee = 'employee',
  pt = 'pt',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
// email unique
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ type: 'enum', enum: Role, nullable: false })
  role: Role;

  // change to sell product < hukhan>
  @OneToMany(() => SoldProduct, (soldProduct) => soldProduct.profile)
  soldProducts: SoldProduct
}
