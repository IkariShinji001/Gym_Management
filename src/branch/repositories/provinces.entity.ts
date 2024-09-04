import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provinces {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;
}