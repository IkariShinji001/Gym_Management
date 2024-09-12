import { Body, Controller, Get } from '@nestjs/common';
import StripeService from '../services/stripe.service';
import { CreateOrderDto } from '../dtos/createOrder.dto';

@Controller('/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Get('/checkout')
  async createCheckOut(@Body() checkOutItems: CreateOrderDto) {
    return await this.stripeService.createCheckoutSession(checkOutItems);
  }
}
