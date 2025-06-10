import { Document } from "mongoose";
import { ProfileDTO } from "../../application/dto/ProfileDTO.js";
import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import UserModel, { IUser } from "../database/UserModel.js";
import { BaseRepository } from "./BaseRespositroy.js";



export class UserRepository extends BaseRepository<User,IUser> implements IUserRepository  {

    constructor(){
        super(UserModel)    
    }

    
    
    // async create(user: User): Promise<User> {
    //     const newUser=await UserModel.create({name:user.name,email:user.email,password:user.password,image:user?.image,googleId:user?.googleId});
    //     return new User(newUser.name,newUser.email,newUser.password)
    // }



    async findByEmail(email: string): Promise<User | null> {
        const getUser=await UserModel.findOne({email}).lean()
        if(!getUser) return null
        return this.toEntity(getUser)
    }


    // async findById(id: string): Promise<User | null> {
        //     const getUser=await UserModel.findById(id).lean()
    //     if(!getUser) return null
      
    //     return new User(getUser.name,getUser.email,"",getUser.status,getUser._id,getUser.image,getUser.googleId,getUser.refreshToken,getUser.displayName,getUser.theme,getUser.preferences)
    //     // return new ProfileDTO(personal,appearance,preferences )
    // }

    
    async findByUserName(name: string): Promise<User | null> {
        const getUser=await UserModel.findOne({name}).lean()
        if(!getUser) return null
        // return new User(getUser.name,getUser.email,getUser.password,getUser.status,getUser._id)
        return this.toEntity(getUser)

    }


    async updatePassword(email:string,password: string): Promise<User | null> {
        const updateUser=await UserModel.findOneAndUpdate({email},{password})
        if(!updateUser) return null
        // return new User(updateUser.name,updateUser.email,updateUser.password)
        return this.toEntity(updateUser)

    }
    
    async updateFieldsByEmail(email:string,fieldsToUpdate:Partial<User>):Promise<User | null>{
        const updateUser=await UserModel.findOneAndUpdate({email},{$set:fieldsToUpdate},{new:true}).lean()
        if(!updateUser) return null
        return this.toEntity(updateUser)

        // return new User(updateUser.name,updateUser.email,updateUser.password)

      
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
        let users= await UserModel.find(query).skip(skip).limit(filters.limit).lean()
        let updatedUser=users.map(data=>{
            return new User(data.name,data.email,data.image,data.displayName,data.theme,data.bio,data.github,data.linkedin,data.created_at,data.status,data.role)
        })
        return {users:updatedUser,totalUsers,totalPages}
    }
    




    protected toEntity(data: (IUser & Document<unknown, any, any>) | null): User | null {
        if(!data)return null

        return new User(data.name,
            data.email,
            data.image,
            data.displayName,
            data.theme,data.bio,data.github,
            data.linkedin,data.created_at,
            data.status,data.role,data.streak,
            data.preferences,data.refreshToken,
            data._id,data.googleId,data.password,
            data.updated_at)

        // return new User(data.name,data.email,data.password,data.status,data._id,data.image,data.googleId,data.refreshToken,data.displayName,data.theme,data.preferences,data.bio,data.github,data.linkedin,data.role,data.streak,data.created_at,data.updated_at)
    }
}















// const personal={
//     username: getUser.name,
//     displayName: getUser.displayName,
//     email: getUser.email,
//     phone: getUser.phone,
//     bio: getUser.bio,
//     github: getUser?.github,
//     linkedin: getUser?.linkedin,
//     avatar: getUser.image,
//     theme: getUser.theme
// }
// const appearance={
//     theme:getUser.theme
// }

// const preferences = {
//     emailNotifications: Boolean(getUser.preferences?.emailNotifications),
//     interviewReminders: Boolean(getUser.preferences?.interviewReminders),
//     contestReminders: Boolean(getUser.preferences?.contestReminders),
//     language: String(getUser.preferences?.language || 'en'),
//     timezone: String(getUser.preferences?.timezone || 'UTC'),
//     publicProfile: Boolean(getUser.preferences?.publicProfile),
//     showActivity: Boolean(getUser.preferences?.showActivity),
// };