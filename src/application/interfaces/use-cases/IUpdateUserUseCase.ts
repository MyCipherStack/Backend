import { User } from "@/domain/entities/User";

export interface IUpdateUserUseCase{
    execute(email:string, updateData:{}):Promise<User | null>
}
