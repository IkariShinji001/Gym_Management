import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DistrictsService } from '../services/districts.service';
import { Districts } from '../repositories/districts.entity';
import { CreateDistrictDto, UpdateDistrictDto } from '../dtos/districts.dto';

@Controller('/districts')
export class DistrictsController {
  constructor(private districtsService: DistrictsService) {}

  @Get()
  async findAll(): Promise<Districts[]> {
    return await this.districtsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Districts> {
    return await this.districtsService.findOne(id);
  }

  @Post()
  async create(@Body() district: CreateDistrictDto): Promise<Districts> {
    return await this.districtsService.create(district);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() district: UpdateDistrictDto,
  ): Promise<Districts> {
    return await this.districtsService.update(id, district);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.districtsService.delete(id);
  }
}
