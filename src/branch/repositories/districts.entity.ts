import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Districts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;
}