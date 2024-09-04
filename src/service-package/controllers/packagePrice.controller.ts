import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServicePackagePriceService } from '../services/servicePackagePrice.service';
import { ServicePackagePrice } from '../repositories/servicePackagePrice.entity';

@Controller('/service-package-prices')
export class PackagePriceController {
  constructor(private packagePriceService: ServicePackagePriceService) {}

  @Get()
  async getAllPackagePrice(): Promise<ServicePackagePrice[]> {
    return await this.packagePriceService.findAll()
  }

  @Delete("/:id")
  async delete(@Param('id') id:number) {
    await this.packagePriceService.deletePackagePrice(id)
  }

}
