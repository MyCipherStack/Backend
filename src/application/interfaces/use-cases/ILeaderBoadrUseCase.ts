import { leaderBoard } from "../../../domain/entities/LeaderBoard.js";



export interface IUpdateLeaderBoardUsecase{
    execute(userId:string,challengeId:string,updateData:object):Promise<leaderBoard| null>
}