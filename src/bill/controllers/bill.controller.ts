import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BillService } from '../services/bill.service';
import { ServicePackagePriceListIds } from 'src/shared/interfaces/grpc/servicePackage/servicePackage.interface';

@Controller('/bills')
export class BillController {
  constructor(private billService: BillService) {}
  @Post('/users/:id')
  async createNewBill(
    @Param('id') id: number,
    @Body()
    body: {
      priceListIds: { id: number }[];
      voucherId: number;
      userInvitedId?: number;
    },
  ) {
    const { priceListIds, voucherId, userInvitedId } = body;
    return await this.billService.createBill(
      id,
      priceListIds,
      voucherId,
      userInvitedId,
    );
  }

  @Get('/users/:id')
  async findAllBillDetailActiveByUserId(@Param('id') id: number) {
    return await this.billService.getAllBillDetailIsActive(id);
  }

  @Patch('/cancel/packages/:priceId')
  async cancelPackage(@Param('priceId') priceId: number) {
    return await this.billService.cancelFitness(priceId);
  }

  @Patch('/:id')
  async updatedBill(@Param('id') id: number, @Body() data: { status: string }) {
    return await this.billService.updateStatusBill(id, data.status);
  }
}
