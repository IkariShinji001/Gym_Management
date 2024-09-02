import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common"
import {PtImagesService} from "../services/ptImages.services"

@Controller('ptImages')
export class PtImagesController {
    constructor(private PtImagesService : PtImagesService 
    ) {}
    @Get()
    async findAll() {
        return this.PtImagesService.findAll();
    }   
    @Post()
    async addImage(@Body() newImg: {imageUrl: string, idPt: number}) {
        const {imageUrl, idPt} = newImg;
        return this.PtImagesService.addImage(imageUrl, idPt);
    }
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.PtImagesService.delete(id)
    }
}