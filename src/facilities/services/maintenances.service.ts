import { Injectable } from "@nestjs/common";
import {IMaintenanacesService} from "../interfaces/maintenances.service.interface"
import { Maintenances } from "../repositories/maintenances.entity";
import { CreateMaintenanceDto, updateMaintenanceDto } from "../dtos/maintenances.dto";

@Injectable()
export class MaintenancesService implements IMaintenanacesService {
    create(newMaintenance: CreateMaintenanceDto): Promise<Maintenances> {
        throw new Error("Method not implemented.");
    }
    update(id: number, updateMaintenance: updateMaintenanceDto): Promise<Maintenances> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Maintenances[]> {
        throw new Error("Method not implemented.");
    }
    
}