import { Request, Response } from "express";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";
import Juge0CodeExecute from "../../services/Judg0/Juge0CodeExecute.js";
import { ProblemDTO } from "../../application/dto/ProblemDTO.js";
import { IRunProblemUseCase } from "../../application/interfaces/use-cases/IProblemUseCases.js";
import { IGetRepositoryDataUseCase } from "../../application/interfaces/use-cases/IGetRepositoryDataUseCase.js";
import { Problem } from "../../domain/entities/Problem.js";



export class ProblemController{
    constructor(
           private problemRespository:IProblemRepository,
           private runProblemUseCase:IRunProblemUseCase,
           private getProblemDataUseCase:IGetRepositoryDataUseCase<Problem>
     ){}
     getData=async(req:Request,res:Response)=>{
         try{
 
                 const page = parseInt(req.query.page as string) || 1;
                 const limit = parseInt(req.query.limit as string) || 10;
                 const difficulty = req.query.difficulty as string;
                 const category = req.query.category as string;
                 const status = req.query.status as string;
                 const search = req.query.search as string;
 
           
             const data=await this.problemRespository.getFilterProblem({page,limit,difficulty,status,search,category})
             console.log(data,"datasss");
             const problems=data.problems.map((problem)=>{
            return   { ...problem,
                testCases:problem.testCases.filter((tc)=>tc.isSample)}
             })
            const sampleTestCasesOnlyData={...data,problems}
    
             res.status(200).json({status:true,message:"problems fetched success",problemData:sampleTestCasesOnlyData})
             return 
         }catch(error){
             console.log(error);
             
         }
     }

     runProblem=async(req:Request,res:Response)=>{
        try{
    
            const problem= new ProblemDTO(req.body.programDetails)
            const code=req.body.code
            const language=req.body.language
            let testCases=req.body.testCases
            
          const updatedTestCases=await this.runProblemUseCase.excute(testCases,code,language,problem.memoryLimit,problem.timeLimit,problem.functionSignatureMeta,false)
         
            res.status(200).json({status:true,message:"test cases runned successfuly",testResult:updatedTestCases})
            
        }catch(error){
            console.log(error);
            
            res.status(400).json({status:false,message:error.message })
        }
     }

     submitProblem=async(req:Request,res:Response)=>{
        try{
            const problem= new ProblemDTO(req.body.programDetails)
            const code=req.body.code
            const language=req.body.language
            let testCases=req.body.testCases  //this have only sampleTestCase
            
        const ProblemWithAlltestCases=await this.getProblemDataUseCase.execute(problem._id)
        const AllTestCases=ProblemWithAlltestCases?.testCases ?? []
        const updatedTestCases=await this.runProblemUseCase.execute(AllTestCases,code,language,problem.memoryLimit,problem.timeLimit,problem.functionSignatureMeta,true)
        
        

        }catch(error){  
            console.log(error);
            
        }
     }

}