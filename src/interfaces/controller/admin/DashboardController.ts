import { IAdminDashBoardUseCase } from "@/application/interfaces/use-cases/IAdminUseCase";
import { logger } from "@/infrastructure/logger/WinstonLogger/logger";
import { Request, Response } from "express";



export class DashboardBoardController{

    constructor(
        private adminDashBoardUseCase:IAdminDashBoardUseCase
    ){}


    getAllDashBoardData=async(req:Request,res:Response)=>{
        try{

            const range=req.query.range as string
            const data=await this.adminDashBoardUseCase.execute(range)
            
            logger.info("range",{data})
            res.json({status:true,userData:data.userData,totalUsers:data.totalUsers,
                premiumUsers:data.premiumUsers,
                transactions:data.transactions,
                thisMonthRevenu:data.thisMonthRevenu
            
            
            })
        }catch(error){
         
            logger.error("dashboard controller",error)
            
        }
        

    }
}