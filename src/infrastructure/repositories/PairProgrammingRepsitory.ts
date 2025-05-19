import { PairProgramming } from "../../domain/entities/PairProgramming.js";
import { IPairProgrammingRepository } from "../../domain/repositories/IPairProgrammingRepsotory.js";
import { PairProgramingModel } from "../database/PairProgrammingModel.js";



export class PairProgrammingRepository implements IPairProgrammingRepository{
    async  create(createData: PairProgramming): Promise<PairProgramming> {
        const data= await PairProgramingModel.create(createData)
        return new PairProgramming(data.challengeName,data.duration,data.problems,data.type,data.joinCode,data.startTime,data.endTime)
        
    }

    async findById(Id: string): Promise<PairProgramming | null> {
        const data=await PairProgramingModel.findById(Id)
        if(!data)return null
        return new PairProgramming(data.challengeName,data.duration,data.problems,data.type,data.joinCode,data.startTime,data.endTime)

       
    }
    async findOneChallenge(findData: Partial<PairProgramming>): Promise<PairProgramming | null> {
        const data=await PairProgramingModel.findOne(findData).populate("problems")
        if(!data) return null
        return new PairProgramming(data.challengeName,data.duration,data.problems,data.type,data.joinCode,data.startTime,data.endTime,data._id)


    }
} 

