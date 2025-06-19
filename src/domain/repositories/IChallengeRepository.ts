
import { IGroupChallenge } from "@/infrastructure/database/GroupChallengeModel.js";
import { GroupChallenge } from "../entities/GroupChallenge.js";
import { IBaseRepository } from "./IBaseRepository.js";


export interface IChallengeRepository extends IBaseRepository<GroupChallenge>{
        findOneChallenge(data:Partial<GroupChallenge>):Promise<GroupChallenge |null>
}