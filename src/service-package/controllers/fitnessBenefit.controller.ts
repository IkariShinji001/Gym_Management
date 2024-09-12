import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FitnessBenefitService } from '../services/fitnessBenefit.service';
import { FitnessBenefits } from '../repositories/fitnessBenefit.entity';
import {
  CreateFitnessBenefitDto,
  DeleteFitnessBenefitDto,
} from '../dtos/fitnessBenefit.dto';

@Controller('/fitness-benefits')
export class FitnessBenefitsController {
  constructor(private fitnessBenefitService: FitnessBenefitService) {}

  @Get()
  async findAll(): Promise<FitnessBenefits[]> {
    return await this.fitnessBenefitService.findAll();
  }

  @Post('/create-list')
  async create(
    @Body()
    createFitnessBenefitDtoList: CreateFitnessBenefitDto[],
  ): Promise<FitnessBenefits[]> {
    return await this.fitnessBenefitService.createListFB(
      createFitnessBenefitDtoList,
    );
  }

  @Delete('/delete-list')
  async deleteList(
    @Body() deleteFitnessBenefitDtoList: DeleteFitnessBenefitDto[],
  ): Promise<void> {
    console.log(deleteFitnessBenefitDtoList)
    await this.fitnessBenefitService.deleteList(deleteFitnessBenefitDtoList);
  }
  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.fitnessBenefitService.delete(id);
  }
}
