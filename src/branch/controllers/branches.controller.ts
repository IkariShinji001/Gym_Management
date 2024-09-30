import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBranchDto, UpdateBrachDto } from '../dtos/branches.dto';
import { BranchesService } from '../services/branches.service';
import { Branches } from '../repositories/branches.entity';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('/branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @Post()
  async create(@Body() newBranch: CreateBranchDto): Promise<Branches> {
    return await this.branchesService.create(newBranch);
  }

  @Get()
  async findAll(): Promise<Branches[]> {
    return await this.branchesService.findAll();
  }
  
  @Get('/count')
  async countBranch(): Promise<{ num_branches: number }> {
    console.log('count all branches');
    return await this.branchesService.countBranch();
  }

  @Get(':id')
  async findById(@Param('id') id: number ): Promise<Branches> {
    return await this.branchesService.findById(id);
  }

  @GrpcMethod('BranchService', 'findBranchById')
  async findBranchById(branchId: {id: number} ): Promise<Branches> {
    return await this.branchesService.findBranchById(branchId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() branch: UpdateBrachDto): Promise<Branches> {
    return await this.branchesService.update(id, branch)
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.branchesService.delete(id);
  }

  @Get('findBranchInProvince/:provinceId')
  async findBranchInProvince(@Param('provinceId') provinceId: number ): Promise<Branches[]> {
    return await this.branchesService.findBranchInProvince(provinceId);
  }
}
