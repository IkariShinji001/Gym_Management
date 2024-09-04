import { Managers } from "../repositories/manager.entity";
import { Employees } from "../repositories/employee.entity";
import { CreateProfileDto } from "../dtos/profile.dto";

export interface IManagerService {
    findAll(): Promise<Managers[]>;
    findOne(id: number): Promise<Managers>;
    create(newProfile: CreateProfileDto): Promise<Managers>;
    update(id: number, updateManager: Managers): Promise<Managers>;
    delete(id: number): Promise<void>;
    FindAllEmployeesByManagerId(managerId: number): Promise<Employees[]>;
}
