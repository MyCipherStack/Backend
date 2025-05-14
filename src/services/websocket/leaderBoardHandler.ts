

import { Server } from "socket.io"

import { IUpdateLeaderBoardUsecase } from "../../application/interfaces/use-cases/ILeaderBoadrUseCase.js";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository.js";
import { ILeaderBoardRespository } from "../../domain/repositories/ILeaderBoardRespository.js";


export class LeaderBoardSocketHandler {
    constructor(
        private updateLeaderBoardUseCase: IUpdateLeaderBoardUsecase,
        private submissionRepository: ISubmissionRepository,
        private leaderBoardRepository:ILeaderBoardRespository   
    ) { }
    private activeUsersMap=new Map<string,Set<string>>()
    private socketToUserMap=new Map<string,{userId:string,challengeId:string}>()
    public register(io: Server) {
        
        io.on("connection", (socket) => {
            socket.on("join-challenge", async(challengeId: string,userId:string) => {
                
                socket.join(challengeId) // here join room with room id is challenge id

                if(!this.activeUsersMap.has(challengeId)){
                    this.activeUsersMap.set(challengeId,new Set())
                }
                this.activeUsersMap.get(challengeId)?.add(userId)
                this.socketToUserMap.set(socket.id,{userId,challengeId})


                const leaderBoard=await this.leaderBoardRepository.findAll({challengeId})
                if(leaderBoard){

                    const response=leaderBoard.map(data=>{
                        return {
                            userName:data.userId.name,
                            totalScore:data.totalScore,
                            solvedCount:data.solvedProblems.length,
                            isLive:this.activeUsersMap.get(challengeId)?.has(data.userId._id.toString()) || false,
                            image:data.userId.image
                            
                        }})
                        io.to(challengeId).emit("leaderboard-update", response)

                        // socket.emit("leaderboard-update", response)
                    }
                
            })
            
            socket.on("update-submit", async (challengeId: string, userId: string, time: number, problemId, submissionId) => {
                    try{
                    console.log(challengeId, "challegeID in socker on");
                    const submissionDetails = await this.submissionRepository.findById(submissionId)
                    if (submissionDetails) {
                        if (submissionDetails.status == "Accepted") {
                            console.log("problem Accepted ");
                            console.log(new Date(submissionDetails.createdAt).toTimeString(),"Date");
                            
                            const updatedLeaderboard = await this.updateLeaderBoardUseCase.execute(userId, challengeId, { time, problemId: submissionDetails.problemId, submissionId })
                            const leaderBoard=await this.leaderBoardRepository.findAll({challengeId})
                            if(leaderBoard){
                            const response=leaderBoard.map(data=>{
                                return {
                                userName:data.userId.name,
                                totalScore:data.totalScore,
                                solvedCount:data.solvedProblems.length,
                                isLive:this.activeUsersMap.get(challengeId)?.has(data.userId.toString()) || false,
                                image:data.userId.image

            
                            }})
                            io.to(challengeId).emit("leaderboard-update", response)
                        }
                        }
                    }
                }catch(err){
                    console.log(err);
                    
                }
                })

                // socket.emit("leaderboard-update",async()=>{
                    

                // }   )

            socket.on("disconnect",async()=>{
             const userInfo=this.socketToUserMap.get(socket.id)
             if(userInfo){
                const {userId,challengeId}=userInfo
                const userSet=this.activeUsersMap.get(challengeId)
                if(userSet){
                    userSet.delete(userId)
                    if(userSet.size===0){
                        this.activeUsersMap.delete(challengeId)
                    }
                }
                
                this.socketToUserMap.delete(socket.id)
                
                
                const leaderBoard=await this.leaderBoardRepository.findAll({challengeId})
             if(leaderBoard){
                 const response=leaderBoard.map(data=>{
                     return {
                         userName:data.userId.name,
                         totalScore:data.totalScore,
                         solvedCount:data.solvedProblems.length,
                         isLive:this.activeUsersMap.get(challengeId)?.has(data.userId.toString()) || false,
                         image:data.userId.image
                         
                         
                        }})
                        io.to(challengeId).emit("leaderboard-update", response)
                    }
                }



            })
// ------------------------------------------------------------------------------------------------------

                    socket.on("join-pairProgramming",(roomId)=>{
                        socket.join(roomId)
                    })

                    socket.on("code-change",({roomId,code})=>{
                        socket.to(roomId).emit("code-change",code)
                    })

                    socket.on("cursor-change",({roomId,userId,posision})=>{
                        socket.to(roomId).emit("cursor-change",{userId,posision})
                    })

            })

    }
}