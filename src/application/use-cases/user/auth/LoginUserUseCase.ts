import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashAlgorithm } from '@/domain/services/IHashAlgorithm';
import { IJwtService } from '@/domain/services/IJwtService';
import { ILoginUserUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { UserMapper } from '@/application/mapper/UserMapper';
import { User } from '@/domain/entities/User';
import { AppError } from '@/shared/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashAlgorithm,
    private JwtService: IJwtService,
  ) { }

  async execute(identifier: string, password: string) {

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identifier);
    let foundUser: User | null = null;

    if (isEmail) {
      foundUser = await this.userRepository.findByEmail(identifier);
    } else {
      foundUser = await this.userRepository.findByUserName(identifier);
    }


    if (!foundUser?.password) {
      throw new AppError('User not found with this email or username');
    }

    if (foundUser.status == 'banned') { throw new AppError('This account was banned',HttpStatusCode.FORBIDDEN); }

    const passCheck = await this.hashService.compare(password, foundUser.password);

    if (!passCheck) {
      throw new AppError('Incorrect password. Please try again.',HttpStatusCode.UNAUTHORIZED);
    }

    const accessToken = this.JwtService.signAccessToken({ userId: foundUser._id!.toString(), name: foundUser.name, role: 'user' });
    const refreshToken = this.JwtService.signRefreshToken({ userId: foundUser._id!.toString(), name: foundUser.name, role: 'user' });
    logger.info(accessToken, refreshToken);
    //

    return { user: UserMapper.toResponseDTO(foundUser), refreshToken, accessToken, }


  }
}
