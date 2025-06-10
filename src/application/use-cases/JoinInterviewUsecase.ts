import { Interview } from "../../domain/entities/Interview.js";
import { IInterViewRepository } from "../../domain/repositories/IInterViewRepository.js";
import { IjoinInterViewUseCase } from "../../domain/repositories/IjoinInterViewUseCase.js";


export class joinInterViewUseCase implements IjoinInterViewUseCase{

    constructor(
        private interviewRespositroy:IInterViewRepository
    ){}
   async execute(userId: any,interviewId: any):Promise<Interview | null > {
        const response=await this.interviewRespositroy.findById(interviewId)
     
        if(response){

            if(response?.hostId===userId){
                response.isHost=true
                return response
            }else if(response?.partipantId===userId){
                console.log("Participants");
                response.isHost=false
                return response
            }
            else{
                return null
            }
    }
    return null
}
}