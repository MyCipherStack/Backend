import { GroupChallengeDTO } from "@/application/dto/GroupChallengeDTO";
import { PairProgramingDTO } from "@/application/dto/PairProgammingDTO";
import { IGroupChallenge, IPairProgramming } from "@/application/interfaces/IChallengeInterfaces";
import { ICreateChallengeUseCase, ICreatePairProgrammingUseCase, IJoinChallengeUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { Request, Response } from "express";


export class ArenaController{ 
    constructor(
        private  createChallengeUseCase:ICreateChallengeUseCase,
        private  joinChallengeUseCase:IJoinChallengeUseCase<IGroupChallenge>,
        private createPairProgrammingUseCase:ICreatePairProgrammingUseCase,
        private  joinPairProgarmmingUseCase:IJoinChallengeUseCase<IPairProgramming>
    ){}

    createGroupChallenge=async(req:Request,res:Response)=>{
        try{
        const challengeData=new GroupChallengeDTO(req.body)
        const userId=req.user as {id:string}
        const joinCode=await this.createChallengeUseCase.execute({...challengeData,hostId:userId.id})
        
            console.log(joinCode,"joinCode");
            res.status(200).json({status:true,message:"challenge created",joinCode})
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
            res.status(400).json({status:false,message:error.message})
            
        }
    }

    createPairProgramming=async(req:Request,res:Response)=>{
        try{
        const data=new PairProgramingDTO(req.body)
        const userId=req.user as {id:string}
        console.log("create challenge contoller",data);
        
        const joinCode=await this.createPairProgrammingUseCase.execute({...data,hostId:userId.id})
        
        console.log(joinCode,"joinCode");
            res.status(200).json({status:true,message:"Challenge created",joinCode})
        }catch(error){
            console.log(error);
            
            res.status(400).json({status:false,message:error})
        }    
    }



    joinPairProgramming=async(req:Request,res:Response)=>{
        try{    
            console.log("joinchallengecontroller");
            
                console.log(req.query);        
                const joinCode=req.query.joinCode
                const user=req.user as{ id:string}
                console.log(joinCode,"code");
                if(joinCode && user){
              const response=await this.joinPairProgarmmingUseCase.execute(joinCode.toString(),user.id)
                    console.log(response);
            res.status(200).json({status:true,message:"joined groupChallenge ",challengeData:response})

                    
                }


        }catch(error){
            console.log(error);
            res.status(400).json({status:false,message:error.message})
            
        }
    }
}