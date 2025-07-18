import { IsolvedProblem, leaderBoard } from "../entities/LeaderBoard.js";
import { IBaseRepository } from "./IBaseRepository.js";



export interface ILeaderBoardRepository extends IBaseRepository<leaderBoard>{
        findOne(filter:Partial<leaderBoard>):Promise<leaderBoard | null>
        findAllWithUserDeatils(filter:Partial<leaderBoard>):Promise<leaderBoard[] | null>
        // findByChallengeId(challegeID:string):Promise<leaderBoard| null>
        findOneAndUpdate(filter:{userId:string,challengeId:string},updateData:IsolvedProblem):Promise<leaderBoard | null>
}