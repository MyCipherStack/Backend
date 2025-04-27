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
import { ResendOtpContoller } from "../controller/ResendOtpController.js";
import passport from "passport";
import { LogoutController } from "../controller/LogoutController.js";
import { GoogleAuthController } from "../controller/GoogleAuthController.js";
import {ForgotPassVerifyOtpController } from "../controller/ForgotPassVerifyOtpContoller.js";
import { ForgotPasswordOtpController } from "../controller/ForgotPassOtpController.js";
import { ResetPasswordContoller } from "../controller/resetPasswordController.js";
import { ProblemController } from "../controller/ProblemContoller.js";
import { IProblemRepository } from "../../domain/repositories/IProblemRepository.js";
import { ProblemRepository } from "../../infrastructure/repositories/ProblemRepository.js";
import { Authenticate } from "../../middlewares/Authenticate.js";
import { ProfileController } from "../controller/ProfileController.js";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase.js";
import { GetRepositoryDataUseCase } from "../../application/use-cases/GetRepositoryDataUseCase.js";
import { ProfileDTO } from "../../application/dto/ProfileDTO.js";
import { VerifyUserPasswordUseCase } from "../../application/use-cases/VerifyUserPasswordUseCase.js";
import { ResetPasswordUseCase } from "../../application/use-cases/ResetPasswordUsecase.js";
import { ArenaController } from "../controller/ArenaController.js";



      const userRepository:IUserRepository=new UserRepository()
      const algorithm=new BcryptHashAlgorithm()     // dip for hashServices
      const hashService:IHashAlgorithm=new HashService(algorithm)
      const pendingUserRepository:IPendingUserRepository=new PendingUserRepository()
      const problemRespository:IProblemRepository=new ProblemRepository()


      
      const accessToken=env.ACCESS_JWT_TOKEN
      const refreshToken=env.REFRESH_JWT_TOKEN
      const jwtService=new JwtService(accessToken,refreshToken)
      const otpService=new OtpService(env.EMAIL,env.NODEMAILER_PASS)



      const updateUserUseCase=new UpdateUserUseCase(userRepository)
      const getRepositoryDataUseCase=new GetRepositoryDataUseCase<ProfileDTO>(userRepository)
      const verifyUserPasswordUseCase=new VerifyUserPasswordUseCase(userRepository,hashService)
      const resetPasswordUseCase=new ResetPasswordUseCase(userRepository,hashService)

      
      
      let auth=new Authenticate(jwtService,userRepository)
      
      const authController= new AuthController(userRepository,hashService,jwtService,otpService,pendingUserRepository)
      const verifyOtpController=new VerifyOtpController(otpService,pendingUserRepository,userRepository)
      const resendOtpContoller=new ResendOtpContoller(otpService,pendingUserRepository)
      const logoutController=new LogoutController()
      const googleAuthController=new GoogleAuthController(userRepository,hashService,jwtService)
      const forgotPasswordVerify=new ForgotPassVerifyOtpController(pendingUserRepository,hashService)
      const resetPassword=new ResetPasswordContoller(userRepository,hashService)
      const forgotPasswordOtpController=new ForgotPasswordOtpController(otpService,jwtService,hashService,pendingUserRepository,userRepository)
      const problemController=new ProblemController(problemRespository)
      const profileController=new ProfileController(updateUserUseCase,getRepositoryDataUseCase,userRepository,verifyUserPasswordUseCase,resetPasswordUseCase)
      const arenaController=new ArenaController()


const router=express.Router()



router.post("/register",authController.register)      //auth.verify
router.post("/login",authController.login)
router.post("/verifyOtp",verifyOtpController.verify)
router.post("/resendOtp",resendOtpContoller.resend)

router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))


router.get("/auth/google/callback",passport.authenticate("google",{
      failureRedirect:"/Login",session:true
}),(req,res)=>googleAuthController.handleSuccess(req,res))

router.post("/logout",logoutController.logout)
router.post("/forgotPasswordOtp",forgotPasswordOtpController.sendOtp)

router.post("/forgotPasswordVerify",forgotPasswordVerify.verify)
router.post("/resetPassword",resetPassword.reset)
router.get("/problems",problemController.getData)
router.get("/validateUser",auth.verify)
router.patch("/profile",profileController.update)
router.get("/profile",profileController.getData)
router.patch("/profile/resetPassword",profileController.resetPassword)
router.post("/problem/run",problemController.runProblem)
router.post("/arena/createGroupChallenge",arenaController.createGroupChallenge)



export default router