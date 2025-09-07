import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';

import { IJoinChallengeUseCase } from '@/application/interfaces/use-cases/IChallengeUseCases'; 
import { ILeaderBoardRepository } from '@/domain/repositories/ILeaderBoardRepository';
import { AppError } from '@/domain/error/AppError';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';

export class JoinChallengeUseCase implements IJoinChallengeUseCase {
  constructor(
        private repository: IChallengeRepository,
        private leaderBoardRepository: ILeaderBoardRepository,
  ) { }

  async execute(joinCode: string, userId: string): Promise<GroupChallenge> {
    logger.info('joinCodeeeee', joinCode);
    const RepositoryData = await this.repository.findOneChallenge({ joinCode });

    console.log(RepositoryData, joinCode, 'joinedDATA');

    if (RepositoryData?.isBlocked) {
      throw new AppError('Challenge is blocked by admin');
    }

    if (RepositoryData?._id) {
      const leaderBoards = await this.leaderBoardRepository.findAllWithUserDeatils({ challengeId: RepositoryData._id });

      const currentUsers = leaderBoards?.length ?? 0;
      const allowedUsers = RepositoryData?.maxParticipants ?? 0;
      if (allowedUsers < currentUsers) {
        throw new AppError('Challenge is full');
      }

      const leaderBoard = await this.leaderBoardRepository.findOne({ challengeId: RepositoryData._id, userId });
      console.log(leaderBoard, 'total pratip ants'); // to calculate the number to enter limit is max after limet i want to reject
      // if (leaderBoard.participants)
      if (!leaderBoard) {
        const joinedUser = await this.leaderBoardRepository.create({ challengeId: RepositoryData._id, userId });
      }

      console.log(RepositoryData, 'challegen Data');
      const now = new Date();
      const startTime = new Date(RepositoryData?.startTime || '');
      const TimeUsed = now.getTime() - startTime.getTime();
      const second = Math.floor(TimeUsed / 1000);
      const minutes = Math.floor(second / 60) + 60;
      if (minutes < 0) {
        throw new AppError('Challenge is full');
      }

      return RepositoryData;
    }
    throw new Error('This challenge is not exits or code expired ');
  }
}
