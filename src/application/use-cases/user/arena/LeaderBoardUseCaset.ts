import { ILeaderBoardUseCase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { leaderBoardMapper } from '@/application/mapper/LeaderBoardMapper';
import { User } from '@/domain/entities/User';
import { ILeaderBoardRepository } from '@/domain/repositories/ILeaderBoardRepository';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';

export class LeaderBoardUseCase implements ILeaderBoardUseCase {
  constructor(
        private leaderBoardRepository:ILeaderBoardRepository,
  ) {

  }

  async execute(challengeId: string): Promise<{ userName: string; totalScore: number | undefined; solvedCount: number; isLive: boolean; image: string; rank: number; }[] | null> {
    const leaderBoard = await this.leaderBoardRepository.findAllWithUserDeatils({ challengeId });

    if (leaderBoard) {
      // let rank = 1;


    return leaderBoardMapper.toResponseDTO(leaderBoard)  


    }

    return null;
  }
}
