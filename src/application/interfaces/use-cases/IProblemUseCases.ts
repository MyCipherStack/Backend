import { Problem } from "../../../domain/entities/Problem.js";
import { Submission } from "../../../domain/entities/Submission.js";
import { ITestCase } from "../ITestCase.js";


export interface IAddProblemUseCase{
    execute(problem:Problem):Promise<Problem |null>
}

export interface IEditProblemUseCase{

    execute(id:string,problem:Problem):Promise<Problem |null>

}
export interface IRunProblemUseCase{
    
    execute( testCases: ITestCase[],code:string,language:string,memoryLimit:number,timeLimit:number,functionSignatureMeta:{},stopFailTestCase:boolean):Promise<ITestCase[]>
}


export interface IsubmitProblemUseCase{
    execute(testCases:ITestCase[],userId:string,problemId:string,code:string,language:string,totalTestCases:number):Promise<Submission>
}
export interface IAcceptedUserProblemsUseCase{
    execute(userId:string):Promise<Problem[]>
}