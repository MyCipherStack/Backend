


import { Request, Response } from "express";
import { IGetFilteredUsersUseCase } from "../../application/interfaces/use-cases/IGetFilteredUsersUseCase.js";





export class UsersController{
   constructor(
    private getFilteredUsersUseCase:IGetFilteredUsersUseCase

    ){}
    getData=async(req:Request,res:Response)=>{
        try{

                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 10;
                const role = req.query.role as string;
                const status = req.query.status as string;
                const search = req.query.search as string;

            console.log("getting data contoller");
            console.log(req.body);
            const data =await this.getFilteredUsersUseCase.execute({page,limit,role,status,search})
            // const data1=await this.userRepository.getFiltersUsers({page,limit,role,status,search})
            
            res.status(200).json({status:true,message:"user data fetched success",usersData:data})
            return 
        }catch(error){
            console.log(error);
            
        }
    }
    
    
      
}