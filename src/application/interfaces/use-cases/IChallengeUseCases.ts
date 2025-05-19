import { ObjectId } from "mongoose";
import { GroupChallenge } from "../../../domain/entities/GroupChallenge.js";
import { IGroupChallenge, IPairProgramming } from "../IChallengeInterfaces.js";



export interface ICreateChallengeUseCase{
    execute(challengeData:IGroupChallenge):Promise<string|null>
}

export interface IJoinChallengeUseCase<joinType>{
    execute(joinCode:string,userId:ObjectId):Promise<joinType>
}


export interface ICreatePairProgrammingUseCase{
    execute(data:IPairProgramming):Promise<String|null>
}