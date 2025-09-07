import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IUpdateUserUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { UserMapper } from '@/application/mapper/UserMapper';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private userRepository: IUserRepository,

  ) { }

  async execute(email: string, updateData:Partial<User>):Promise<User |null> {
    try {
      const updatedUser = await this.userRepository.updateFieldsByEmail(email, updateData);
      console.log(updatedUser, 'updated useCase');


      return updatedUser ?   UserMapper.toResponseDTO(updatedUser) :null
  
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
