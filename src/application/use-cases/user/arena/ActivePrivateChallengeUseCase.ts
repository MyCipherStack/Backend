import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { IActivePrivateChallengeUsecase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';
import { ChallengeMapper } from '@/application/mapper/ChallengeMapper';

export class ActivePrivateChallengeUsecase implements IActivePrivateChallengeUsecase {
  constructor(
        private challengeRepository:IChallengeRepository,
  ) {}

  async execute(id: string): Promise<GroupChallenge[] | null > {
    const data = await this.challengeRepository.findAllByFields({ hostId: id, status: 'waiting', type: 'private' }); 
    
    
    return  data?.map(challenge=> ChallengeMapper.toResponseDTO(challenge)) ?? null


  }
}
