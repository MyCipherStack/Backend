

import { Server } from "socket.io"

import { IUpdateLeaderBoardUsecase } from "../../application/interfaces/use-cases/ILeaderBoadrUseCase";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository";
import { logger } from "@/logger";
import { ILeaderBoardRepository } from "@/domain/repositories/ILeaderBoardRepository";


export class LeaderBoardSocketHandler {
    constructor(
        private updateLeaderBoardUseCase: IUpdateLeaderBoardUsecase,
        private submissionRepository: ISubmissionRepository,
        private leaderBoardRepository: ILeaderBoardRepository
    ) { }
    private activeUsersMap = new Map<string, Set<string>>()
    private socketToUserMap = new Map<string, { userId: string, challengeId: string }>()
    public register(io: Server) {

        io.on("connection", (socket) => {
            socket.on("join-challenge", async (challengeId: string, userId: string) => {

                socket.join(challengeId) // here join room with room id is challenge id

                if (!this.activeUsersMap.has(challengeId)) {
                    this.activeUsersMap.set(challengeId, new Set())
                }
                this.activeUsersMap.get(challengeId)?.add(userId)
                this.socketToUserMap.set(socket.id, { userId, challengeId })


                const leaderBoard = await this.leaderBoardRepository.findAllWithUserDeatils({ challengeId })

                logger.info("leaderboard", { data: leaderBoard })

                if (leaderBoard) {
                    let rank=1
                    const response = leaderBoard.map(data => {
                        return {
                            userName: data.userId.name,
                            totalScore: data.totalscore,
                            solvedCount: data.solvedProblems?.length ?? 0,
                            isLive: this.activeUsersMap.get(challengeId)?.has(data.userId._id.toString()) || false,
                            image: data.userId.image,
                            rank:rank++
                            

                        }
                    })
                    io.to(challengeId).emit("leaderboard-update", response)

                    // socket.emit("leaderboard-update", response)
                }

            })

            socket.on("update-submit", async (challengeId: string, userId: string, time: number, problemId, submissionId) => {
                try {
                    console.log(challengeId, "challegeID in socker on");
                    const submissionDetails = await this.submissionRepository.findById(submissionId)
                    if (submissionDetails) {
                        if (submissionDetails.status == "Accepted") {
                            console.log("problem Accepted ");
                            console.log(new Date(submissionDetails.createdAt).toTimeString(), "Date");



                            const updatedLeaderboard = await this.updateLeaderBoardUseCase.execute(userId, challengeId, { time, problemId: submissionDetails.problemId, submissionId })

                            const leaderBoard = await this.leaderBoardRepository.findAllWithUserDeatils({ challengeId })
                            if (leaderBoard) {
                                let rank=1
                                const response = leaderBoard.map(data => {
                                    return {
                                        userName: data.userId.name,
                                        totalScore: data.totalscore,
                                        solvedCount: data.solvedProblems?.length ?? 0,
                                        isLive: this.activeUsersMap.get(challengeId)?.has(data.userId.toString()) || false,
                                        image: data.userId.image,
                                        rank: rank++



                                    }
                                })
                                io.to(challengeId).emit("leaderboard-update", response)
                            }
                        }
                    }
                } catch (err) {
                    console.log(err);

                }
            })

            // socket.emit("leaderboard-update",async()=>{


            // }   )

            socket.on("disconnect", async () => {
                const userInfo = this.socketToUserMap.get(socket.id)
                if (userInfo) {
                    const { userId, challengeId } = userInfo
                    const userSet = this.activeUsersMap.get(challengeId)
                    if (userSet) {
                        userSet.delete(userId)
                        if (userSet.size === 0) {
                            this.activeUsersMap.delete(challengeId)
                        }
                    }

                    this.socketToUserMap.delete(socket.id)


                    const leaderBoard = await this.leaderBoardRepository.findAllWithUserDeatils({ challengeId })
                    if (leaderBoard) {
                        let rank = 1
                        const response = leaderBoard.map(data => {
                            return {
                                userName: data.userId.name,
                                totalScore: data.totalScore,
                                solvedCount: data.solvedProblems.length,
                                isLive: this.activeUsersMap.get(challengeId)?.has(data.userId.toString()) || false,
                                image: data.userId.image,
                                reank: rank++


                            }
                        })
                        io.to(challengeId).emit("leaderboard-update", response)
                    }
                }



            })
            // ------------------------------------------------------------------------------------------------------




            socket.on("join-pairProgramming", ({ roomId, userName }) => {
                socket.join(roomId)
                console.log("join", roomId);
                socket.to(roomId).emit("pairProgram-update", { userName })
            })

            socket.on("code-change", ({ roomId, code }) => {
                console.log("code change", roomId);
                socket.to(roomId).emit("code-change", code)
            })

            socket.on("cursor-change", ({ roomId, userId, position }) => {
                console.log("cursor-change", roomId, userId, position);
                socket.to(roomId).emit("cursor-change", { userId, position })
            })

            socket.on("send-message", ({ roomId, userName, text, time }) => {
                console.log(roomId, text);

                socket.to(roomId).emit("receive-message", { userName, text, time })
            })

            socket.on("signal", ({ roomId, data }) => {   // I only this for audio call  first i did this  for learn
                console.log("signal", roomId);
                socket.to(roomId).emit("signal", data)
            })

            socket.on('mute-status-changed', ({ roomId, userId, isMuted }) => {
                console.log(roomId, userId, isMuted);

                socket.to(roomId).emit("mute-status-changed", { userId, isMuted })
            });





            //Best Implimetation for WEBTRC 

            socket.on("join-interview", ({ roomId }) => {
                socket.join(roomId)
                const clients = io.sockets.adapter.rooms.get(roomId)
                const isInitiator = clients?.size === 1
                logger.info(roomId, "joinedInterview", isInitiator);
                socket.to(roomId).emit("joined", { roomId, isInitiator })
            })

            socket.on("offer", ({ roomId, data }) => {
                logger.info("offer", roomId);

                socket.to(roomId).emit('offer', data)
            })
            socket.on("answer", ({ roomId, data }) => {

                logger.info("answer", roomId);

                socket.to(roomId).emit('answer', data)
            })
            socket.on("candidate", ({ roomId, data }) => {
                logger.info("candidate", roomId);

                socket.to(roomId).emit('candidate', data)
            })

            socket.on("track-type", ({ roomId, kind, type }) => {
                logger.info("track-type", { kind, type })
                socket.to(roomId).emit("track-type", { kind, type })
            })





            socket.on("join-user-name",(userId)=>{

                socket.join(userId)
                
                logger.info("userjoind",userId)

            })

    
            
            socket.on("discount-user-room",()=>{
                
            })


        })

    }
}