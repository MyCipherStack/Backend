import { IsolvedProblem, leaderBoard } from "../entities/LeaderBoard.js";
import { IBaseRepository } from "./IBaseRepository.js";



export interface ILeaderBoardRepository extends IBaseRepository<leaderBoard>{
        findOne(filter:Partial<leaderBoard>):Promise<leaderBoard| null>
        findAll(filter:Partial<leaderBoard>):Promise<leaderBoard[]>
        // findByChallengeId(challegeID:string):Promise<leaderBoard| null>
        findOneAndUpdateLeaderBoard(filter:{userId:string,challengeId:string},updateData:IsolvedProblem):Promise<leaderBoard | null>
}