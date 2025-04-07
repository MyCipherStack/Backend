import { OtpDTO } from "../../application/dto/OtpDTO.js";
import { VerifyUseCase } from "../../application/use-cases/VerifyUsecase.js";
import { RegisterUserFromPendingUseCase } from "../../application/use-cases/RegisterUserFromPendingUseCase .js";
export class VerifyOtpController {
    otpService;
    PendingUserRepository;
    UserRepository;
    constructor(otpService, PendingUserRepository, UserRepository) {
        this.otpService = otpService;
        this.PendingUserRepository = PendingUserRepository;
        this.UserRepository = UserRepository;
    }
    verify = async (req, res) => {
        try {
            console.log("verigy otp");
            const data = new OtpDTO(req.body);
            console.log(data);
            const verifyUsecase = new VerifyUseCase(this.PendingUserRepository, this.otpService);
            const isValid = await verifyUsecase.execute(data.email, data.otp);
            if (!isValid) {
                console.log("not valid otp");
                return res.status(400).json({ status: false, message: "Invalid or expired OTP" });
            }
            const createUserRepo = new RegisterUserFromPendingUseCase(this.PendingUserRepository, this.UserRepository);
            const userData = await createUserRepo.execute(data.email);
            console.log(userData, "created Data");
            res.json({ status: true, message: "user created Successfully", user: { name: userData.name, email: userData.email } });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: false, message: error.message });
        }
    };
}
