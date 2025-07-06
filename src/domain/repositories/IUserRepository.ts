import { User } from "../entities/User.js";
import { IBaseRepository } from "./IBaseRepository.js";


export interface IUserRepository extends IBaseRepository<User>{




    findByEmail(email:string):Promise<User | null >;
    
    findByUserName(name:string):Promise<User |null >

    updatePassword(email:string,password:string):Promise<User |null >

    updateFieldsByEmail(email:string,fieldsToUpdate:Partial<User>):Promise<User | null>

    getFiltersUsers(filters:{page?:number,limit?:number,role?: string,status?: string, search?: string;
      }):Promise<{
        users: any[];
        totalUsers: number;
        totalPages: number;
      }>

      userGrowthByRange(format:string,startDate:Date):Promise<{date:string,users:number} | null>


     updatePoints(id:string,points:number):Promise<User | null>



}



export interface IAuthRepository{
    login(email:string,password:string):Promise<{token:string,user:User}>
    logout(userId:string):Promise<void>
    verifyToken(token:string):Promise<User |null>
}
