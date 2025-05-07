import { ObjectId } from "mongoose";

export interface IsolvedProblem{
    time:Date,problemId:string,submissionId:string}


export class leaderBoard{
    constructor(
        public challengeId:ObjectId,
        public userId:ObjectId,
        public score?:number,
        public rank?:number,
        public solvedProblems?:[IsolvedProblem]
    ){}
}