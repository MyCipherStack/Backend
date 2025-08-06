import { Admin } from "../entities/Admin";
import { IBaseRepository } from "./IBaseRepository";

export interface IAdminRepository extends IBaseRepository<Admin> {
  
    findByAdminName(name:string):Promise<Admin |null >

}
