import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServicePackagePriceService } from '../services/servicePackagePrice.service';
import { ServicePackagePrice } from '../repositories/servicePackagePrice.entity';
import { GrpcMethod } from '@nestjs/microservices';
import { ServicePackagePriceListIds } from 'src/shared/interfaces/grpc/servicePackage/servicePackage.interface';

@Controller('/service-package-prices')
export class PackagePriceController {
  constructor(private packagePriceService: ServicePackagePriceService) {}

  @GrpcMethod('ServicePackageService', 'FindServicePackagePriceByListIds')
  async FindServicePackagePriceByListIds(listId: ServicePackagePriceListIds) {
    const PackagePriceList =
      await this.packagePriceService.getAllByListIds(listId);
    return PackagePriceList;
  }

  @Get()
  async getAllPackagePrice(): Promise<ServicePackagePrice[]> {
    return await this.packagePriceService.findAll();
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.packagePriceService.deletePackagePrice(id);
  }

  @Get("/:id")
  async findByServicePackage(@Param('id') id:number): Promise<ServicePackagePrice[]> {
    return await this.packagePriceService.findByServicePackage(id)
  }
  @Get("/id/:id")
  async findByServicePackageId(@Param('id') id:number): Promise<ServicePackagePrice[]> {
    return await this.packagePriceService.findByServicePackageId(id)
  }
}
