import { leaderBoard } from "../../domain/entities/LeaderBoard.js";
import { ILeaderBoardRespository } from "../../domain/repositories/ILeaderBoardRespository.js";
import { IUpdateLeaderBoardUsecase } from "../interfaces/use-cases/ILeaderBoadrUseCase.js";




export class UpdateLeaderBoardUseCase  implements IUpdateLeaderBoardUsecase{
    constructor(
        private leaderBoardRepository:ILeaderBoardRespository
    ){}

    async execute(userId: string, challengeId: string, updateData: {time:Date,problemId:string,submissionId:string}): Promise<leaderBoard|null> {
       const updatedData=await  this.leaderBoardRepository.findOneAndUpdateLeaderBoard({userId,challengeId},updateData)
        if(!updatedData) return null
        return updatedData
    }


}