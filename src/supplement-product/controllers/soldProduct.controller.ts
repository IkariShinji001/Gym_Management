import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { SoldProductService } from "../services/soldProduct.service";
import { SoldProduct } from "../repositories/soldProduct.entity";
import { CreateSoldProductDto } from "../dtos/soldProduct.dto";

@Controller('/sold-products')
export class SoldProductController{
    constructor(private soldProductService: SoldProductService) {}

    @Get()
    async getAllSoldProduct() : Promise<SoldProduct[]> {
        return await this.soldProductService.findAll()
    }

    @Post()
    async createSoldProduct(@Body() newSoldProduct: CreateSoldProductDto): Promise<SoldProduct> {
        return await this.soldProductService.create(newSoldProduct);
    }

    @Delete('/:id')
    async deleteSoldProduct(@Param('id') id: number) {
        await this.soldProductService.delete(id)
    }
}