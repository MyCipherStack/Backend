import { FilterDTO } from '@/application/dto/FilterDTO';
import { IChallengeResultsUseCase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { leaderBoard } from '@/domain/entities/LeaderBoard';
import { ILeaderBoardRepository } from '@/domain/repositories/ILeaderBoardRepository';

export class ChallengeResultsUseCase implements IChallengeResultsUseCase {
  constructor(
    private leaderBoardRepository: ILeaderBoardRepository,

  ) {
  }

  async execute(userId: string, filterData: FilterDTO): Promise<{ leaderBoard: leaderBoard[], totalData: number, totalPages: number } | null> {



    const response = await this.leaderBoardRepository.findAllwithChallengeDetails(userId, filterData);

    return response ?? null;
  }
}
