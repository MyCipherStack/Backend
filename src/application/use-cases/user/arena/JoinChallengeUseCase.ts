


import { IChallengeRepository } from "@/domain/repositories/IChallengeRepository";

import { IJoinChallengeUseCase } from "../../../interfaces/use-cases/IChallengeUseCases";
import { ILeaderBoardRepository } from "@/domain/repositories/ILeaderBoardRepository";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { INotificationSocket } from "@/domain/services/ISocketService";


export class JoinChallengeUseCase<joinType> implements IJoinChallengeUseCase<joinType> {
    constructor(
        private Repositoy: IChallengeRepository,
        private leaderBoardRespository: ILeaderBoardRepository,
    ) { }



    async execute(joinCode: string, userId: string): Promise<joinType> {
        logger.info("joinCodeeeee", joinCode)
        const respositoryData = await this.Repositoy.findOneChallenge({ joinCode })

        console.log(respositoryData, joinCode, "joinedDATA");

        

        if (respositoryData) {

            const leaderBoards = await this.leaderBoardRespository.findAllWithUserDeatils({ challengeId: respositoryData._id })



            const currentUsers = leaderBoards?.length ?? 0
            const allowedUsers = respositoryData?.maxParticipants ?? 0
            if (allowedUsers < currentUsers) {
                throw new AppError("Challenge is full")
            }


            const leaderBoard = await this.leaderBoardRespository.findOne({ challengeId: respositoryData._id, userId })
            console.log(leaderBoard, "total pratip ants");  // to calculate the number to enter limit is max after limet i want to reject
            // if (leaderBoard.participants)
            if (!leaderBoard) {
                const joinedUser = await this.leaderBoardRespository.create({ challengeId: respositoryData._id, userId })
            }

            console.log(respositoryData, "challegen Data");
            const now = new Date()
            const startTime = new Date(respositoryData?.startTime || "")
            const TimeUsed = now.getTime() - startTime.getTime()
            let second = Math.floor(TimeUsed / 1000)
            let minutes = Math.floor(second / 60) + 60
            if (minutes < 0) {
                throw new Error({ timer: minutes, message: "Challenge not started" })
            }

            return respositoryData

        } else {
            throw new Error("This challenge is not exits or code expired ")
        }






    }
}