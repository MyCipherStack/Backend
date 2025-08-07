import { User } from './User';

export interface IsolvedProblem{
    time:string, problemId:string, submissionId:string, score:number}

export class leaderBoard {
  constructor(
        public challengeId:any ,
        public userId:any,
        public totalscore?:number,
        public rank?:number,
        public solvedProblems?:IsolvedProblem[],
  ) {}
}
