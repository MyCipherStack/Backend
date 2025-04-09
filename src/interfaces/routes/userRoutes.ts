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
import { ResendOtpContoller } from "../controller/ResendOtpController.js";
import passport from "passport";
import { LogoutController } from "../controller/LogoutController.js";
import { GoogleAuthController } from "../controller/GoogleAuthController.js";
import { emitWarning } from "process";
import { forgotPasword, forgotPaswordVerifyOtp } from "../controller/forgotPasswor.js";
import { ResetPassword } from "../controller/resetPassword.js";



      const userRepository:IUserRepository=new UserRepository()
      const algorithm=new BcryptHashAlgorithm()     // dip for hashServices
      const hashService:IHashAlgorithm=new HashService(algorithm)
      const pendingUserRepository:IPendingUserRepository=new PendingUserRepository()


      const accessToken=env.ACCESS_JWT_TOKEN
      const refreshToken=env.REFRESH_JWT_TOKEN
      const jwtService=new JwtService(accessToken,refreshToken)
      const otpService=new OtpService(env.EMAIL,env.NODEMAILER_PASS)
      


      const authController= new AuthController(userRepository,hashService,jwtService,otpService,pendingUserRepository)
      const verifyOtpController=new VerifyOtpController(otpService,pendingUserRepository,userRepository)
      const resendOtpContoller=new ResendOtpContoller(otpService,pendingUserRepository)
      const logoutController=new LogoutController()
      const googleAuthController=new GoogleAuthController(userRepository,hashService,jwtService)
      const forgotPasswordVerify=new forgotPaswordVerifyOtp(otpService,pendingUserRepository)
      const resetPassword=new ResetPassword(userRepository)

const router=express.Router()
let dummy=()=>{
      console.log("dummy log");
      
}
router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/verifyOtp",verifyOtpController.verify)
router.post("/resendOtp",resendOtpContoller.resend)
// router.get("/auth/google",dummy)
// router.get("/auth/google",dummy)
router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))

// router.get("/auth/google/callback",passport.authenticate("google",{
//       failureRedirect:"/Login",session:true
// }),(req,res)=>{
//       res.redirect("/Home")
// })

router.get("/auth/google/callback",passport.authenticate("google",{
      failureRedirect:"/Login",session:true
}),(req,res)=>googleAuthController.handleSuccess(req,res))

router.post("/logOut",logoutController.logout)
router.post("/forgotPasswordVerify",forgotPasswordVerify.verify)
router.post("/resetPassword",resetPassword.reset)


export default router