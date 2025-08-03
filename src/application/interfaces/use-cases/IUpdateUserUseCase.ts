import { User } from '../../../domain/entities/User.js';

export interface IUpdateUserUseCase{
    execute(email:string, updateData:{}):Promise<User | null>
}
