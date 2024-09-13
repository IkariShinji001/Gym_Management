import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'));
  }

  async createCheckoutSession(checkOutItems) {
    const lineItems = [
      {
        price_data: {
          currency: 'vnd',
          product_data: {
            name: 'Quan Xi',
          },
          unit_amount: 200000,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'vnd',
          product_data: {
            name: 'Ao du',
          },
          unit_amount: 100000,
        },
        quantity: 1,
      },
    ];

    const session = await this.stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_intent_data: {
        setup_future_usage: 'on_session',
      },
      customer: 'cus_QnZY932GVMcNZ0',
      success_url:
        'http://localhost:3000' +
        '/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000' + '/pay/failed/checkout/session',
    });

    return session;
  }
}
