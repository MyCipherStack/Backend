import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IGetUserDataByNameUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { User } from '@/domain/entities/User';
import { UserMapper } from '@/application/mapper/UserMapper';

export class GetUserDataByNameUseCase implements IGetUserDataByNameUseCase {
  constructor(
        private userRepository: IUserRepository,
  ) { }

  async execute(name: string): Promise<User | null> {
    const data = await this.userRepository.findByUserName(name);

    return data ? UserMapper.toResponseDTO(data) : null;

  }
}
