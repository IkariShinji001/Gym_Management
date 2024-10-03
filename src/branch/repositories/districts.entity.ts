import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Branches } from "./branches.entity";
import { Provinces } from "./provinces.entity";

@Entity()
export class Districts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @OneToMany(() => Branches, (Branches) => Branches.district, {onDelete: 'CASCADE'} )
    branches: Branches[];

    @Column({nullable: false})
    provinceId: number;

    @ManyToOne(() => Provinces, (Provinces) => Provinces.districts, {onDelete: 'CASCADE'} )
    province: Provinces;
}