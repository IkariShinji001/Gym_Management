import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServiceTypeService } from '../services/servicePackageType.service';
import { ServicePackageType } from '../repositories/servicePackageType.entity';
import { CreateServiceTypeDto } from '../dtos/servicePackageType.dto';

@Controller('/service-package-types')
export class ServiceTypeController {
  constructor(private typeService: ServiceTypeService) {}

  @Get()
  async findAllType(): Promise<ServicePackageType[]>{
    return this.typeService.findAll()
  }
  @Get("/:id")
  async findTypeById(@Param("id") typeId: number): Promise<ServicePackageType>{
    return this.typeService.findOneById(typeId)
  }

  @Post()
  async createType(@Body() createTypeDto: CreateServiceTypeDto): Promise<ServicePackageType>{
    return await this.typeService.create(createTypeDto)
  }

  @Delete("/:id")
  async deleteType(@Param("id") typeId: number): Promise<void>{
    await this.typeService.delete(typeId)
  }
}
