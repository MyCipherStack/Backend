import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";


export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
  }
  

export class RegisterUserFromPendingUseCase {
    constructor(
 private pendingUserRepository:IPendingUserRepository,
private UserRepository:IUserRepository,
    ){}

    async execute(email:string){
        const pendingUser=await this.pendingUserRepository.findValidUser(email)
        if(!pendingUser){
            throw new Error("User not found in pending list");
        }
    const existingEmail = await this.UserRepository.findByEmail(email);

        if (existingEmail) {
            throw new Error("User with this email already exists");
          }
      const user=await this.UserRepository.create({
            name:pendingUser.name,
            email:pendingUser.email,
            password:pendingUser.password
        } as any)
return user
        }
}