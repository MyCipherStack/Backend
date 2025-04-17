import { Request, Response } from "express";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";




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
 
             console.log("getting data contoller");
             console.log(req.body);
 
             const data=await this.problemRespository.getFilterProblem({page,limit,difficulty,status,search,category})
             console.log(data,"datasss");
             
             res.status(200).json({status:true,message:"problems fetched success",problemData:data})
             return 
         }catch(error){
             console.log(error);
             
         }
     }

}