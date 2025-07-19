import { ILeaderBoardUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases"
import { leaderBoard } from "@/domain/entities/LeaderBoard"
import { ILeaderBoardRepository } from "@/domain/repositories/ILeaderBoardRepository"
import { logger } from "@/logger";



export class LeaderBoardUseCase implements ILeaderBoardUseCase {

    constructor(
        private leaderBoardRepository:ILeaderBoardRepository
    ) {
        
    }

async execute(challengeId: string): Promise<{ userName: any; totalScore: number | undefined; solvedCount: number; isLive: boolean; image: string; rank: number; }[] | null> {
        
        const leaderBoard = await this.leaderBoardRepository.findAllWithUserDeatils({ challengeId })
        
        
        if (leaderBoard) {
            
            let rank = 1
            
            const response = leaderBoard.map(data => {
                
                logger.info("leaderboard", { data })
                return {
                    userName: data.userId.name,
                    totalScore: data.totalscore,
                    solvedCount: data.solvedProblems?.length ?? 0,
                    isLive:false,
                    image: data.userId.image,
                    rank: rank++
                }
            })
            
          return  response


        }

        return null


}


}