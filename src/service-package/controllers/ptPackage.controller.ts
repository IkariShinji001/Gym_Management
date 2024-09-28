import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PtPackagesService } from '../services/ptPackage.service';
import { PtPackages } from '../repositories/ptPackage.entity';
import { CreatePtPackagesDto } from '../dtos/ptPackage.dto';
import { CreateAllPtPackagesDto, UpdateAllPtPackageDto } from '../dtos/allPtPackage.dto';

@Controller('/pt-packages')
export class PtPackagesController {
  constructor(private ptPackagesService: PtPackagesService) {}

  @Get()
  async getAllPP(): Promise<PtPackages[]> {
    return await this.ptPackagesService.find();
  }

  @Get('/detail')
  async getAllPPDetail(){
    return await this.ptPackagesService.getAllPPDetail()
  }

  @Get('/getAll')
  async getAll(): Promise<PtPackages[]> {
    return await this.ptPackagesService.getAll();
  }
  @Get("/:id")
  async getPPById(@Param("id") ptPackageId: number): Promise<PtPackages>{
    return await this.ptPackagesService.getById(ptPackageId);
  }

  @Post()
  async createPP(@Body()  createAllPPDto: CreateAllPtPackagesDto): Promise<PtPackages> {
    return await this.ptPackagesService.create(createAllPPDto)
  }

  @Patch("/:id")
  async updatePP(@Param("id") ptPackageId: number, @Body() updateAllPPDto: UpdateAllPtPackageDto, ){
    console.log(updateAllPPDto)

    return this.ptPackagesService.updatePP(ptPackageId, updateAllPPDto);
  }

  @Delete("/:id")
  async deletePP(@Param("id") ptPackageId: number): Promise<void>{
    await this.ptPackagesService.delete(ptPackageId)
  }
}
