import { User } from "../entities/User.js";
import { ProfileDTO } from "../../application/dto/ProfileDTO.js";
import { IBaseRepository } from "./IBaseRepository.js";


export interface IUserRepository extends IBaseRepository<User>{


    // create(user:User):Promise<User>;
    // findById(id:string):Promise<User |null >
    findByEmail(email:string):Promise<User | null >;
    findByUserName(name:string):Promise<User |null >
    updatePassword(email:string,password:string):Promise<User |null >
    updateFieldsByEmail(email:string,fieldsToUpdate:Partial<User>):Promise<User | null>
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
