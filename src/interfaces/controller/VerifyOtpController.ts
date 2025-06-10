import { Request, Response } from "express"
import { OtpDTO } from "../../application/dto/OtpDTO.js"
import { VerifyUseCase } from "../../application/use-cases/VerifyUsecase.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { IOtpService } from "../../domain/services/IOtpService.js";
import { RegisterUserFromPendingUseCase } from "../../application/use-cases/RegisterUserFromPendingUseCase .js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";



export class VerifyOtpController {
  constructor(
    private otpService: IOtpService,

    private PendingUserRepository: IPendingUserRepository,
    private UserRepository:IUserRepository
) {}


  verify = async(req: Request, res: Response) => {
    try {
      console.log("verigy otp");
      const data= new OtpDTO(req.body);
      console.log(data)
      const verifyUsecase = new VerifyUseCase(this.PendingUserRepository,this.otpService);
      const isValid=await verifyUsecase.execute(data.email,data.otp)

      if (!isValid) {
        console.log("not valid otp");
        
          return res.status(400).json({ status: false, message: "Invalid or expired OTP" });
        }
      
      const createUserRepo=new RegisterUserFromPendingUseCase(this.PendingUserRepository,this.UserRepository)
      const userData=await createUserRepo.execute(data.email)
        console.log(userData,"created Data");
        
      res.json({status:true,message:"user created Successfully",user:{name:userData.name,email:userData.email}})
    }catch (error:any) {
        console.log(error);
        return res.status(500).json({ status: false, message:error.message });
    }
  };
}
