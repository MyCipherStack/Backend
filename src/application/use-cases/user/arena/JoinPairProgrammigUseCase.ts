import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { IPairProgrammingRepository } from '@/domain/repositories/IPairProgrammingRepository';
import { PairProgramming } from '@/domain/entities/PairProgramming';
import { IJoinPairProgrammigUseCase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { AppError } from '@/domain/error/AppError';
import { ChallengeMapper } from '@/application/mapper/ChallengeMapper';
import { PairProgramMapper } from '@/application/mapper/PairprogramMapper';

export class JoinPairProgrammigUseCase implements IJoinPairProgrammigUseCase {
  constructor(

    private pairProgrammingRepository: IPairProgrammingRepository,

  ) { }

  async execute(joinCode: string, userId: string, userName: string): Promise<PairProgramming | null> {
    const RepositoryData = await this.pairProgrammingRepository.findOneChallenge({ joinCode });

    if (RepositoryData?.isBlocked) {
      throw new AppError('pairProgram is blocked by admin');
    }

    if (RepositoryData) {
      if (RepositoryData.hostId == userId) {
        return RepositoryData;
      }

      const navigatorId = RepositoryData.navigator?.id;

      if (RepositoryData.navigator?.id && navigatorId?.toString() == userId.toString()) {
        logger.info('if', { navigator: RepositoryData.navigator, userId });

        return RepositoryData;
      }
      // if no current navigator so join that
      if (!RepositoryData.navigator?.id && RepositoryData._id) {
        const navigator = { name: userName, id: userId };

        const updatedData = await this.pairProgrammingRepository.updateOneById(RepositoryData._id, { navigator });

        return PairProgramMapper.toResponseDTO(updatedData!)

        return updatedData;
      }
      throw new Error("navigator already joined can't join right now");
    } else {
      throw new Error('This challenge is not exits or code expired ');
    }
  }
}
