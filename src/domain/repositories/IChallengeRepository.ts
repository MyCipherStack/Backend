
import { IGroupChallenge } from "@/infrastructure/database/GroupChallengeModel.js";
import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { GroupChallenge } from "../entities/GroupChallenge.js";


export interface IChallengeRepository extends BaseRepository<GroupChallenge,IGroupChallenge>{
        findOneChallenge(data:Partial<GroupChallenge>):Promise<GroupChallenge |null>
}