import { Request, Response } from "express";
import { AddProblemUseCase } from "../../../application/use-cases/addProblemUseCase.js";
import { IProblemRepository } from "../../../domain/repositories/IProblemRepository.js";
import { ProblemDTO } from "../../../application/dto/ProblemDTO.js";
import { EditProblemUseCase } from "../../../application/use-cases/EditProblemUseCase.js";


export class AdminProblemController{
  constructor(
        private problemRespository:IProblemRepository   
    ){}

addProblem=async(req:Request,res:Response)=>{
    try{
        console.log("add problem controller");
        console.log(req.body,"Add problem da");
        
        const problem=new ProblemDTO(req.body)
        console.log(problem,"problemDTO");
        
        const problemUseCase=new AddProblemUseCase(this.problemRespository)
        const data=await problemUseCase.execute(problem)
        console.log(data);
        
        res.status(200).json({status:true,message:"problem Created success",problem:data})
        
        
    }catch(error){
        console.log(error);
        
        res.status(400).json({status:false,message:error.message })
    
    }
    }

    editProblem=async(req:Request,res:Response)=>{
        try{
            console.log("edit problem controller");
            console.log(req.body);
            
            const problem=new ProblemDTO(req.body)
            const id=req.body._id
            console.log(id,problem);
            
            const editProblemUseCase=new EditProblemUseCase(this.problemRespository)
            const data=await editProblemUseCase.execute(id,problem)
            console.log(data);
            

        res.status(200).json({status:true,message:"problem edited successfully",problem:data})

            
        }catch(error){
            console.log(error);
            
        }
    }
}