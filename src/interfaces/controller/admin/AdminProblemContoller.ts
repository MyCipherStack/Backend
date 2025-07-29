import { Request, Response } from "express";

import { ProblemDTO } from "../../../application/dto/ProblemDTO";
import { IAddProblemUseCase, IEditProblemUseCase } from "../../../application/interfaces/use-cases/IProblemUseCases";


export class AdminProblemController{
  constructor(
        private addProblemUseCase:IAddProblemUseCase,
        private editProblemUseCase:IEditProblemUseCase   

    ){}

addProblem=async(req:Request,res:Response)=>{
    try{
        console.log("add problem controller");
        console.log(req.body,"Add problem ");
        
        const problem=new ProblemDTO(req.body)
        console.log(problem,"problemDTO");
        
        // const problemUseCase=new AddProblemUseCase(this.problemRespository)
        const data=await this.addProblemUseCase.execute(problem)
        console.log(data);
        
        res.status(200).json({status:true,message:"problem Created success",problem:data})
        
        
    }catch(error){

        if(error instanceof Error)
        
        res.status(400).json({status:false,message:error.message })
    
    }
    }

    editProblem=async(req:Request,res:Response)=>{
        try{
            console.log("edit problem controller");
            console.log(req.body);
            
            const problem=new ProblemDTO(req.body)
            const id=req.body._id
            console.log(id,problem,"id and problem");
            
            // const editProblemUseCase=new EditProblemUseCase(this.problemRespository)
            const data=await this.editProblemUseCase.execute(id,problem)
            console.log(data,"last Data");
            

        res.status(200).json({status:true,message:"problem edited successfully",problem:data})

            
        }catch(error){
            console.log(error);
            
        }
    }
}