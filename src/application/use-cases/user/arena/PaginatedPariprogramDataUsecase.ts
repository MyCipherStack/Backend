

import { IPaginatedChallengeDataUseCase, IPaginatedPairProgrammingDataUseCase } from '@/application/interfaces/use-cases/IChallengeUseCases';
import { GroupChallenge } from '@/domain/entities/GroupChallenge';
import { PairProgramming } from '@/domain/entities/PairProgramming';

import { IPairProgrammingRepository } from '@/domain/repositories/IPairProgrammingRepository';

export class PaginatedPairProgrammingDataUseCase implements IPaginatedPairProgrammingDataUseCase {
    constructor(
        private pairProgrammingRepository: IPairProgrammingRepository,

    ) { }

    async execute(page: number, limit: number, status: string, search: string, isBlocked: string): Promise<{
        data: (PairProgramming | null)[];
        totalCount: number;
        totalPages: number;
    } | null> {
        const paginatedData = await this.pairProgrammingRepository.paginatedData({ page, limit, status, search, isBlocked });
        return paginatedData;
    }

}
