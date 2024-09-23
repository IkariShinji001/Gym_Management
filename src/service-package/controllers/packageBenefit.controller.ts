import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PackageBenefitService } from '../services/packageBenefit.service';
import { PackageBenefits } from '../repositories/packageBenefit.entity';
import {
  CreatePackageBenefitsDto,
  UpdatePackageBenefitsDto,
} from '../dtos/benefitPackage.dto';

@Controller('/package-benefits')
export class PackageBenefitController {
  constructor(private benefitService: PackageBenefitService) {}

  @Get()
  async getAll(): Promise<PackageBenefits[]> {
    return await this.benefitService.findAll();
  }
  @Post()
  async createPB(
    @Body() createBenefitDto: CreatePackageBenefitsDto,
  ): Promise<PackageBenefits> {
    console.log(createBenefitDto);
    return await this.benefitService.create(createBenefitDto);
  }

  @Post('/create-list')
  async createListPB(
    @Body() createBenefitDtoList: CreatePackageBenefitsDto[],
  ): Promise<PackageBenefits[]> {
    return await this.benefitService.createList(createBenefitDtoList);
  }

  @Patch('/:id')
  async updatePB(
    @Param('id') id: number,
    @Body() updateBenefitDto: UpdatePackageBenefitsDto,
  ) {
    return await this.benefitService.update(id, updateBenefitDto);
  }

  @Delete('/:id')
  async deletePB(@Param('id') id: number): Promise<void> {
    await this.benefitService.deleteBenefit(id);
  }
}
