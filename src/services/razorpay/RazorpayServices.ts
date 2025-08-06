import Razorpay from 'razorpay';
import crypto from 'crypto';
import { IRazorpayServices } from '@/domain/services/IRazropayServices';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class RazorpayServices implements IRazorpayServices {
  constructor(
        private key_id: string,
        private key_secret: string,
  ) { }

  razorpay = new Razorpay({
    key_id: this.key_id,
    key_secret: this.key_secret,

  });

  createOrder = async (amount: number, planId: string): Promise<{ orderId: string }> => {
    logger.info(this.key_secret, { id: this.key_id });

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        planId,
      },

    };

    const orders = await this.razorpay.orders.create(options);
    logger.info(orders);
    return { orderId: orders.id };
  };

  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    const body = `${orderId}|${paymentId}`;
    const expected = crypto.createHmac('sha256', this.key_secret).update(body).digest('hex');
    return expected == signature;
  }

  getOrderDetails = async (orderId: string): Promise<any> => {
    const order = await this.razorpay.orders.fetch(orderId);
    return order;
  };
}
