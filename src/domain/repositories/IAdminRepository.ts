import { Admin } from "../entities/admin.js";



export interface IAdminRepository{
    // create(user:Admin):Promise<Admin>;
    findByAdminName(name:string):Promise<Admin |null > 
    findById(Id:string):Promise<Admin |null > 
    findByIdAndUpdate(id:string,fielsToUpdate:Partial<{refreshToken:string}>):Promise<Admin |null > 
}
