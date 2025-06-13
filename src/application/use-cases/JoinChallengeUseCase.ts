import { ObjectId } from "mongoose";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository";
import { ILeaderBoardRespository } from "../../domain/repositories/ILeaderBoardRepository";
import { IJoinChallengeUseCase } from "../interfaces/use-cases/IChallengeUseCases";
import { IPairProgrammingRepository } from "../../domain/repositories/IPairProgrammingRepository";


export class JoinChallengeUseCase<joinType> implements IJoinChallengeUseCase<joinType>{
    constructor(
        private Repositoy:IChallengeRepository | IPairProgrammingRepository,
        private leaderBoardRespository:ILeaderBoardRespository
    ){}
    async execute(joinCode: string,userId:ObjectId): Promise<joinType> {

       const respositoryData=await this.Repositoy.findOneChallenge({joinCode})
       console.log(respositoryData,"joinedDATA");
       
        // respositoryData?.maxParticipants
        if(respositoryData){
        const leaderBoard=await this.leaderBoardRespository.findOne({challengeId:respositoryData._id,userId})
        console.log(leaderBoard,"total pratip ants");  // to calculate the number to enter limit is max after limet i want to reject
        if(!leaderBoard){
            const joinedUser=await this.leaderBoardRespository.create({challengeId:respositoryData._id,userId})
        }
    
        console.log(respositoryData,"challegen Data");
        const now=new Date()
        const startTime=new Date(respositoryData?.startTime || "")        
        const TimeUsed=now.getTime()-startTime.getTime()        
        let second=Math.floor(TimeUsed/1000)
        let minutes=Math.floor(second/60)+60
        if(minutes<0){
            throw new Error({timer:minutes,message:"Challenge not started"})
        }
      return respositoryData
    }else{
        throw new Error("This challenge is not exits or code expired ")
    }

        




    } 
}