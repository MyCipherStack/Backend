import { Document } from "mongoose";
import { IsolvedProblem, leaderBoard } from "../../domain/entities/LeaderBoard";
import { ILeaderBoardRepository } from "../../domain/repositories/ILeaderBoardRepository";
import { ILeaderBoard, leaderBoardModel } from "../database/LeaderBoard";
import { BaseRepository } from "./BaseRespositroy";


export class LeaderBoardRepository extends BaseRepository<leaderBoard,ILeaderBoard> implements ILeaderBoardRepository {

    // async create(data: leaderBoard): Promise<leaderBoard> {
    //     const leaderBoardData = await leaderBoardModel.create(data)
    //     return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)
    // }

    constructor(){
        super(leaderBoardModel)
    }
   async findOne(filter: Partial<leaderBoard>): Promise<leaderBoard | null> {
       const leaderBoardData=await leaderBoardModel.findOne(filter)
       return this.toEntity(leaderBoardData)

   }

   async findAll(filter:Partial<leaderBoard>):Promise<leaderBoard[]>{
    const leaderBoardData=await leaderBoardModel.find(filter).populate("userId")
    return leaderBoardData.map(doc=>this.toEntity(doc)).filter(doc=>doc!=null)
   }

    async findOneAndUpdateLeaderBoard(filter: { userId: string; challengeId: string; }, updateData: IsolvedProblem): Promise<leaderBoard | null> {
        console.log("in Repo",filter);
        
        let leaderBoardData = await leaderBoardModel.findOneAndUpdate({ userId: filter.userId, challengeId: filter.challengeId },{$push:{solvedProblems:updateData},$inc:{totalScore:updateData.score}},{new:true})
        return this.toEntity(leaderBoardData)
    }


    // async findById(Id: string): Promise<Partial<leaderBoard> | null> {
    //     const leaderBoardData=await leaderBoardModel.findById(Id)
    //     if(!leaderBoardData) return null
    //     return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)


    // }

    protected toEntity(data: (ILeaderBoard & Document<unknown, any, any>) | null): leaderBoard | null {
        if(!data) return null
        return new leaderBoard(
            data.challengeId,
            data.userId,
            data.totalScore,
            data.rank,
            data.solvedProblems

        )
    }
}