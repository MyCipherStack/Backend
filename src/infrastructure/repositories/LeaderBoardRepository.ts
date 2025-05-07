import { IsolvedProblem, leaderBoard } from "../../domain/entities/LeaderBoard.js";
import { ILeaderBoardRespository } from "../../domain/repositories/ILeaderBoardRespository.js";
import { leaderBoardModel } from "../database/LeaderBoard.js";


export class LeaderBoardRespository implements ILeaderBoardRespository{ 
    async create(data: leaderBoard): Promise<leaderBoard> {
        const leaderBoardData=await leaderBoardModel.create(data)
        return new leaderBoard(leaderBoardData.challengeId,leaderBoardData.userId,leaderBoardData.score,leaderBoardData.rank,leaderBoardData.solvedProblems)
    }
  async  findByChallengeId(id: string): Promise<leaderBoard[]> {
        const leaderBoardData=await leaderBoardModel.findOne({challengeId:id})
        return leaderBoardData
    }
    async findOneAndUpdateLeaderBoard(filter: { userId: string; challengeId: string; },data:IsolvedProblem): Promise<leaderBoard |null> {
        let leaderBoardData=await leaderBoardModel.findOneAndUpdate({userId:filter.userId,challengeId:filter.challengeId},data)
        if(!leaderBoardData) return null
        return new leaderBoard(leaderBoardData.challengeId,leaderBoardData.userId,leaderBoardData.score,leaderBoardData.rank,leaderBoardData.solvedProblems)
    }

}