import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { IsolvedProblem, leaderBoard } from "../entities/LeaderBoard.js";



export interface ILeaderBoardRespository extends BaseRepository<Partial<leaderBoard>>{
        findOne(filter:Partial<leaderBoard>):Promise<leaderBoard| null>
        findAll(filter:Partial<leaderBoard>):Promise<leaderBoard| null>
        // findByChallengeId(challegeID:string):Promise<leaderBoard| null>
        findOneAndUpdateLeaderBoard(filter:{userId:string,challengeId:string},updateData:IsolvedProblem):Promise<leaderBoard | null>
}