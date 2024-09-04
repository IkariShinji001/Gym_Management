import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FitnessBenefits } from "./fitnessBenefit.entity";

@Entity()
export class PackageBenefits{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'text'})
    description: string

    @OneToMany(() => FitnessBenefits, (fitnessBenefits) => fitnessBenefits.packageBenefit)
    fitnessBenefits: FitnessBenefits

}