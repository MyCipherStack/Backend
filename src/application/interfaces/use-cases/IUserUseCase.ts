import { User } from "@/domain/entities/User";



export interface  IGetUserDataBynameUseCase{
    exectue(name:string):Promise<User |null>
}