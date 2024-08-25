import { Injectable } from "@nestjs/common";
import {IMaintenanacesService} from "../interfaces/maintenances.service.interface"
import { Maintenances } from "../repositories/maintenances.entity";
import { CreateMaintenanceDto, UpdateMaintenanceDto } from "../dtos/maintenances.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class 
MaintenancesService implements IMaintenanacesService {
    constructor (
        @InjectRepository(Maintenances)
        private maintenancesRepository: Repository <Maintenances>,
    ) {}

    async create(newMaintenance: CreateMaintenanceDto): Promise<Maintenances> {
        const maintenance = this.maintenancesRepository.create(newMaintenance)
        return await this.maintenancesRepository.save(maintenance);
    }
    async update(id: number, updateMaintenance: UpdateMaintenanceDto): Promise<Maintenances> {
        await this.maintenancesRepository.update(id, updateMaintenance)
        return this.maintenancesRepository.findOne({where: {id}})
    }

    async delete(id: number): Promise<void> {
        const maintenance = await this.maintenancesRepository.findOne({where: {id}})
        await this.maintenancesRepository.delete(maintenance)
    }

    async findAll(): Promise<Maintenances[]> {
        return await this.maintenancesRepository.find()
    }
}