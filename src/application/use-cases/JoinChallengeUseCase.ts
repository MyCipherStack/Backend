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
        const leaderBoard=await this.leaderBoardRespository.findOne({challengeId:challengeData._id,userId})
        console.log(leaderBoard,"total pratip ants");  // to calculate the number to enter limit is max after limet i want to reject
        if(!leaderBoard){
            const joinedUser=await this.leaderBoardRespository.create({challengeId:challengeData._id,userId})
        }
    
        console.log(challengeData,"challegen Data");
        const now=new Date()
        const startTime=new Date(challengeData?.startTime || "")        
        const TimeUsed=now.getTime()-startTime.getTime()        
        let second=Math.floor(TimeUsed/1000)
        let minutes=Math.floor(second/60)+60
        if(minutes<0){
            throw new Error({timer:minutes,message:"Challenge not started"})
        }
      return challengeData
    }else{
        throw new Error("This challenge is not exits or code expired ")
    }

        




    } 
}