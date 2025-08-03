import { IPendingUserRepository } from '@/domain/repositories/IPendingUserRepository';
import { IOtpService } from '@/domain/services/IOtpService';
import { ISendOtpUseCase } from '@/application/interfaces/use-cases/IOtpUseCases';

export class SendOtpUseCase implements ISendOtpUseCase {
  constructor(
        private otpService: IOtpService,
        private pendingUserRepository: IPendingUserRepository,
  ) { }

  async execute(email: string) {
    const foundUser = await this.pendingUserRepository.findValidUser(email);
    console.log(foundUser, 'pengind user data');

    if (!foundUser) throw new Error('Code expired send again');
    let otp = '';
    if (foundUser?.otp) {
      console.log('user found');
      otp = foundUser?.otp ?? '';
    } else {
      otp = this.otpService.createOtp(6);
      // const User=await this.pendingUserRepository.save("",email,"",otp)
      this.pendingUserRepository.updateOtp(email, otp);
    }
    console.log('my otp is', otp);
    console.log(' user email', email);

    try {
      await this.otpService.sendOtp(email, otp);
    } catch (error) {
      console.log(error, 'err');

      throw new Error('Failed to send OTP');
    }
  }
}
