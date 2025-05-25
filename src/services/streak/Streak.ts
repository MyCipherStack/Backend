import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { IStreakService } from "../../domain/services/IStreakService.js";



export class  StreakService implements IStreakService{
    constructor(
        private userRepository:IUserRepository
    ){}

    async updateUserStreak(email:string): Promise<string> {
      const userData=await this.userRepository.findByEmail(email)
        userData.streak

    }
} 