






import { customAlphabet } from "nanoid";
import { IPairProgramming } from "../interfaces/IChallengeInterfaces.js";
import {ICreatePairProgrammingUseCase } from "../interfaces/use-cases/IChallengeUseCases.js";
import { IPairProgrammingRepository } from "../../domain/repositories/IPairProgrammingRepsotory.js";



export class CreatePairProgrammingUseCase implements ICreatePairProgrammingUseCase{
    constructor(
        private pairProgrammingRepository:IPairProgrammingRepository
    ){}
   async execute(data:IPairProgramming): Promise<string |null> {
    
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);  //SET GROUP CHALLENGE
    
   const createdChallenge=await this.pairProgrammingRepository.create({...data,duration:1,joinCode:"cipher-"+nanoid()})
   console.log(createdChallenge);
   
   if(!createdChallenge.joinCode) return null
   return createdChallenge.joinCode
   }
}