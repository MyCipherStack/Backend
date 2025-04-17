import { Request, Response } from "express";
import { AddProblemUseCase } from "../../../application/use-cases/addProblemUseCase.js";
import { IProblemRepository } from "../../../domain/repositories/IProblemRepository.js";
import { ProblemDTO } from "../../../application/dto/ProblemDTO.js";


export class AdminProblemController{
  constructor(
        private problemRespository:IProblemRepository   
    ){}

addProblem=async(req:Request,res:Response)=>{
    try{
        console.log("add problem controller");
        
        const problem=new ProblemDTO(req.body)
        // console.log(problem);
        
        const problemUseCase=new AddProblemUseCase(this.problemRespository)
        const data=await problemUseCase.execute(problem)
        console.log(data);
        
        res.status(200).json({status:true,message:"problem Created success",problem:data})
        
        
    }catch(error){
        console.log(error);
        
        res.status(400).json({status:false,message:error.message })
    
    }
    }
}