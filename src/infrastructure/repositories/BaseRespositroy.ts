import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";
import { IBaseRepository } from "../../domain/repositories/IBaseRepository";




// export  interface BaseRepository<T>{
//     create(data:T):Promise<T>;
//     findById(Id:string):Promise<T|null>

// }


/// abstract class 



export abstract class BaseRepository<Entity,ModelSchema> implements IBaseRepository<Entity>{
    constructor(protected readonly model:Model<ModelSchema & Document>){}

    async create(data:Entity): Promise<Entity | null> {
        const created=await this.model.create(data)
        return this.toEntity(created)
    }

    async findById(id: string): Promise<Entity | null> {
        const findedData=await this.model.findById(id)
        return this.toEntity(findedData)
    }


    async updateOneById(id:string,updatedData:Partial<Entity>):Promise<Entity | null>{
        const updated=await this.model.findByIdAndUpdate(id,updatedData as any,{upsert:true})
        return this.toEntity(updated)
    }

    async findAll(): Promise<Entity[] | null> {
        const allDoucuments=await this.model.find()
        return allDoucuments.map(data=>this.toEntity(data)).filter(data=>data!=null)
    }


    protected abstract toEntity(data:ModelSchema & Document | null):Entity |null ;


}

