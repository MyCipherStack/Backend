import { promises } from "dns";
import { User } from "../entities/User.js";
import { IUser } from "../../infrastructure/database/UserModel.js";

import { ProfileDTO } from "../../application/dto/ProfileDTO.js";
import { BaseRepository } from "../../infrastructure/repositories/BaseRespositroy.js";



export interface IUserRepository extends BaseRepository<User>{


    // create(user:User):Promise<User>;
    // findById(id:string):Promise<User |null >
    findByEmail(email:string):Promise<User | null >;
    findByUserName(name:string):Promise<User |null >
    updatePassword(email:string,password:string):Promise<User |null >
    updateFeildsByEmail(email:string,fielsToUpdate:Partial<ProfileDTO>):Promise<User | null>
    getFiltersUsers(filters:{page:number,limit:number,role?: string,status?: string, search?: string;
      }):Promise<{
        users: any[];
        totalUsers: number;
        totalPages: number;
      }>
}




export interface IAuthRepository{
    login(email:string,password:string):Promise<{token:string,user:User}>
    logout(userId:string):Promise<void>
    verifyToken(token:string):Promise<User |null>
}
