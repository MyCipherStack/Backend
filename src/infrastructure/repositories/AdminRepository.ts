import { Admin } from "../../domain/entities/admin.js";
import { IAdminRepository } from "../../domain/repositories/IadminRepository.js";
import adminModel from "../database/AdminModel.js";

export class AdminRepository implements IAdminRepository{

    async findByAdminName(name: string): Promise<Admin | null> {
     const admin =await adminModel.findOne({name}).lean()
     if(!admin) return null

     return new Admin(admin.name,admin.password,admin.id)
    }

   async findByIdAndUpdate(id: string, fiedlsToUpdate: Partial<{ refreshToken: string; }>): Promise<Admin | null> {
        const admin =await adminModel.findByIdAndUpdate(id,{$set:fiedlsToUpdate},{new:true}).lean()
        if(!admin) return null
         return new Admin(admin.name,admin.password,admin.id)
    }
}