import { Request, Response } from "express";
import { IGetAllSubmissionByProblemuseCase } from "../../application/interfaces/use-cases/IGetAllSubmissionByProblemuseCase";



export class SubmissionController{

    constructor(
        private getAllSubmissionByProblemuseCase:IGetAllSubmissionByProblemuseCase
    ){}


    getSubmissionData=async(req:Request,res:Response)=>{
        try{
            const {problemId}=req.query as {problemId:string}
            const user=req.user as {id:"string"}

            console.log(problemId);

        const submissions=await this.getAllSubmissionByProblemuseCase.execute(user.id,problemId)
        res.status(200).json({status:true,message:"test submissiondata by problem",submissions})

        }catch(error){
            res.status(400).json({status:false,message:"Something went wrong"})
        }
    }

}