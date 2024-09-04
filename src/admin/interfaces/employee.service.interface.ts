import { CreateEmployeeDto, UpdateEmployeeDto } from "../dtos/employee.dto";
import { CreateProfileDto } from "../dtos/profile.dto";
import { Employees } from "../repositories/employee.entity";

export interface IEmployeeService {
   findAll(): Promise<Employees[]>;
   findOne(id: number): Promise<Employees>;
   create(newProfile: CreateProfileDto, newEmployee: CreateEmployeeDto): Promise<Employees>;
   update(id: number, updateEmployee: UpdateEmployeeDto): Promise<Employees>;
   delete(id: number): Promise<void>;
    // findByPosition(position: string): Promise<Employees[]>;
    // findByHireDate(hireDate: Date): Promise<Employees[]>;
}