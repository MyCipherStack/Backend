import { customAlphabet } from "nanoid";
 
import { IGroupChallenge } from "../interfaces/IChallengeInterfaces";
import { ICreateChallengeUseCase } from "../interfaces/use-cases/IChallengeUseCases";
 
import { IPairProgrammingRepository } from "../../domain/repositories/IPairProgrammingRepository";
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