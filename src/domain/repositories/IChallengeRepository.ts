import { GroupChallenge } from "../entities/GroupChallenge.js";
import { IBaseRepository } from "./IBaseRepository.js";


export interface IChallengeRepository extends IBaseRepository<GroupChallenge> {

        findOneChallenge(data: Partial<GroupChallenge>): Promise<GroupChallenge | null>

        findAllByFields(data: Partial<GroupChallenge>): Promise<GroupChallenge[] | null>

        paginatedData(filters: {page:number,limit:number, isBlocked?:string ,search?: string,status?: string,type?: string}): Promise<{
            datas: GroupChallenge[];
            totalCount: number;
            totalPages: number;
          }> 

}