import { User } from "@/domain/entities/User";



export interface IGetUserDataBynameUseCase {
    exectue(name: string): Promise<User | null>
}


export interface ICreateUserUseCase {
    execute(name: string, email: string, password: string): Promise<string | null>
}


export interface ILoginUserUseCase {
    execute(identifier: string, password: string): Promise<{
        user:
        { name: string, email: string, image?: string },
        refreshToken: string, accessToken: string
    }>
}


export interface IGoogleUserUseCase {
    execute(name: string, email: string, image: string, googleId: string): Promise<{
        user:User,
        accessToken: string, refreshToken: string
    }>

}


export interface IRegisterUserFromPendingUseCase{
    execute(email:string):Promise<User | null>
}

export interface IUpdateUserUseCase{
   execute(email: string, updateData:Partial<User>):Promise<User |null>
}