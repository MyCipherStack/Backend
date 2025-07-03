
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository";
import { logger } from "@/logger";
import { ICreateUserUseCase } from "../interfaces/use-cases/IUserUseCase";

export class CreateUserUseCase  implements ICreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashAlgorithm,
    private pendingUserRepository:IPendingUserRepository
  ) {}

  async execute(name: string, email: string, password: string): Promise<string| null > {
    const existingEmail = await this.userRepository.findByEmail(email);
    const existingUsername = await this.userRepository.findByUserName(name);    

    if (existingUsername) {
      throw new Error("Username already exists");
    }
    if (existingEmail) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await this.hashService.hash(password);      //IS HERE WANTED TRY CATCH
    const user = new User(name, email);
    logger.info("userData",{user})
   const createdUserEmail= await  this.pendingUserRepository.create({name:user.name,email:user.email,password:hashedPassword})
   if(!createdUserEmail)return null
    return createdUserEmail.email
  }
}
