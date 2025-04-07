import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import UserModel from "../database/UserModel.js";



export class UserRepository implements IUserRepository{
    async create(user: User): Promise<User> {
        const newUser=await UserModel.create({name:user.name,email:user.email,password:user.password});
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
}

