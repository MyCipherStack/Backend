import { Submission } from "../../domain/entities/Submission.js";
import { ISubmissionRepository } from "../../domain/repositories/ISubmissionRepository.js";
import { IStreakService } from "../../domain/services/IStreakService.js";
import { ITestCase } from "../interfaces/ITestCase.js";
import { IsubmitProblemUseCase } from "../interfaces/use-cases/IProblemUseCases.js";






export class SubmitProblemUseCase implements IsubmitProblemUseCase{
    constructor(
        private submissionRespository:ISubmissionRepository,
        private streakService:IStreakService
    ){}
    async execute(updatedTestCases:Partial<ITestCase[]>,userId:string,problemId:string,code:string,language:string,totalTestCases:number): Promise<Submission> {
        
        console.log(updatedTestCases);
        
        const totalMemoryUsed=updatedTestCases.reduce((acc,testCase)=>{
            return  acc+= testCase.memory ?? 0
           },0)
          const totalTimeUsed=updatedTestCases.reduce((acc,testCase)=>{
            return  acc+=Number( testCase.runtime) ?? 0
           },0)
   
           let passedTestCases=updatedTestCases.length
           let status="Accepted"
           let failingTestCaseResult={input:"",output:"",compile_output:""}
           let error=""
           
           const isFailed=updatedTestCases.filter(testCase=>{
               if(testCase.status==false)
                return testCase
        })
        const failedTestCase=isFailed[0]
           if(failedTestCase){
               passedTestCases-=1
               error=failedTestCase.error ?? ""
               if(failedTestCase.error){
                status= failedTestCase.error ==="Compilation Error" ? "Compilation Error" :"RunTime Error"
               }else{
                status="Wrong Answer"

               }
               failingTestCaseResult.input=failedTestCase.input
               failingTestCaseResult.output=failedTestCase.output
               failingTestCaseResult.compile_output=failedTestCase.compile_output as string
               
           }

           
        //    console.log(isFailed[0],"failed tesst case");
        //    console.log( typeof totalMemoryUsed,"totalmeomory");
        //    console.log( typeof totalTimeUsed,"type if time");
        //    console.log(  totalTimeUsed,"type if time");
        //    console.log(code,"code");
        //    console.log(language,"languate");
        console.log(passedTestCases);
        
           
           
        this.streakService.updateUserStreak(userId)
   
    const submission=await this.submissionRespository.create({
            userId:userId,
            problemId:problemId
            ,code,language,memory:totalMemoryUsed,runTime:totalTimeUsed,
            passedTestCases,status,failingTestCaseResult,totalTestCases,error

        })
    
        return submission


        
    }

}