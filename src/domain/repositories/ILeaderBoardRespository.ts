import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { IsolvedProblem, leaderBoard } from "../entities/LeaderBoard.js";



export interface ILeaderBoardRespository extends BaseRepository<Partial<leaderBoard>>{
        findByChallengeId(id:string):Promise<leaderBoard[]>
        findOneAndUpdateLeaderBoard(filter:{userId:string,challengeId:string},data:IsolvedProblem):Promise<leaderBoard | null>
}