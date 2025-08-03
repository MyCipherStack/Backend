import { IPendingUserRepository } from '@/domain/repositories/IPendingUserRepository';
import { IResetPassverifyOtpUseCase } from '@/application/interfaces/use-cases/IUserPasswordUseCases';

export class ResetPassverifyOtpUseCase implements IResetPassverifyOtpUseCase {
  constructor(
        private pendingUserRepository:IPendingUserRepository,
  ) {}

  async execute(data:{email:string, otp:string}) {
    const pendingUser = await this.pendingUserRepository.findValidUser(data.email);

    if (pendingUser) {
      const now = new Date();
      const expireTime = new Date(pendingUser.createdAt!.getTime() + 5 * 60 * 1000);
      if (now > expireTime) {
        throw new Error('Otp has expired ');
      }
      if (!pendingUser.otp) {
        throw new Error('Otp not found');
      }
      console.log(data.otp, pendingUser.otp);

      // const isValid=await this.hashService.compare(data.otp,pendingUser.otp)
      const isValid = data.otp === pendingUser.otp;
      console.log(isValid);

      if (!isValid) {
        throw new Error('Invalid otp');
      }

      this.pendingUserRepository.delete(data.email);
      return { email: pendingUser.email, verified: true };
    }
    return false;
  }
}
