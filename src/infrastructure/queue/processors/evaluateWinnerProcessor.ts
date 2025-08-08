import { Worker } from 'bullmq';
import { IEvaluateWinnerUsecase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { redisOptions } from '@/infrastructure/database/connection/redisConnection';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class EvaluateWinnerWorker {
  constructor(
        private evaluateUseCase: IEvaluateWinnerUsecase,
  ) { }

  execute = () => {
    try {
      logger.info('worker started.....');

      // new QueueScheduler("evaluate-winners", { connection: redisConnection });

      new Worker(
        'evaluate-winners',
        async (job) => {
          const { challengeId } = job.data;

          await this.evaluateUseCase.execute(challengeId);
        },
        { connection: redisOptions },
      );
    } catch (error) {
      logger.error('errr in evaluvate woker ', error);
    }
  };
}
