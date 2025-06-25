import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IGetUserDataBynameUseCase } from "../interfaces/use-cases/IUserUseCase";
import { User } from "@/domain/entities/User";


export class GetUserDataBynameUseCase implements IGetUserDataBynameUseCase {


    constructor(
        private userRepository: IUserRepository
    ) { }

    async exectue(name: string): Promise<User | null> {
        const data = await this.userRepository.findByUserName(name)
        
        return data ?? null
    }


}