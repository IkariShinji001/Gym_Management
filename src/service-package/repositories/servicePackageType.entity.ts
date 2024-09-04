import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServicePackages } from "./servicePackage.entity";

@Entity()
export class ServicePackageType{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    type: string

    @OneToMany(()=> ServicePackages, (servicePackage) => servicePackage.serviceType)
    servicePackages: ServicePackages[]
}