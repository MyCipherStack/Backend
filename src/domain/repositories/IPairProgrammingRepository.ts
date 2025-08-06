import { PairProgramming } from "../entities/PairProgramming";
import { IBaseRepository } from "./IBaseRepository";



export interface IPairProgrammingRepository extends IBaseRepository<PairProgramming> {

        findOneChallenge(data: Partial<PairProgramming>): Promise<PairProgramming | null>

        paginatedData(filters: { page: number, limit: number, type?: string; status?: string; search?: string, isBlocked?:string }): Promise<{
                data: any[];
                totalCount: number;
                totalPages: number;
        }>

}
