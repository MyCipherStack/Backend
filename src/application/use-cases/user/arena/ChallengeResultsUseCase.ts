import { IChallengeResultsUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { GroupChallenge } from "@/domain/entities/GroupChallenge";
import { leaderBoard } from "@/domain/entities/LeaderBoard";
import { ILeaderBoardRepository } from "@/domain/repositories/ILeaderBoardRepository";





export class ChallengeResultsUseCase implements IChallengeResultsUseCase {

    constructor(
        private leaderBoardRepository: ILeaderBoardRepository

    ) {
    }

    async execute(userId: string): Promise<leaderBoard[] | null> {
        
        const response = await this.leaderBoardRepository.findAllwithChallengeDetails(userId)

        return response ?? null
    }
}