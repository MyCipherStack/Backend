import { customAlphabet } from "nanoid";
 
import { IGroupChallenge } from "@/application/interfaces/IChallengeInterfaces";
import { ICreateChallengeUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases"; 
import { IChallengeRepository } from "@/domain/repositories/IChallengeRepository";



export class CreateChallengeUseCase implements ICreateChallengeUseCase{
    constructor(
        private challengeRepository:IChallengeRepository,
        
    ){}
   async execute(challengeData: IGroupChallenge): Promise<string |null> {
    
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);  //SET GROUP CHALLENGE
    
   const createdChallenge=await this.challengeRepository.create({...challengeData,joinCode:"cipher-"+nanoid()})
   
   if(!createdChallenge?.joinCode) return null
   
   return createdChallenge.joinCode
   }
}