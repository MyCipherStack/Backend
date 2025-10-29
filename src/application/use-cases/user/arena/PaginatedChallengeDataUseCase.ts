


import { IPaginatedChallengeDataUseCase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';

export class  PaginatedChallengeDataUseCase implements IPaginatedChallengeDataUseCase {
  constructor(
        private challengeRepository: IChallengeRepository,

  ) { }

async execute(page: number, limit: number, status: string, search: string, isBlocked: boolean): Promise<{  datas: (GroupChallenge | null)[];
    totalCount: number;
    totalPages: number;} | null> {
    const paginatedData = await this.challengeRepository.paginatedData({page, limit, status, search, isBlocked});
    return paginatedData;
}

}
  