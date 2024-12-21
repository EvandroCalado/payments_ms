import { Injectable } from '@nestjs/common';
import { envs } from 'src/configs/envs';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.STRIPE_SECRET);
}
