import { Queue } from 'bullmq';
import { redisOptions } from '../database/connection/redisConnection';
import { IBullmqQueueService } from '@/domain/services/IBullmqServices';

export class BullmqQueueService implements IBullmqQueueService {
  private queues:Map<string, Queue> = new Map();

  async addJob(queueName: string, data: any, options?: any): Promise<void> {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, new Queue(queueName, { connection: redisOptions }));
    }

    const queue = this.queues.get(queueName);
    await queue?.add(queueName, data, options);
  }
}

// export const evaluationQueue = new Queue("evaluvate-winners", {

//     connection: redisConnection

// })
