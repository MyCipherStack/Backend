

import {Server} from "socket.io"

import { IUpdateLeaderBoardUsecase } from "../../application/interfaces/use-cases/ILeaderBoadrUseCase.js";


export class LeaderBoardSocketHandler{
    constructor(
        private updateLeaderBoardUseCase:IUpdateLeaderBoardUsecase
    ){}

    public register(io:Server){
        io.on("connection",(socket)=>{
            
            socket.on("join-challenge",(challengeId:string)=>{
                socket.join(challengeId)
            })

            socket.on("update-score",async(challengeId:string,userId:string,score:number,time:number,problemId,submissionId)=>{
                const updatedLeaderboard=await this.updateLeaderBoardUseCase.execute(userId,challengeId,{time,problemId,submissionId})
                io.to(challengeId).emit("leaderboard-update",updatedLeaderboard)
            })

        })
    }
}