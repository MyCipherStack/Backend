import { IEvaluateWinnerUsecase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';
import { ILeaderBoardRepository } from '@/domain/repositories/ILeaderBoardRepository';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class EvaluateWinnerUsecase implements IEvaluateWinnerUsecase {
  constructor(
        private leaderBoardRepository: ILeaderBoardRepository,
        private challengeRepositry: IChallengeRepository,

  ) {
  }

  execute = async (challengeId: string) => {
    const challenges = await this.leaderBoardRepository.findAllwithField({ challengeId });

    logger.info('challeges in evaluate', { challenges });

    const winner = challenges?.reduce((acc, data) => {
      if ((acc.totalscore ?? 0) < (data.totalscore ?? 0)) {
        return data;
      }
      return acc;
    }, challenges[0]);

    if (winner?.challengeId) { await this.challengeRepositry.updateOneById(winner.challengeId, { status: 'ended', winner: winner?.userId as string }); }
  };
}
