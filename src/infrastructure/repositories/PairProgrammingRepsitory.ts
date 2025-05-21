import { Document } from "mongoose";
import { PairProgramming } from "../../domain/entities/PairProgramming.js";
import { IPairProgrammingRepository } from "../../domain/repositories/IPairProgrammingRepository.js";
import { IPairProgramming, PairProgramingModel } from "../database/PairProgrammingModel.js";
import { BaseRepository } from "./BaseRespositroy.js";



export class PairProgrammingRepository extends BaseRepository<PairProgramming,IPairProgramming> implements IPairProgrammingRepository{
    // async  create(createData: PairProgramming): Promise<PairProgramming> {
    //     const data= await PairProgramingModel.create(createData)
    //     return new PairProgramming(data.challengeName,data.duration,data.problems,data.type,data.joinCode,data.startTime,data.endTime)
        
    // }

    // async findById(Id: string): Promise<PairProgramming | null> {
    //     const data=await PairProgramingModel.findById(Id)
    //     if(!data)return null
    //     return this.toEntity(data)

       
    // }
    async findOneChallenge(findData: Partial<PairProgramming>): Promise<PairProgramming | null> {
        const data=await PairProgramingModel.findOne(findData).populate("problems")
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
            data.id
        )
    }
} 

