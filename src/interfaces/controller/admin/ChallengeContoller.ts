import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { PairProgramming } from "@/domain/entities/PairProgramming";
import { AppError } from "@/domain/error/AppError";
import { NextFunction, Request, Response } from "express";




export class ChallengeContoller<Entity>{

    constructor(
        private getGroupChallengeData:IGetRepositoryDataUseCase<Entity>,
        private getPairprogamming:IGetRepositoryDataUseCase<Entity>
    ){}

    allGroupChallenges=async(req:Request,res:Response,next:NextFunction)=>{
        try{


            const data=await this.getGroupChallengeData.allDoucuments()

            res.status(200).json({message:"all group challenge data fetched",challenges:data})
            
        }catch(error){
            next(new AppError("err in getting data",400))
        }

    }



    getAllPairProgramming=async(req:Request,res:Response,next:NextFunction)=>{
        try{


            const data=await this.getPairprogamming.allDoucuments()

            res.status(200).json({message:"all pairProgarming data fetched",pairProgram:data})
            
        }catch(error){
            next(new AppError("err in getting data",400))
        }

    }
}