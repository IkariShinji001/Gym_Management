import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Provinces } from '../repositories/provinces.entity';
import { ProvincesService } from '../services/provinces.service';
import { CreateProvinceDto } from '../dtos/provinces.dto';

@Controller('/provinces')
export class ProvincesController {
  constructor(private provincesService: ProvincesService) {}
  @Get()
  async findAll(): Promise<Provinces[]> {
    return await this.provincesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Provinces> {
    return await this.provincesService.findOne(id);
  }

  @Post()
  async create(@Body() province: CreateProvinceDto): Promise<Provinces> {
    return await this.provincesService.create(province)
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() province: CreateProvinceDto): Promise<Provinces> {
    return await this.provincesService.update(id, province)
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.provincesService.delete(id)
  }
}
