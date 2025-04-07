export class SendOtpUseCase {
    otpService;
    pendingUserRepository;
    constructor(otpService, pendingUserRepository) {
        this.otpService = otpService;
        this.pendingUserRepository = pendingUserRepository;
    }
    async execute(email) {
        const foundUser = await this.pendingUserRepository.findValidUser(email);
        let otp = "";
        if (foundUser?.otp) {
            console.log("user found");
            otp = foundUser?.otp ?? "";
        }
        else {
            otp = this.otpService.createOtp(6);
            this.pendingUserRepository.updateOtp(email, otp);
        }
        console.log("my otp is", otp);
        await this.otpService.sendOtp(email, otp);
    }
}
