import { Request, Response } from "express";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";
import Juge0CodeExecute from "../../services/Judg0/Juge0CodeExecute.js";
import { ProblemDTO } from "../../application/dto/ProblemDTO.js";



export class ProblemController{
    constructor(
           private problemRespository:IProblemRepository
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
             
             res.status(200).json({status:true,message:"problems fetched success",problemData:data})
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
            
            for(let test of testCases){
                const token= await Juge0CodeExecute.submitCode(language,code,test.input,test.output,problem.memoryLimit,problem.timeLimit,problem.functionSignatureMeta)
                const response= await Juge0CodeExecute.getResult(token)
                if(response.output){

                    const match =response.output.match(/([\s\S]*?)__RESULT__:(.*)/);
                    
                    const logOut = match ? match[1].trim() : '';      
                    const actualOutput = match && match[2] ? match[2].trim() : '';  
                    const status = test.output.trim() == actualOutput;
                    
                    
                    
                    test.status=status
                    test.logOut=logOut
                    test.compile_output=actualOutput
                }else{
                    
                    test.status=false
                    test.error=response.error
                }
                
            }

            
            res.status(200).json({status:true,message:"test cases runned successfuly",testResult:testCases})
            
        }catch(error){
            console.log(error);
            
            res.status(400).json({status:false,message:error.message })
        }
     }

     submitProblet=async(req:Request,res:Response)=>{
        try{

        }catch(error){
            
        }
     }

}