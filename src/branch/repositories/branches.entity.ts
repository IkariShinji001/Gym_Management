import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branches {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false}) 
    name: string;

    @Column({nullable: false})
    address: string;
}