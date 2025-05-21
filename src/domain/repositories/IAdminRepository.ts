import { Basepository } from "../../infrastructure/repositories/BaseRespositroy.js";
import { Admin } from "../entities/admin.js";
import { IBaseRepository } from "./IBaseRepository.js";



export interface IAdminRepository extends IBaseRepository<Admin> {
    // create(user:Admin):Promise<Admin>;
    // findById(Id:string):Promise<Admin |null > 
    findByAdminName(name:string):Promise<Admin |null > 
    // findByIdAndUpdate(id:string,fielsToUpdate:Partial<{refreshToken:string}>):Promise<Admin |null > 
}
