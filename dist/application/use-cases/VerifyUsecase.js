export class VerifyUseCase {
    pendingUserRepository;
    otpService;
    constructor(pendingUserRepository, otpService) {
        this.pendingUserRepository = pendingUserRepository;
        this.otpService = otpService;
    }
    async execute(email, otp) {
        const userData = await this.pendingUserRepository.findValidUser(email);
        if (!userData || !userData.otp) {
            throw new Error("OTP has expired or user not found");
        }
        const isValid = this.otpService.verifyOtp(userData?.otp, otp);
        if (!isValid) {
            throw new Error("Invalid OTP");
        }
        return true;
    }
}
