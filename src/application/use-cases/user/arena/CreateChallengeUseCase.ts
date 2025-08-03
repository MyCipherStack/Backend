import { customAlphabet } from 'nanoid';

import { IGroupChallenge } from '@/application/interfaces/IChallengeInterfaces';
import { ICreateChallengeUseCase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { IChallengeRepository } from '@/domain/repositories/IChallengeRepository';

export class CreateChallengeUseCase implements ICreateChallengeUseCase {
  constructor(
        private challengeRepository: IChallengeRepository,
  ) { }

  async execute(challengeData: IGroupChallenge, userId:string): Promise<string | null> {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6); // SET GROUP

    //    const userData = this.userRepository.findById(userId)

    const today = new Date().toDateString();

    //    if(userData?.createdContest.count>3 && userData.createdContest.date==today){
    //         throw new Error("already created 2 challenge")
    //    }

    //    this.userRepository.updateOneById(userId,{created})

    this.challengeRepository.findAllByFields({ hostId: userId, createdAt: today });

    const createdChallenge = await this.challengeRepository.create({ ...challengeData, joinCode: `cipher-${nanoid()}` });

    if (!createdChallenge?.joinCode) return null;

    return createdChallenge.joinCode;
  }
}
