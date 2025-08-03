import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashAlgorithm } from '@/domain/services/IHashAlgorithm';
import { IVerifyUserPasswordUseCase } from '@/application/interfaces/use-cases/IUserPasswordUseCases';

export class VerifyUserPasswordUseCase implements IVerifyUserPasswordUseCase {
  constructor(
      private userRepository:IUserRepository,
      private hashService:IHashAlgorithm,
  ) {}

  async execute(email: string, password: string): Promise<boolean> {
    const userData = await this.userRepository.findByEmail(email);
    if (userData?.password) {
      const isValid = await this.hashService.compare(password, userData.password);
      return isValid;
    }
    return false;
  }
}
