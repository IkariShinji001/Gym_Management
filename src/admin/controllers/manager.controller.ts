import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EmployeeService } from "../services/employee.services";
import { CreateProfileDto } from "../dtos/profile.dto";
import { ProfileService } from "../services/profile.services";
import { ManagerService } from "../services/manager.services";


@Controller('/managers')
export class ManagerController {
    constructor(private managerService:ManagerService,
                private profileService:ProfileService
    ) {}

    @Get()
    async getManagers() {
        return await this.managerService.findAll();
    }
    @Get(':id')
    async getOneManager(@Param('id') id: number) {
        return await this.managerService.findOne(id);
    }
    @Post()
    async create(@Body() createProfileDto: CreateProfileDto) {
        console.log(createProfileDto);
        //  const res =await this.profileService.create(createProfileDto);
        return await this.managerService.create(createProfileDto);
    }    
    @Delete(':id')
    async deleteManager(@Param('id') id: number) {
        return await this.managerService.delete(id);
    }
    @Get(':id/employees')
    async getEmployeesByManagerId(@Param('id') id: number) {
        return await this.managerService.FindAllEmployeesByManagerId(id);
    }
}