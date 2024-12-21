import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession() {
    return 'createPaymentSession';
  }

  @Get('success')
  success() {
    return 'success';
  }

  @Get('cancel')
  cancel() {
    return 'cancel';
  }

  @Post('stripe-webhook')
  stripeWebhook() {
    return 'stripeWebhook';
  }
}
