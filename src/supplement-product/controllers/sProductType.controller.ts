import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SProductTypeService } from '../services/sProductType.service';
import { SProductType } from '../repositories/sProductType.entity';
import {
  CreateSProductTypeDto,
  UpdateSProductTypeDto,
} from '../dtos/sProductType.dto';

@Controller('/supplement-product-types')
export class SProductTypeController {
  constructor(private sProductTypeService: SProductTypeService) {}

  @Get()
  async getAllSProductType(): Promise<SProductType[]> {
    return this.sProductTypeService.findAll();
  }

  // @Get("/by-name")
  // async getSProductTypeByName(@Query('name') name: string): Promise<SProductType> {
  //   return this.sProductTypeService.findByName(name);
  // }

  @Post()
  async createSProductType(
    @Body() createSProductType: CreateSProductTypeDto,
  ): Promise<SProductType> {
    return this.sProductTypeService.create(createSProductType);
  }

  @Patch('/:id')
  async updateSProductType(
    @Param('id') id: number,
    @Body() updateSProductTypeDto: UpdateSProductTypeDto,
  ): Promise<SProductType> {
    return await this.sProductTypeService.update(id, updateSProductTypeDto);
  }

  @Delete('/:id')
  async deleteSProductType(@Param('id') id: number): Promise<void> {
    await this.sProductTypeService.delete(id);
  }
}
