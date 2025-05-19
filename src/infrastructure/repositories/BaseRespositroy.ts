import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";
import { IBaseRepository } from "../../domain/repositories/IBaseRepository.js";




export  interface BaseRepository<T>{
    create(data:T):Promise<T>;
    findById(Id:string):Promise<T|null>

}


/// abstract class 



export abstract class BaseRepositorY<T> implements IBaseRepository<T>{
    constructor(protected readonly model:Model<T & Document>){}

    async create(data: T): Promise<T | null> {
        const created=await this.model.create(data)
        return this.toEntity(created)
    }

    async findById(id: string): Promise<T | null> {
        const findedData=await this.model.findById(id)
        return this.toEntity(findedData)
    }


    async updateOneById(id:string,updatedData:Partial<T>):Promise<T | null>{
        const updated=await this.model.findByIdAndUpdate(id,updatedData as any,{new:true})
        return this.toEntity(updated)
    }


    protected abstract toEntity(data:T & Document | null):T |null ;


}

