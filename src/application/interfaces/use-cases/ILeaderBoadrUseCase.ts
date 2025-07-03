import { leaderBoard } from "../../../domain/entities/LeaderBoard.js";



export interface IUpdateLeaderBoardUsecase{
    // execute(userId:string,challengeId:string,updateData:object):Promise<leaderBoard| null>
    execute(userId: string, challengeId: string, updateData: { time: Date, problemId: string, submissionId: string }): Promise<leaderBoard | null> 

}