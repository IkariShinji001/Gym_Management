import { CreateMaintenanceDto, updateMaintenanceDto } from "../dtos/maintenances.dto";
import { Maintenances } from "../repositories/maintenances.entity";

export interface IMaintenanacesService {
    findAll(): Promise<Maintenances[]>;
    create(newMaintenance: CreateMaintenanceDto): Promise<Maintenances>;
    update(id: number, updateMaintenance: updateMaintenanceDto): Promise<Maintenances>
    delete(id: number): Promise<void>;
}