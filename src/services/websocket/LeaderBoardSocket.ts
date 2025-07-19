import { IUpdateLeaderBoardUsecase } from "@/application/interfaces/use-cases/ILeaderBoadrUseCase";
import { BaseSocket } from "./BaseSocke";
import { ISubmissionRepository } from "@/domain/repositories/ISubmissionRepository";
import { ILeaderBoardRepository } from "@/domain/repositories/ILeaderBoardRepository";
import { Server, Socket } from "socket.io";
import { logger } from "@/logger";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { GroupChallenge } from "@/domain/entities/GroupChallenge";





export class LeaderBoardSocket extends BaseSocket {


    constructor(

        private updateLeaderBoardUseCase: IUpdateLeaderBoardUsecase,
        private submissionRepository: ISubmissionRepository,
        private leaderBoardRepository: ILeaderBoardRepository,
        // private getChallengeDataUseCase: IGetRepositoryDataUseCase<GroupChallenge>,

    ) {
        super()
    }


    private activeUsersMap = new Map<string, Set<string>>()

    private socketToUserMap = new Map<string, { userId: string, challengeId: string }>()



    protected async connectSocket(socket: Socket, io: Server): Promise<void> {

        // console.log(socket.listenerCount("join-challenge"), "join-challenge")



        socket.on("join-challenge", async (challengeId: string, userId: string) => {

            socket.join(challengeId) // here join room with room id is challenge id

            // logger.info("joinchallnege",{challengeId,userId})
            
            if (!this.activeUsersMap.has(challengeId)) {
                // logger.info("not  active user",{challengeId})

                // logger.info("added a user", { userId })
                
                this.activeUsersMap.set(challengeId, new Set())
            }else{
                
                logger.info("active user", { userId })
            }
            this.activeUsersMap.get(challengeId)?.add(userId)
            this.socketToUserMap.set(socket.id, { userId, challengeId })


            this.emitUpdateLeaderBoard(io, challengeId)



        })


        // console.log(socket.listenerCount("update-submit"), "update-submitcout"// )
        socket.removeAllListeners("update-submit")

        socket.on("update-submit", async (challengeId: string, userId: string, time: number, problemId, submissionId) => {
            try {
                console.log(challengeId, "challegeID in socker on");

                const submissionDetails = await this.submissionRepository.findById(submissionId)

                if (submissionDetails) {

                    if (submissionDetails.status == "Accepted") {

                        // console.log("problem Accepted ");

                        console.log(new Date(submissionDetails.createdAt).toTimeString(), "Date");


                        await this.updateLeaderBoardUseCase.execute(userId, challengeId, { time, problemId: submissionDetails.problemId, submissionId })

                        this.emitUpdateLeaderBoard(io, challengeId)
                    }
                }
            } catch (err) {
                console.log(err);

            }
        })



        socket.on("update-challenge-status", async (challengeId, updatedData) => {


            //   const response=await  this.getChallengeDataUseCase.OneDocumentByid(challegeID)

            io.to(challengeId).emit("update-challenge-status", updatedData)

        })


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


                this.emitUpdateLeaderBoard(io, challengeId)

            }
        })
    }



    //Update that leaderboard Data To DB
    private async emitUpdateLeaderBoard(io: Server, challengeId: string) {


        logger.info("active user", { data: this.activeUsersMap })
        const leaderBoard = await this.leaderBoardRepository.findAllWithUserDeatils({ challengeId })

        logger.info("leaderboard", { data: leaderBoard })

        if (leaderBoard) {

            let rank = 1

            const response = leaderBoard.map(data => {

                return {
                    userName: data.userId.name,
                    totalScore: data.totalscore,
                    solvedCount: data.solvedProblems?.length ?? 0,
                    isLive: this.activeUsersMap.get(challengeId)?.has(data.userId._id.toString()) || false,
                    image: data.userId.image,
                    rank: rank++
                }
            })

            io.to(challengeId).emit("leaderboard-update", response)

            // socket.emit("leaderboard-update", response)
        }

    }





}