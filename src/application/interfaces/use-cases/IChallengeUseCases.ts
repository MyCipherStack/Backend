
import { FilterDTO } from "@/application/dto/FilterDTO.js";
import { GroupChallenge } from "../../../domain/entities/GroupChallenge.js";
import { IGroupChallenge, IPairProgramming } from "../IChallengeInterfaces.js";



export interface ICreateChallengeUseCase {
    execute(challengeData: IGroupChallenge): Promise<string | null>
}

export interface IJoinChallengeUseCase<joinType> {
    execute(joinCode: string, userId: string): Promise<joinType>
}


export interface ICreatePairProgrammingUseCase {
    execute(data: IPairProgramming): Promise<String | null>
}


export interface IActivePrivateChallengeUsecase {
    execute(id: string): Promise<GroupChallenge[] | null>
}


export interface IActivePublicChallengeUsecase {
    execute(data: FilterDTO): Promise<{ datas: GroupChallenge[], totalCount: number, totalPages: number } | null>

}