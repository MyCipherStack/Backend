import { ObjectId } from "mongoose";
import { User } from "./User";

export interface IsolvedProblem{
    time:string,problemId:ObjectId,submissionId:ObjectId,score:number}


export class leaderBoard{
    constructor(
        public challengeId:ObjectId,
        public userId:User| ObjectId ,
        public totalscore?:number,
        public rank?:number,
        public solvedProblems?:[IsolvedProblem],
    ){}
}