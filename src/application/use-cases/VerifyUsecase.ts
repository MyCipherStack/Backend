import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository";
import { IOtpService } from "../../domain/services/IOtpService";
import { IVerifyOtpUseCase } from "../interfaces/use-cases/IOtpUseCases";

export class VerifyOtpUseCase  implements IVerifyOtpUseCase{

    constructor(
        private pendingUserRepository: IPendingUserRepository,
        private otpService: IOtpService,

    ) { }

    async execute(email: string, otp: string) {
        const userData = await this.pendingUserRepository.findValidUser(email)
        console.log(userData);



        const isValid = this.otpService.verifyOtp(userData?.otp, otp)
        if (!isValid) {
            throw new Error("Invalid OTP");
        }
        return true

    }


}