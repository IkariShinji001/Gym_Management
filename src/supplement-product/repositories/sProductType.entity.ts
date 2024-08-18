import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplementProduct } from "./supplementProduct.entity";

@Entity()
export class SProductType{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @OneToMany(() => SupplementProduct, (product) => product.type)
    supplementProducts: SupplementProduct[]
}