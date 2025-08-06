import { FilterDTO } from '@/application/dto/FilterDTO';
import { GroupChallenge } from '@/domain/entities/GroupChallenge'; 
import { IGroupChallenge, IPairProgramming } from '../IChallengeInterfaces'; 
import { PairProgramming } from '@/domain/entities/PairProgramming'; 
import { leaderBoard } from '@/domain/entities/LeaderBoard'; 

export interface ICreateChallengeUseCase {
    execute(challengeData: IGroupChallenge, userId: string): Promise<string | null>
}

export interface IJoinChallengeUseCase {
    execute(joinCode: string, userId: string): Promise<GroupChallenge>
}
export interface IJoinPairProgrammigUseCase {
    execute(joinCode: string, userId: string, userName: string): Promise<PairProgramming | null>
}

export interface ICreatePairProgrammingUseCase {
    execute(data: IPairProgramming): Promise<string | null>
}

export interface IActivePrivateChallengeUsecase {
    execute(id: string): Promise<GroupChallenge[] | null>
}

export interface IActivePublicChallengeUsecase {
    execute(data: FilterDTO): Promise<{ datas:(GroupChallenge | null)[], totalCount: number, totalPages: number } | null>

}

export interface IEndChallengeUseCase {
    execute(challengeId: string, delay: number): Promise<void>
}

export interface IEvaluateWinnerUsecase {
}

export interface IEvaluateWinnerUsecase {
    execute(challengeId: string): Promise<void>

}
export interface IChallengeResultsUseCase {
    execute(userId: string, filterData: FilterDTO): Promise<{ leaderBoard: leaderBoard[], totalData: number, totalPages: number } | null>

}
export interface ILeaderBoardUseCase {
    execute(challengeId: string): Promise<{
        userName: string;
        totalScore: number | undefined;
        solvedCount: number;
        isLive: boolean;
        image: string;
        rank: number;
    }[] | null>

}
