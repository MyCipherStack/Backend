import { Document } from "mongoose";
import { Interview } from "../../domain/entities/Interview";
import { IInterview, interviewModel } from "../database/InterviewModel";
import { BaseRepository } from "./BaseRespositroy";
import { IInterViewRepository } from "../../domain/repositories/IInterViewRepository";



export class InterViewRepository extends BaseRepository<Interview,IInterview> implements IInterViewRepository{


    constructor(
    ){
        super(interviewModel)
    }

    async findByField(data:Partial<Interview>){
        const response=await interviewModel.find(data)
        return response.map(doc=>this.toEntity(doc)).filter(doc=>doc!=null)
    }


    protected toEntity(data: (IInterview & Document<unknown, any, any>) | null): Interview | null {
        if(!data) return null
        console.log(data._id);
        
        return new Interview(
            data.position,
            data.interviewType,
            data.date.toDateString(),
            data.time,
            data.duration,
            data.notes,
            data.hostId,
            data.partipantId,
            data.id
        )
    }

}