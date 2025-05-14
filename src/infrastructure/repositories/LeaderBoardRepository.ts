import { IsolvedProblem, leaderBoard } from "../../domain/entities/LeaderBoard.js";
import { ILeaderBoardRespository } from "../../domain/repositories/ILeaderBoardRespository.js";
import { leaderBoardModel } from "../database/LeaderBoard.js";


export class LeaderBoardRespository implements ILeaderBoardRespository {

    async create(data: leaderBoard): Promise<leaderBoard> {
        const leaderBoardData = await leaderBoardModel.create(data)
        return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)
    }

   async findOne(filter: Partial<leaderBoard>): Promise<leaderBoard | null> {
       const leaderBoardData=await leaderBoardModel.findOne(filter)
       if(!leaderBoardData) return null
    return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)

   }

   async findAll(filter:Partial<leaderBoard>):Promise<leaderBoard | null>{
    const leaderBoardData=await leaderBoardModel.find(filter).populate("userId")
    if(!leaderBoardData) return null
    return leaderBoardData
   }

    async findOneAndUpdateLeaderBoard(filter: { userId: string; challengeId: string; }, updateData: IsolvedProblem): Promise<leaderBoard | null> {
        console.log("in Repo",filter);
        
        let leaderBoardData = await leaderBoardModel.findOneAndUpdate({ userId: filter.userId, challengeId: filter.challengeId },{$push:{solvedProblems:updateData},$inc:{totalScore:updateData.score}},{new:true})
        if (!leaderBoardData) return null
        return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)
    }


    async findById(Id: string): Promise<Partial<leaderBoard> | null> {
        const leaderBoardData=await leaderBoardModel.findById(Id)
        if(!leaderBoardData) return null
        return new leaderBoard(leaderBoardData.challengeId, leaderBoardData.userId, leaderBoardData.totalScore, leaderBoardData.rank, leaderBoardData.solvedProblems)


    }
}