import { NextFunction, Request, Response } from "express"
import { OtpDTO } from "../../../application/dto/OtpDTO"
import { VerifyUseCase } from "../../../application/use-cases/VerifyUsecase";
import { IPendingUserRepository } from "../../../domain/repositories/IPendingUserRepository";
import { IOtpService } from "../../../domain/services/IOtpService.js";
// import { RegisterUserFromPendingUseCase } from "../../application/use-cases/RegisterUserFromPendingUseCase";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { RegisterUserFromPendingUseCase } from "../../../application/use-cases/RegisterUserFromPendingUseCase ";
import { IVerifyOtpUseCase } from "@/application/interfaces/use-cases/IOtpUseCases";
import { IRegisterUserFromPendingUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { AppError } from "@/domain/error/AppError";



export class VerifyOtpController {
  constructor(
    private verifyOtpUseCase: IVerifyOtpUseCase,
    private registerUserFromPendingUseCase: IRegisterUserFromPendingUseCase
  ) { }


  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("verigy otp");
      const data = new OtpDTO(req.body);
      
      const isValid = await this.verifyOtpUseCase.execute(data.email, data.otp)

      if (!isValid) {

        return res.status(400).json({ status: false, message: "Invalid or expired OTP" });
      }

      const userData = await this.registerUserFromPendingUseCase.execute(data.email)
      
      res.json({ status: true, message: "user created Successfully", user: { name: userData.name, email: userData.email } })
    } catch (error: any) {

      next(new AppError(error.message, 500))

      // return res.status(500).json({ status: false, message:error.message });
    }
  };
}
