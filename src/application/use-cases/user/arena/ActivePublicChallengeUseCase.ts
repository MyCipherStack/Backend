import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';
import { IActivePublicChallengeUsecase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { FilterDTO } from '@/application/dto/FilterDTO';

export class ActivePublicChallengeUsecase implements IActivePublicChallengeUsecase {
  constructor(
        private challengeRepository: IChallengeRepository,
  ) { }

  async execute(data: FilterDTO): Promise<{ datas:(GroupChallenge | null)[], totalCount: number, totalPages: number } | null> {
    //  data.type = "public"

    const response = await this.challengeRepository.paginatedData({ ...data, type: 'public' });

    return response ?? null;
  }
}
