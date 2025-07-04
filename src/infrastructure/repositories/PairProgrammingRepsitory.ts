import { Document } from "mongoose";
import { PairProgramming } from "../../domain/entities/PairProgramming";
import { IPairProgrammingRepository } from "../../domain/repositories/IPairProgrammingRepository";
import { IPairProgramming, PairProgrammingModel } from "../database/PairProgrammingModel";
import { BaseRepository } from "./BaseRespositroy";
import { logger } from "@/logger";



export class PairProgrammingRepository extends BaseRepository<PairProgramming,IPairProgramming> implements IPairProgrammingRepository{


    constructor(){
        super(PairProgrammingModel)
    }
    async findOneChallenge(findData: Partial<PairProgramming>): Promise<PairProgramming | null> {
        const data=await PairProgrammingModel.findOne(findData).populate("problems")
        if(!data) return null
       return this.toEntity(data)


    }

    protected toEntity(data: (IPairProgramming & Document<unknown, any, any>) | null): PairProgramming | null {
        if(!data) return null
        return new PairProgramming(
            data.challengeName,
            data.duration,
            data.problems,
            data.type,
            data.joinCode,
            data.startTime.toString(),
            data.endTime.toString(),
            data.id,
            data.status,
            data.createdAt,
            data.updatedAt,

        )
    }
} 

