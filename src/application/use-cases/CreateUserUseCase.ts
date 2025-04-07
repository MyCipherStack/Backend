
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { User } from "../../domain/entities/User.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashAlgorithm,
    private pendingUserRepository:IPendingUserRepository
  ) {}

  async execute(name: string, email: string, password: string): Promise<string > {
    const existingEmail = await this.userRepository.findByEmail(email);
    const existingUsername = await this.userRepository.findByUserName(name);    

    if (existingUsername) {
      throw new Error("Username already exists");
    }
    if (existingEmail) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await this.hashService.hashPassword(password);
    const user = new User(name, email, hashedPassword);
   const createdUserEmail= await  this.pendingUserRepository.save(user.name,user.email,user.password)
    return createdUserEmail
  }
}
