import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Districts } from "./districts.entity";

@Entity()
export class Provinces {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @OneToMany(() => Districts, (Districts) => Districts.province, {onDelete: 'CASCADE'} )
    districts: Districts[];
}