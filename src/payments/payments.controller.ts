import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentSessionDto } from 'src/configs/dto/payment-session.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'success',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      ok: true,
      message: 'cancel',
    };
  }

  @Post('stripe-webhook')
  stripeWebhook() {
    return 'stripeWebhook';
  }
}
