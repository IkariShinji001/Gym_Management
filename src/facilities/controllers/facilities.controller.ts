import { BranchId } from 'src/shared/interfaces/grpc/branch/branchService.interface';
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
import { GrpcMethod } from '@nestjs/microservices';

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
    if (name) {
      return await this.facilitiesService.findByName(name);
    } else return await this.facilitiesService.findAll();
  }

  @Get('findFacilitiesByBranchId/:id')
  async findFacilitiesByBranchId(
    @Param('id') id: number,
  ): Promise<Facilities[]> {
    return await this.facilitiesService.findFacilitiesByBranchId(id);
  }

  // @Get('delete-facilities-by-branch-id/:id')
  // async deleteFacilitiesByBranchId(@Param('id') id: number) {
  // const BranchId = { id: id };
  // console.log(BranchId);
  //   await this.facilitiesService.deleteFacilitiesByBranchId(id);
  // }

  @GrpcMethod('FacilityService', 'deleteFacilitiesByBranchId')
  async deleteFacilitiesByBranchId(BranchId: BranchId) {
    const branchId = BranchId.id;
    console.log(branchId);
    return await this.facilitiesService.deleteFacilitiesByBranchId(branchId);
  }

  @Get('find-facilities-is-finished-true')
  async findFacilityIsFinishedTrue(): Promise<Facilities[]> {
    return this.facilitiesService.findFacilityIsFinishedTrue();
  }

  @Get('check-facility-is-finished-is-false/:id')
  async checkFacilityIsFinishedIsFalse(
    @Param('id') id: number,
  ): Promise<Facilities> {
    return await this.facilitiesService.checkFacilityIsFinishedIsFalse(id);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Facilities> {
    console.log(id);
    return await this.facilitiesService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.facilitiesService.delete(id);
  }
}
