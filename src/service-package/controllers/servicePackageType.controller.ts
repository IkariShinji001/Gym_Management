import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ServiceTypeService } from '../services/servicePackageType.service';
import { ServicePackageType } from '../repositories/servicePackageType.entity';
import {
  CreateServiceTypeDto,
  UpdateServiceTypeDto,
} from '../dtos/servicePackageType.dto';

@Controller('/service-package-types')
export class ServiceTypeController {
  constructor(private typeService: ServiceTypeService) {}

  @Get()
  async findAllType(): Promise<ServicePackageType[]> {
    return this.typeService.findAll();
  }
  @Get('/:id')
  async findTypeById(@Param('id') typeId: number): Promise<ServicePackageType> {
    return this.typeService.findOneById(typeId);
  }

  @Post()
  async createType(
    @Body() createTypeDto: CreateServiceTypeDto,
  ): Promise<ServicePackageType> {
    return await this.typeService.create(createTypeDto);
  }

  @Post('/list/packages')
  async getListTypeByServicePackageId(
    @Body() payload: { servicePackageIds: number[] },
  ) {
    return await this.typeService.getListTypeByServicePackageId(
      payload.servicePackageIds,
    );
  }

  @Patch('/:typeId')
  async updateType(
    @Param('typeId') typeId: number,
    updateServiceTypeDto: UpdateServiceTypeDto,
  ): Promise<ServicePackageType> {
    return await this.typeService.update(typeId, updateServiceTypeDto);
  }

  @Delete('/:typeId')
  async deleteType(@Param('typeId') typeId: number): Promise<void> {
    await this.typeService.delete(typeId);
  }
}
