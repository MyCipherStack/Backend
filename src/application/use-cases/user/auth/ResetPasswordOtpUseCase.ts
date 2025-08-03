import { IPendingUserRepository } from '@/domain/repositories/IPendingUserRepository';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IOtpService } from '@/domain/services/IOtpService';
import { IResetPasswordOtpUseCase } from '@/application/interfaces/use-cases/IUserPasswordUseCases';

export class ResetPasswordOtpUseCase implements IResetPasswordOtpUseCase {
  constructor(
    private otpService: IOtpService,
    private pendingUserRepository: IPendingUserRepository,
    private userRepository: IUserRepository,

  ) { }

  async execute(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('user not found ');
      }

      const otp = this.otpService.createOtp(6);

      console.log('my otp is', otp, email);

      await this.otpService.sendOtp(email, otp);

      //  let hashedOtp = await this.hashService.hash(otp)
      const pendingUser = await this.pendingUserRepository.create({
        name: user.name, email: user.email, password: user.password, otp,
      });

      return pendingUser ?? null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('an unknown error during user creation');
      }
    }
  }
}
