import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServicePackagesService } from '../services/servicePackage.service';
import { ServicePackages } from '../repositories/servicePackage.entity';
import { CreateServicePackageDto } from '../dtos/servicePackage.dto';

@Controller('/service-packages')
export class ServicePackageController {
  constructor(private servicePackageService: ServicePackagesService) {}

  @Get()
  async getAllServicePackage(): Promise<ServicePackages[]> {
    return this.servicePackageService.findAll();
  }

  @Post()
  async createServicePackage(
    @Body() newServicePackage: CreateServicePackageDto,
  ): Promise<ServicePackages> {
    console.log("service contgrolle")
    console.log(newServicePackage)
    return this.servicePackageService.create(newServicePackage);
  }

  @Delete("/:id")
  async deleteSP(@Param("id") id:number){
    await this.servicePackageService.delete(id)
  }
}
