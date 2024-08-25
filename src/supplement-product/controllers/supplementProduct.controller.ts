import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SupplementProductService } from '../services/supplementProduct.service';
import { SupplementProduct } from '../repositories/supplementProduct.entity';
import {
  CreateSupplementProductDto,
  updateSupplementProductDto,
} from '../dtos/supplementProduct.dto';

@Controller('/supplement-products')
export class SupplementProductController {
  constructor(private supplementProductService: SupplementProductService) {}

  @Get()
  async getSupplementProductByName(
    @Query('name') name: string,
  ): Promise<SupplementProduct[]> {
    if (name) {
      return await this.supplementProductService.findByName(name);
    } else return await this.supplementProductService.findAll();
  }

  @Get('/by-type/:typeId')
  async getSupplementProductByType(
    @Param('typeId') type: number,
  ): Promise<SupplementProduct[]> {
    return await this.supplementProductService.findByType(type);
  }

  @Get('/:id')
  async getSupplementProductById(@Param('id') id: number) {
    return await this.supplementProductService.findOne(id);
  }

  @Post()
  async createSupplementProduct(
    @Body() createSupplementProduct: CreateSupplementProductDto,
  ) {
    return await this.supplementProductService.create(createSupplementProduct);
  }

  @Patch('/:id')
  async updateSupplementProduct(
    @Param('id') id: number,
    @Body() updateSupplementProduct: updateSupplementProductDto,
  ) {
    return await this.supplementProductService.update(
      id,
      updateSupplementProduct,
    );
  }

  @Delete(':id')
  async deleteSupplementProduct(@Param('id') id: number) {
    await this.supplementProductService.delete(id);
  }
}
