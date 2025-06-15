import { Document } from "mongoose";
import { Admin } from "../../domain/entities/admin";
import { IAdminRepository } from "../../domain/repositories/IadminRepository";
import adminModel, { IAdmin } from "../database/AdminModel";
import { BaseRepository } from "./BaseRespositroy";

export class AdminRepository extends BaseRepository<Admin,IAdmin> implements IAdminRepository{


    constructor(){
        super(adminModel)
    }
    async findByAdminName(name: string): Promise<Admin | null> {
     const admin =await adminModel.findOne({name}).lean()
     if(!admin) return null
        return this.toEntity(admin)
    }

//    async findByIdAndUpdate(id: string, fiedlsToUpdate: Partial<{ refreshToken: string; }>): Promise<Admin | null> {
//         const admin =await adminModel.findByIdAndUpdate(id,{$set:fiedlsToUpdate},{new:true}).lean()
//         if(!admin) return null
//          return new Admin(admin.name,admin.password,admin.id)
//     }


protected toEntity(data: (IAdmin & Document<unknown, any, any>) | null): Admin | null {
    if(!data) return null
    return new Admin(
        data.name,
        data.password,
        data.id
    )
}
}