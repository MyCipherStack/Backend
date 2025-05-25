import { Request, Response } from "express";
import { InterviewDTO } from "../../application/dto/InterviewDTO.js";
import { ICreateRepoUseCase } from "../../application/interfaces/use-cases/ICreateRepoUseCase.js";
import { Interview } from "../../domain/entities/Interview.js";



export class  InterviewController{

    constructor(
        private createRepoUseCase:ICreateRepoUseCase<Interview>
    ){}

    schedule=async(req:Request,res:Response)=>{
        try{

            const data=new InterviewDTO(req.body)
            const {id}=req.user
            const response=await this.createRepoUseCase.execute(data)
            return response
        }catch(error){
            console.log(error);
            
        }
    }
}