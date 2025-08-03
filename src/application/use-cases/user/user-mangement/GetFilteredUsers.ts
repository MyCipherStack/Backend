import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { FilterDTO } from '@/application/dto/FilterDTO';

import { IGetFilteredUsersUseCase } from '@/application/interfaces/use-cases/IGetFilteredUsersUseCase';

/// WANT to rewrite this
export class GetFilteredUsersUseCase implements IGetFilteredUsersUseCase {
  constructor(
    private userRepository: IUserRepository,

  ) {}

  async execute(filters:FilterDTO) {
    const users = await this.userRepository.getFiltersUsers(filters);
    return users;
  }
}
