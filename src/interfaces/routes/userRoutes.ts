import express from "express";
import { AuthController } from "../controller/AuthController.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { UserRepository } from "../../infrastructure/repositories/UserRepository.js";
import { IHashAlgorithm } from "../../domain/services/IHashAlgorithm.js";
import { HashService } from "../../services/hashing/HashService.js";
import { BcryptHashAlgorithm } from "../../services/hashing/BcryptHashAlgorithm.js";
import { JwtService } from "../../services/jwt/JwtService.js";
import { env } from "../../config/env.js";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository.js";
import { PendingUserRepository } from "../../infrastructure/repositories/PendingUserRepository.js";
import { OtpService } from "../../services/otp/OtpService.js";
import { VerifyOtpController } from "../controller/VerifyOtpController.js";
import { IOtpService } from "../../domain/services/IOtpService.js";



      const userRepository:IUserRepository=new UserRepository()
      const algorithm=new BcryptHashAlgorithm()     // dip for hashServices
      const hashService:IHashAlgorithm=new HashService(algorithm)
      const pendingUserRepository:IPendingUserRepository=new PendingUserRepository()


      const accessToken=env.ACCESS_JWT_TOKEN
      const refreshToken=env.REFRESH_JWT_TOKEN
      const jwtService=new JwtService(accessToken,refreshToken)
      const otpService=new OtpService(env.EMAIL,env.NODEMAILER_PASS)
      
      const authController= new AuthController(userRepository,hashService,jwtService,otpService,pendingUserRepository,)
      const verifyOtpController=new VerifyOtpController(otpService,pendingUserRepository,userRepository)


const router=express.Router()

router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/verifyOtp",verifyOtpController.verify)

export default router