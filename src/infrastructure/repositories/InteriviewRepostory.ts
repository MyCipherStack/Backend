import { Document } from "mongoose";
import { Interview } from "../../domain/entities/Interview.js";
import { IInterview, interviewModel } from "../database/InterView.js";
import { BaseRepository } from "./BaseRespositroy.js";



export class InterViewRepository extends BaseRepository<Interview,IInterview>{


   async create(data: Interview): Promise<Interview | null> {
        const response=await interviewModel.create(data)
        return this.toEntity(response) ?? null
    }



    protected toEntity(data: (IInterview & Document<unknown, any, any>) | null): Interview | null {
        if(!data) return null
        return new Interview(
            data.position,
            data.interviewType,
            data.date,
            data.time,
            data.duration,
            data.notes,
            data.hostId,
            data.partipantId
        )
    }

}