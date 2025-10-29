import { GroupChallenge } from "../entities/GroupChallenge";
import { IBaseRepository } from "./IBaseRepository";


export interface IChallengeRepository extends IBaseRepository<GroupChallenge> {

  findOneChallenge(data: Partial<GroupChallenge>): Promise<GroupChallenge | null>

  findAllByFields(data: Partial<GroupChallenge>): Promise<GroupChallenge[] | null>

  paginatedData(filters: { page: number, limit: number, isBlocked?: boolean, search?: string, status?: string, type?: string }): Promise<{
    datas: (GroupChallenge | null)[];
    totalCount: number;
    totalPages: number;
  }>

}
