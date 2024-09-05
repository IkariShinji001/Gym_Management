import { Controller, Get, Param, Body, Post, Patch, Delete } from "@nestjs/common";
import { EmployeeService } from "../services/employee.services";
import { Employees } from "../repositories/employee.entity";
import { CreateEmployeeProfileDto } from "../dtos/createEmployeeProfile.dto";
import { UpdateEmployeeDto } from "../dtos/employee.dto";
// import { UpdateEmployeeDto } from "../dtos/employee.dto";


@Controller('/employees')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Get()
    async getEmployee(): Promise<Employees[]> {
        return await this.employeeService.findAll();
    }
    @Get(':id')
    async getOneEmployee(@Param('id') id: number): Promise<Employees> {
        return await this.employeeService.findOne(id);
    }
    @Post()
    async createEmployee(@Body() createEmployeeProfileDto:CreateEmployeeProfileDto): Promise<Employees> {
        const { createProfileDto, createEmployeeDto } = createEmployeeProfileDto;
        return await this.employeeService.create(createProfileDto, createEmployeeDto);
    }
    @Patch(':id')
    async updateEmployee(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employees>{
        return await this.employeeService.update(id, updateEmployeeDto);
    }
    @Delete(':id')
    async deleteEmployee(@Param('id') id: number) {
        return await this.employeeService.delete(id);
    }
}