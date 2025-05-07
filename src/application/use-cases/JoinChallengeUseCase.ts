import { ObjectId } from "mongoose";
import { GroupChallenge } from "../../domain/entities/GroupChallenge.js";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository.js";
import { ILeaderBoardRespository } from "../../domain/repositories/ILeaderBoardRespository.js";
import { ChallengeRepository } from "../../infrastructure/repositories/ChallengeRespository.js";
import { IJoinChallengeUseCase } from "../interfaces/use-cases/IChallengeUseCases.js";


export class JoinChallengeUseCase implements IJoinChallengeUseCase{
    constructor(
        private challengeRepositoy:IChallengeRepository,
        private leaderBoardRespository:ILeaderBoardRespository
    ){}
    async execute(joinCode: string,userId:ObjectId): Promise<GroupChallenge> {

       const challengeData=await this.challengeRepositoy.findOneChallenge({joinCode})
        // challengeData?.maxParticipants
        if(challengeData){
        const totalPartipants=await this.leaderBoardRespository.findByChallengeId(challengeData._id)
        console.log(totalPartipants,"total pratipants");  // to calculate the number to enter limit is max after limet i want to reject
      const joinedUser=await this.leaderBoardRespository.create({challengeId:challengeData._id,userId})
      return challengeData
    }else{
        throw new Error("This challenge is not exits or code expired ")
    }

        




    } 
}