import e from "express";
import { PendingUser } from "../../domain/entities/PendingUser.js";
import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { ProfileDTO } from "../dto/ProfileDTO.js";



export class UpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,

  ) { }


  async execute(email: string, updateData:Partial<User>) {
    try {
      console.log(email, updateData);
      // if(updateData.name){
      //   const user=await this.userRepository.findByUserName(updateData.name)
      // throw new Error("username already exists")

      // }
      const updatedUser = await this.userRepository.updateFieldsByEmail(email, updateData);
      console.log(updatedUser, "updated useCase");
      return updatedUser ?? null

    } catch (error: any) {
      throw new Error(error)

    }

  }
}