import { HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentSessionDto } from 'src/configs/dto/payment-session.dto';
import { envs } from 'src/configs/envs';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.STRIPE_SECRET);

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items } = paymentSessionDto;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {},
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3003/api/payments/success',
      cancel_url: 'http://localhost:3003/api/payments/cancel',
    });

    return session;
  }

  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'];

    console.log({ sig });

    return res.status(HttpStatus.OK).json({ sig });
  }
}
