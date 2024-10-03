import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Pt } from "../repositories/pt.entity";
import { PtService } from "../services/pt.services";
import { CreatePtProfileDto } from "../dtos/createprofilept.dto";
import { UpdatePtDto } from "../dtos/pt.dto";
import { PtImagesService } from "../services/ptImages.services";


@Controller('/pts')
export class PtController {
    constructor(private ptService: PtService) {}

    @Get()
    async getPt(): Promise<Pt[]> {
        return await this.ptService.findAll();
    }
    @Get(':id')
    async findOnePt(@Param('id') id: number): Promise<Pt> {
        return await this.ptService.findOne(id);
    }
    @Get('/profile/:id')
    async findByProfileId(@Param('id') id: number): Promise<Pt> {
        return await this.ptService.findByProfileId(id);
    }
    @Post()
    async create(@Body() createPtProfilePtDto: CreatePtProfileDto): Promise<Pt> {
        const { createProfileDto, createPtDto, createImagesDto } = createPtProfilePtDto;
        return await this.ptService.create(createProfileDto, createPtDto, createImagesDto);
    }
    @Patch(':id')
    async updatePt(@Param('id') id:number, @Body() updatePtDto: UpdatePtDto): Promise<Pt> {
        return await this.ptService.update(id, updatePtDto)
    }
    @Delete(':id')
    async deletePt(@Param('id') id: number) {
        return await this.ptService.delete(id);
    }
}