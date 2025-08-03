import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashAlgorithm } from '@/domain/services/IHashAlgorithm';
import { IResetPasswordUseCase } from '@/application/interfaces/use-cases/IResetPasswordUseCase';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
        private UserRepository:IUserRepository,
        private hashService: IHashAlgorithm,

  ) {}

  async execute(email:string, password:string) {
    const hashedPassword = await this.hashService.hash(password);
    console.log(email, password);
    this.UserRepository.updatePassword(email, hashedPassword);
  }
}
