import { FilterDTO } from "../../application/dto/FilterDto.js";
import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import UserModel from "../database/UserModel.js";



export class UserRepository implements IUserRepository{
    async create(user: User): Promise<User> {
        const newUser=await UserModel.create({name:user.name,email:user.email,password:user.password,image:user?.image,googleId:user?.googleId});
        return new User(newUser.name,newUser.email,newUser.password)
    }
    async findByEmail(email: string): Promise<User | null> {
        const getUser=await UserModel.findOne({email}).lean()
        if(!getUser) return null
       return  new User(getUser.name,getUser.email,getUser.password)
    }
    async findById(id: string): Promise<User | null> {
        const getUser=await UserModel.findById(id).lean()
        if(!getUser) return null
        return new User(getUser.name,getUser.email,getUser.password)
    }
    async findByUserName(name: string): Promise<User | null> {
        const getUser=await UserModel.findOne({name}).lean()
        if(!getUser) return null
        return new User(getUser.name,getUser.email,getUser.password)
    }
    async updatePassword(email:string,password: string): Promise<User | null> {
        const updateUser=await UserModel.findOneAndUpdate({email},{password})
        if(!updateUser) return null
        return new User(updateUser.name,updateUser.email,updateUser.password)
    }

    async updateFeildsByEmail(email:string,fielsToUpdate:Partial<{password:string,refreshToken:string}>){
        const updateUser=await UserModel.findOneAndUpdate({email}{$set:fielsToUpdate},{new:true})
        if(!updateUser) return null
        return new User(updateUser.name,updateUser.email,updateUser.password)
    }

    async getFiltersUsers(filters: {page:number,limit:number, role?: string; status?: string; search?: string; }): Promise<{
        users: any[];
        totalUsers: number;
        totalPages: number;
      }> {
        let   query:any={}
        if(filters.role){
            query.role=filters.role
        }
        if(filters.status) query.status=filters.status
        if(filters.search){
            query.$or=[
                {name:{$regex:filters.search,$options:"i"}},
                {email:{$regex:filters.search,$options:"i"}},
            ]

        }
        const skip=(filters.page-1)*filters.limit
        const totalUsers = await UserModel.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / filters.limit);
        const users= await UserModel.find(query).skip(skip).limit(filters.limit).lean()
        return {users,totalUsers,totalPages}
    }
   
}

