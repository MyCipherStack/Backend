import { Document } from "mongoose";
import { GroupChallenge } from "../../domain/entities/GroupChallenge";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository";
import { groupChallengeModel, IGroupChallenge } from "../database/GroupChallengeModel";
import { BaseRepository } from "./BaseRespositroy";


export class ChallengeRepository extends BaseRepository<GroupChallenge,IGroupChallenge> implements IChallengeRepository{
    
    // async  create(data: GroupChallenge): Promise<GroupChallenge> {
    //     const challengeData= await groupChallengeModel.create(data)
    //     return new GroupChallenge(challengeData.challengeName,challengeData.maxParticipants,challengeData.duration,challengeData.problems,challengeData.type,challengeData.joinCode,challengeData.startTime,challengeData.endTime)
    // }

    // async findById(Id: string): Promise<GroupChallenge | null> {
    //     const challengeData=await groupChallengeModel.findById(Id)
    //     if(!challengeData)return null
    //     return new GroupChallenge(challengeData.challengeName,challengeData.maxParticipants,challengeData.duration,challengeData.problems,challengeData.type,challengeData.startTime,challengeData.endTime)

    // }

    constructor(){
        super(groupChallengeModel)
    }
    async findOneChallenge(data: Partial<GroupChallenge>): Promise<GroupChallenge | null> {
        const challengeData=await groupChallengeModel.findOne(data).populate("problems")
        return this.toEntity(challengeData)
    }

    protected toEntity(data: (IGroupChallenge & Document<unknown, any, any>) | null): GroupChallenge | null {
        if(!data) return null
        return new GroupChallenge(
            data.challengeName,
            data.maxParticipants,
            data.duration,
            data.problems,
            data.type,
            data.joinCode,
            data.startTime.toString(),
            data.endTime.toString(),
        )
    }
} 