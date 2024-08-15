import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";

@Entity()
export class SupplementProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    imageUrl: string

}