import { Request, Response } from "express";
import { GroupChallengeDTO } from "../../application/dto/GroupChallengeDTO.js";
import { ICreateChallengeUseCase, IJoinChallengeUseCase } from "../../application/interfaces/use-cases/IChallengeUseCases.js";
import { IGetRepositoryDataUseCase } from "../../application/interfaces/use-cases/IGetRepositoryDataUseCase.js";
import { GroupChallenge } from "../../domain/entities/GroupChallenge.js";




export class ArenaController{
    constructor(
        private  createChallengeUseCase:ICreateChallengeUseCase,
        private  joinChallengeUseCase:IJoinChallengeUseCase
    ){}

    createGroupChallenge=async(req:Request,res:Response)=>{
        try{
        const challengeData=new GroupChallengeDTO(req.body)
        const userId=req.user as {id:string}
        const joinCode=await this.createChallengeUseCase.execute({...challengeData,hostId:userId.id})
        
            console.log(joinCode);
            res.status(200).json({status:true,message:"group challenge created",joinCode})
        }catch(error){
            console.log(error);
            
            res.status(400).json({status:false,message:error})
        }    
    }


    joinGroupChallenge=async(req:Request,res:Response)=>{
        try{    
            console.log("joinchallengecontroller");
            
                console.log(req.query);        
                const joinCode=req.query.joinCode
                const user=req.user as{ id:string}
                console.log(joinCode,"code");
                if(joinCode && user){
              const response=await this.joinChallengeUseCase.execute(joinCode.toString(),user.id)
                    console.log(response);
            res.status(200).json({status:true,message:"joined groupChallenge ",challengeData:response})

                    
                }


        }catch(error){
            console.log(error);
            res.status(400).json({status:false,message:error})
            
        }
    }
}