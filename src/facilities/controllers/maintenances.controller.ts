import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import {MaintenancesService} from '../services/maintenances.service';
import { CreateMaintenanceDto } from "../dtos/maintenances.dto";
import { Maintenances } from "../repositories/maintenances.entity";
import { UpdateMaintenanceDto } from "../dtos/maintenances.dto";

@Controller('/maintenances')
export class MaintenancesController {
    constructor(private maintenancesService: MaintenancesService) {}

    @Post()
    async create(@Body() createMaintenanceDto: CreateMaintenanceDto): Promise <Maintenances> {
        return this.maintenancesService.create(createMaintenanceDto)
    }
    
    @Patch(':id')
    async update(@Param('id') id: number , @Body() updateMaintenanceDto: UpdateMaintenanceDto): Promise <Maintenances> {
        return await this.maintenancesService.update(id, updateMaintenanceDto)
    }

    @Get()
    async findAll(): Promise<Maintenances[]> {
        return this.maintenancesService.findAll();
    }

    @Delete(':id') 
    async delete(@Param('id') id: number): Promise <void> {
        await this.maintenancesService.delete(id)
    }
}