import { ObjectId } from "mongoose";

export interface IsolvedProblem{
    time:number,problemId:string,submissionId:string,score:number}


export class leaderBoard{
    constructor(
        public challengeId:ObjectId,
        public userId:ObjectId,
        public Totalscore?:number,
        public rank?:number,
        public solvedProblems?:[IsolvedProblem]
    ){}
}