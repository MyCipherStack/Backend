import { Document } from "mongoose";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import UserModel, { IUser } from "../database/UserModel";
import { BaseRepository } from "./BaseRespositroy";
import { logger } from "@/logger";



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


    
    async findByUserName(name: string): Promise<User | null> {
        const getUser=await UserModel.findOne({name}).lean()
        if(!getUser) return null
        return this.toEntity(getUser)

    }


    async updatePassword(email:string,password: string): Promise<User | null> {
        const updateUser=await UserModel.findOneAndUpdate({email},{password})
        if(!updateUser) return null
        return this.toEntity(updateUser)

    }
    
    async updateFieldsByEmail(email:string,fieldsToUpdate:Partial<User>):Promise<User | null>{
        const updateUser=await UserModel.findOneAndUpdate({email},{$set:fieldsToUpdate},{new:true}).lean()
        if(!updateUser) return null
        return this.toEntity(updateUser)


      
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
    


    async userGrowthByRange(format:string,startDate:Date): Promise<any | null> {
        logger.info("userRepodata",{format,startDate})

        const data=await UserModel.aggregate([{$match:{
            createdAt:{$gte:startDate}}},
            {
                $group:{
                    _id:{
                        $dateToString:{
                            format,
                            date:'$createdAt'
                        }
                    },
                    userCount:{$sum:1}
                }
            }
        ])
        
        const mapper=(data)=>{ return   data.map((obj=>({range:obj._id,usersCount:obj.userCount})))}
        
        const user=await UserModel.aggregate([{
            $group:{
                _id:null,
                totalUsers:{$sum:1},
                premiumUsers:{$sum:{$cond:[{$eq:["$role","premium"]},1,0]}}
            }}
        ])
        
        logger.info("ASDsdfsdf",{data})

        return {userDetails:mapper(data),totalUser:user}
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
            data.updated_at,
            )

    }
}












