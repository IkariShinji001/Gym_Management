import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Facilities } from "./facilities.entity";

@Entity()
export class Maintenances {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'timestamptz', nullable: false})
    date: Date;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    isFinished: boolean;

    @ManyToOne(() => Facilities, (Facilities) => Facilities.maintenance)
    facility: Facilities;

    
}