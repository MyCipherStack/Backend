import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';
import { IActivePublicChallengeUsecase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { FilterDTO } from '@/application/dto/FilterDTO';
import { ChallengeMapper } from '@/application/mapper/ChallengeMapper';

export class ActivePublicChallengeUsecase implements IActivePublicChallengeUsecase {
  constructor(
    private challengeRepository: IChallengeRepository,
  ) { }

  async execute(data: FilterDTO): Promise<{ datas: (GroupChallenge | null)[], totalCount: number, totalPages: number } | null> {
    //  data.type = "public"

    const response = await this.challengeRepository.paginatedData({ ...data, type: 'public' });


    return {
      datas: response.datas?.map(challenge => ChallengeMapper.toResponseDTO(challenge!)),
      totalCount: response.totalCount,
      totalPages: response.totalPages,
    }

    return response ?? null;
  }
}
