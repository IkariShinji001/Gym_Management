import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { FacilityTypeService } from '../services/facilityType.service';
import { CreateFacilityTypeDto } from '../dtos/facilityType.dto';

@Controller('/facility-type')
export class FacilityTypeController {
  constructor(private facilityTypeService: FacilityTypeService) {}

  @Get()
  async GetAll(){
    return await this.facilityTypeService.findAll();
  }

  @Post()
  async create(@Body() newFacilityType: CreateFacilityTypeDto) {
    return await this.facilityTypeService.create(newFacilityType);
  }

  @Get(':id')
  async findById(id: number) {
    return await this.facilityTypeService.findById(id);
  }

  @Patch(':id')
  async update(@Body() FacilityTypeToUpdate: CreateFacilityTypeDto, @Param('id') id: number) {
    return await this.facilityTypeService.update(id, FacilityTypeToUpdate);
  }
}