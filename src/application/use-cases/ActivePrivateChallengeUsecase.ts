import { GroupChallenge } from "@/domain/entities/GroupChallenge";
import { IActivePrivateChallengeUsecase } from "../interfaces/use-cases/IChallengeUseCases";
import { IChallengeRepository } from "@/domain/repositories/IChallengeRepository"; 







export class ActivePrivateChallengeUsecase implements IActivePrivateChallengeUsecase{
    
    constructor(
        private challengeRepository:IChallengeRepository
    ){}

   async execute(id: string): Promise<GroupChallenge[] | null >  {

     const data=await   this.challengeRepository.findAllByFields({hostId:id,status:"waiting",type:"private"})
     
     return data ?? null
    }
}