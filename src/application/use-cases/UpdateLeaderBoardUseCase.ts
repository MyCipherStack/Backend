import { error } from "console";
import { leaderBoard } from "../../domain/entities/LeaderBoard";
import { IChallengeRepository } from "../../domain/repositories/IchallengeRepository";
import { ILeaderBoardRepository } from "../../domain/repositories/ILeaderBoardRepository";
import { IUpdateLeaderBoardUsecase } from "../interfaces/use-cases/ILeaderBoadrUseCase";




export class UpdateLeaderBoardUseCase implements IUpdateLeaderBoardUsecase {
    constructor(
        private leaderBoardRepository: ILeaderBoardRepository,
        private challengeReposiotry: IChallengeRepository
    ) { }

    async execute(userId: string, challengeId: string, updateData: { time: Date, problemId: string, submissionId: string }): Promise<leaderBoard | null> {
        const challengeData = await this.challengeReposiotry.findById(challengeId)

        const now = new Date()

        const startTime = new Date(challengeData?.startTime || "")

        const TimeUsed = now.getTime() - startTime.getTime()

        let second = Math.floor(TimeUsed / 1000)

        let minutes = Math.floor(second / 60) + 60

        if (minutes < 0) {
            throw new Error("Challenge not started")
        }
        const score = Math.floor(1000 / minutes)

        const alreadySolved = await this.leaderBoardRepository.findOne({ userId, challengeId, 'solvedProblems.problemId': updateData.problemId })
        console.log(alreadySolved, "already solved problem");

        if (alreadySolved) {
            throw new Error("This is already solved problem in this challenge")
        }

        console.log(second, minutes, score);

        const updatedData = await this.leaderBoardRepository.findOneAndUpdate({ userId, challengeId }, { time: minutes, problemId: updateData.problemId, submissionId: updateData.submissionId, score })
        
        if (!updatedData) return null

        
        return updatedData
    }
}