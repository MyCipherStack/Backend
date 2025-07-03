import { IChallengeRepository } from "@/domain/repositories/IChallengeRepository"
import { IActivePublicChallengeUsecase } from "../interfaces/use-cases/IChallengeUseCases"
import { GroupChallenge } from "@/domain/entities/GroupChallenge"
import { FilterDTO } from "../dto/FilterDTO";






export class ActivePublicChallengeUsecase implements IActivePublicChallengeUsecase {

    constructor(
        private challengeRepository: IChallengeRepository
    ) { }

    async execute(data: FilterDTO): Promise<{ datas: GroupChallenge[], totalCount: number, totalPages: number } | null> {

         data.type = "public"

        const response = await this.challengeRepository.paginatedData(data)

        return response ?? null


    }
}