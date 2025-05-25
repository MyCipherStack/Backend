import { customAlphabet } from "nanoid";
 
import { IGroupChallenge } from "../interfaces/IChallengeInterfaces.js";
import { ICreateChallengeUseCase } from "../interfaces/use-cases/IChallengeUseCases.js";
 
import { IPairProgrammingRepository } from "../../domain/repositories/IPairProgrammingRepository.js";



export class CreateChallengeUseCase implements ICreateChallengeUseCase{
    constructor(
        private PairProgrammingRepository:IPairProgrammingRepository,
    ){}
   async execute(challengeData: IGroupChallenge): Promise<string |null> {
    
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);  //SET GROUP CHALLENGE
    
   const createdChallenge=await this.PairProgrammingRepository.create({...challengeData,joinCode:"cipher-"+nanoid()})
   if(!createdChallenge?.joinCode) return null
   return createdChallenge.joinCode
   }
}