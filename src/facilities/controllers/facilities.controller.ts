import { CreateFacilityDto, updateFacilityDto } from '../dtos/facilities.dto';
import { Facilities } from '../repositories/facilities.entity';
import { FacilitiesService } from '../services/facilities.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('/facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Post()
  async create(
    @Body() createFacilityDto: CreateFacilityDto,
  ): Promise<Facilities> {
    return await this.facilitiesService.create(createFacilityDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFacility: updateFacilityDto,
  ): Promise<Facilities> {
    return await this.facilitiesService.update(id, updateFacility);
  }

  @Get()
  async findByName(@Query('name') name: string): Promise<Facilities[]> {
    if(name) {
      return await this.facilitiesService.findByName(name);
    }
      else return await this.facilitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Facilities> {
    return await this.facilitiesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.facilitiesService.delete(id);
  }
}
