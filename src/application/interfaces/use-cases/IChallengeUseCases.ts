import { ObjectId } from "mongoose";
import { GroupChallenge } from "../../../domain/entities/GroupChallenge.js";
import { IGroupChallenge } from "../IChallengeInterfaces.js";



export interface ICreateChallengeUseCase{
    execute(challengeData:IGroupChallenge):Promise<string|null>
}

export interface IJoinChallengeUseCase{
    execute(joinCode:string,userId:ObjectId):Promise<GroupChallenge>
}